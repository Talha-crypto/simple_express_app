import jwt from "jsonwebtoken";
import HttpStatus from "http-status";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(HttpStatus.OK).json({
        message: "Login successful",
        token,
        code: HttpStatus.OK,
      });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: "Invalid credentials",
        code: HttpStatus.UNAUTHORIZED,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      code: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function signup(req, res) {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Email already exists",
        code: HttpStatus.BAD_REQUEST,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.status(HttpStatus.CREATED).json({
      message: "User registered successfully",
      token,
      code: HttpStatus.CREATED,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      code: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
