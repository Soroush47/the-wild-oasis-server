const authService = require("../services/authService");

exports.signupUser = async (req, res, next) => {
    const { email, password, fullName } = req.body;

    if (!email || !password) {
        const error = new Error("Email and password are required");
        error.status = 400;
        throw error;
    }

    try {
        const user = await authService.signupUser(email, password, fullName);

        return res.status(201).json({
            message: "User signed up successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
