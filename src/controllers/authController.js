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

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const { refresh_token } = req.body;

        if (!refresh_token) {
            return res.status(400).json({ message: "Refresh token is required" });
        }

        const data = await authService.refreshToken(refresh_token);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

exports.getMe = async (req, res) => {
  try {
    const { userId, email } = req.user;
    
    res.status(200).json({
      success: true,
      user: {
        id: userId,
        email: email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};