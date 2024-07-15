import User from "../models/User.js";
import Request from "../models/request.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Function to get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { role: "user" } });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Function to add a new user (signup)
export const addUser = async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phoneNo: phone,
    });
    res.status(201).json({ user: newUser, success: true });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

// Function to login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the hashed password with the input password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Passwords do not match");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    let redirectUrl = "/home";
    if (user.role === "mechanic") {
      redirectUrl = "/mechanics";
    } else if (user.role === "admin") {
      redirectUrl = "/admin";
    }

    const token = jwt.sign(
      { id: user.id, userType: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, user, redirectUrl });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

// Function to get all mechanics
export const getMechanics = async (req, res) => {
  try {
    const mechanics = await User.findAll({ where: { role: "mechanic" } });
    res.status(200).json(mechanics);
  } catch (error) {
    console.error("Error fetching mechanics:", error);
    res.status(500).json({ error: "Error fetching mechanics" });
  }
};

// Function to update mechanic
export const putMechanic = async (req, res) => {
  const { desc, uid, opTime, clTime, exp, location } = req.body;

  try {
    await User.update(
      {
        location,
        description: desc,
        experience: exp,
        openTime: opTime,
        closeTime: clTime,
      },
      { where: { id: uid } }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating mechanic:", error);
    res.status(500).json({ error: "Error updating mechanic" });
  }
};

// Function to update request
export const putRequest = async (req, res) => {
  const id = req.params.id;
  const { read } = req.body;
  try {
    await Request.update(
      { read },
      { where: { id: id } }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ error: "Error updating request" });
  }
};

// Function to delete request
export const deleteRequest = async (req, res) => {
  const id = req.params.id;

  try {
    await Request.destroy(
      { where: { id: id } }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ error: "Error deleting request" });
  }
};

// Function to get all requests for a given mechanic
export const getRequests = async (req, res) => {
  const id = req.params.id;

  try {
    const requests = await Request.findAll({ where: { mechanicId: id } });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Error fetching requests" });
  }
};


