const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided",
            });
        }

        // Extract token
        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                message: "Invalid token format",
            });
        }

        const token = parts[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add paylod to req
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
        };

        // console.log("auth", req.user);
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expired",
            });
        }

        return res.status(401).json({
            message: "Invalid token",
        });
    }
}

module.exports = authMiddleware;
