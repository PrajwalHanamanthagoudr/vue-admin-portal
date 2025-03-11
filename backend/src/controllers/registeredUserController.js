const { RegisteredUser } = require("../models/index.js");

// Get all registered users
const getAllRegisteredUsers = async (req, res) => {
  try {
    const users = await RegisteredUser.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch registered users" });
  }
};

// Get registered user by ID
const getRegisteredUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await RegisteredUser.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Registered user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch registered user" });
  }
};

// Create a new registered user
const createRegisteredUser = async (req, res) => {
  try {
    const { value } = req.body;
    const newUser = await RegisteredUser.create({ value });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create registered user" });
  }
};

// Update a registered user
const updateRegisteredUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const user = await RegisteredUser.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Registered user not found" });
    }

    await user.update({ value });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update registered user" });
  }
};

// Delete a registered user
const deleteRegisteredUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await RegisteredUser.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Registered user not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "Registered user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete registered user" });
  }
};

module.exports = {
  getAllRegisteredUsers,
  getRegisteredUserById,
  createRegisteredUser,
  updateRegisteredUser,
  deleteRegisteredUser,
};
