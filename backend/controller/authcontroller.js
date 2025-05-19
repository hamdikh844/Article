const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Function to generate token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Register new user
const registerUser = async (req, res) => {
   try {
       const { name, email, password, role } = req.body;

       if (!name || !email || !password) {
           return res.status(400).json({ message: "Please provide all required fields: name, email, password" });
       }

       const existUser = await User.findOne({ email });
       if (existUser) {
           return res.status(400).json({ message: "User already exists" });
       }

       const newUser = new User({ name, email, password, role });
       await newUser.save();

       const token = generateToken(newUser._id, newUser.role);

       res.status(201).json({
           message: "User registered successfully",
           token,
           id: newUser._id,
           name: newUser.name,
           email: newUser.email,
           role: newUser.role,
       });
   } catch (error) {
       console.error(error);
       res.status(500).json({
           message: "Error registering user",
           error: error.message,
       });
   }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await User.findOne({ email }).select("+password");
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await foundUser.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = generateToken(foundUser._id, foundUser.role);

        res.status(200).json({
            message: "Login successful",
            token,
            id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error logging in user",
            error: error.message,
        });
    }
};

// Get current user profile
const getMe = async (req, res) => {
    try {
        console.log('User from middleware:', req.user);
        
        if (!req.user) {
            console.error('No user attached to request');
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const userData = {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        };

        console.log('Returning user data:', userData);
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error in getMe:', error);
        res.status(500).json({
            message: "Error fetching profile",
            error: error.message
        });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user._id;

        if (!name || !email) {
            return res.status(400).json({ 
                message: "Please provide both name and email" 
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId.toString()) {
            return res.status(400).json({ 
                message: "Email already in use by another account" 
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating profile",
            error: error.message
        });
    }
};

module.exports = { 
    registerUser, 
    loginUser, 
    getMe, 
    updateProfile 
};