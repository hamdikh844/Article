const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "Access denied. No token provided." 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid token - user not found." 
            });
        }

        // Attach both user and userId to the request object
        req.user = user;
        req.userId = user._id; // Explicitly add userId for easier access
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ 
            success: false,
            message: error.name === 'JsonWebTokenError' ? "Invalid token" : "Authentication failed" 
        });
    }
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false,
                message: "You do not have permission to perform this action" 
            });
        }
        next();
    };
};

module.exports = { authenticate, restrictTo };