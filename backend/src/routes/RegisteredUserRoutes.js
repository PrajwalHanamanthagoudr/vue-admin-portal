const express = require("express");
const {
  getAllRegisteredUsers,
  getRegisteredUserById,
  createRegisteredUser,
  updateRegisteredUser,
  deleteRegisteredUser,
} = require("../controllers/registeredUserController");

const router = express.Router();

router.get("/", getAllRegisteredUsers);
router.post("/", createRegisteredUser);
router.get("/:id", getRegisteredUserById);
router.put("/:id", updateRegisteredUser);
router.delete("/:id", deleteRegisteredUser);

module.exports = router;
