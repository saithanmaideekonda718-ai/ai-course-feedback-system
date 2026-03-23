import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;

    if (role === "student") {
      user = await User.create({
        name: username,
        username,
        password: hashedPassword,
        role
      });
    } else {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// LOGIN 
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [
        { username: identifier },
        { name: identifier },
        { email: identifier }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};