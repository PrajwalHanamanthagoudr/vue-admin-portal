const express = require("express");
const {
  getAllSessionCountries,
  getSessionCountryById,
  createSessionCountry,
  updateSessionCountry,
  deleteSessionCountry,
} = require("../controllers/sessionCountryController");

const router = express.Router();

router.get("/", getAllSessionCountries);
router.post("/", createSessionCountry);
router.get("/:id", getSessionCountryById);
router.put("/:id", updateSessionCountry);
router.delete("/:id", deleteSessionCountry);

module.exports = router;
