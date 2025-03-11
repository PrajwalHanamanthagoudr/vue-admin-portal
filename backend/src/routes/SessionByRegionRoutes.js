const express = require("express");
const {
  getAllSessionCountries,
  getSessionCountryById,
  createSessionCountry,
  updateSessionCountry,
  deleteSessionCountry,
} = require("../controllers/sessionByRegionController");

const router = express.Router();
console.log("sessbyreg his");

router.get("/", getAllSessionCountries);
router.post("/", createSessionCountry);
router.get("/:id", getSessionCountryById);
router.put("/:id", updateSessionCountry);
router.delete("/:id", deleteSessionCountry);

module.exports = router;
