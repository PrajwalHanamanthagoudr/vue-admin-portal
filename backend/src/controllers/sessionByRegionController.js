const { SessionCountry } = require("../models/index.js");

// Get all session countries
const getAllSessionCountries = async (req, res) => {
  try {
    const sessionCountries = await SessionCountry.findAll();
    res.status(200).json(sessionCountries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch session countries" });
  }
};

// Get a session country by ID
const getSessionCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const sessionCountry = await SessionCountry.findByPk(id);
    if (!sessionCountry) {
      return res.status(404).json({ error: "Session country not found" });
    }
    res.status(200).json(sessionCountry);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch session country" });
  }
};

// Create a new session country
const createSessionCountry = async (req, res) => {
  try {
    const { country, flag, value, percentage } = req.body;
    const newSessionCountry = await SessionCountry.create({
      country,
      flag,
      value,
      percentage,
    });
    res.status(201).json(newSessionCountry);
  } catch (error) {
    res.status(500).json({ error: "Failed to create session country" });
  }
};

// Update a session country
const updateSessionCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { country, flag, value, percentage } = req.body;

    const sessionCountry = await SessionCountry.findByPk(id);
    if (!sessionCountry) {
      return res.status(404).json({ error: "Session country not found" });
    }

    await sessionCountry.update({ country, flag, value, percentage });
    res.status(200).json(sessionCountry);
  } catch (error) {
    res.status(500).json({ error: "Failed to update session country" });
  }
};

// Delete a session country
const deleteSessionCountry = async (req, res) => {
  try {
    const { id } = req.params;

    const sessionCountry = await SessionCountry.findByPk(id);
    if (!sessionCountry) {
      return res.status(404).json({ error: "Session country not found" });
    }

    await sessionCountry.destroy();
    res.status(200).json({ message: "Session country deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete session country" });
  }
};

module.exports = {
  getAllSessionCountries,
  getSessionCountryById,
  createSessionCountry,
  updateSessionCountry,
  deleteSessionCountry,
};
