// Example `protect` middleware
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authorized, user not found" });
        }

        next();
    } catch (err) {
        res.status(401).json({ success: false, message: "Not authorized" });
    }
};

// Example `authorize` middleware
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "User role not authorized" });
        }
        next();
    };
};
