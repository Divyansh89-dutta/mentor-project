const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
  // ✅ Verify this path is correct

router.post("/register", registerUser);   // 💥 This will fail if registerUser is undefined
router.post("/login", loginUser);         // 💥 This will fail if loginUser is undefined
// router.get("/profile", getUserProfile);   // 💥 This will fail if getUserProfile is undefined
module.exports = router;