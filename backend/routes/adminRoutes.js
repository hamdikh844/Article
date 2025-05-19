const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const { authenticate, restrictTo } = require("../middlewar/authMiddleware");

// Protect all routes below for authenticated users
router.use(authenticate); // Ensure user is authenticated

// Restrict access to admin only
router.use(restrictTo("admin")); // Ensure user is an admin

// Get all users
router.get("/users", adminController.getAllUsers);

// Get a single user by ID
router.get("/users/:id", adminController.getUserById);

// Update a user by ID
router.put("/users/:id", adminController.updateUser);

// Delete a user by ID
router.delete("/users/:id", adminController.deleteUser);

module.exports = router;