const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create tokens
const ACCESS_TOKEN_EXPIRY = "1h"; // 3600 seconds
const REFRESH_TOKEN_EXPIRY = "7d";

exports.signupUser = async (email, password, fullName) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        const error = new Error("User already exists");
        error.status = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            fullName,
        },
    });

    return {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        createdAt: newUser.createdAt,
    };
};

exports.loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        const error = new Error("Invalid credentials");
        error.status = 401;
        throw error;
    }

    // Access Token
    const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRY },
    );

    // Refresh Token
    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });

    const expiresIn = 3600;
    const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;

    const { password: userPassword, ...safeUser } = user;

    return {
        user: {
            ...safeUser,
            role: "authenticated",
        },
        session: {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: expiresAt,
            expires_in: expiresIn,
            token_type: "bearer",
        },
    };
};

exports.refreshToken = async token => {
    try {
        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        const newAccessToken = jwt.sign(
            { userId: payload.id, email: payload.email },
            process.env.JWT_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRY },
        );

        const newRefreshToken = jwt.sign(
            { userId: payload.id },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: REFRESH_TOKEN_EXPIRY,
            },
        );

        return {
            session: {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
                expires_at: Math.floor(Date.now() / 1000) + 3600,
                expires_in: 3600,
                token_type: "bearer",
            },
        };
    } catch (err) {
        throw new Error("Invalid or expired refresh token");
    }
};

exports.getMe = async id => {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    const { password, ...safeUser } = user;

    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    return {
        ...safeUser,
        role: "authenticated",
    };
};

exports.updateUser = async (id, data) => {
    const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : null;

    const newData = hashedPassword ? { password: hashedPassword } : data;
    const user = await prisma.user.update({
        where: { id },
        data: newData,
    });

    const { password, ...safeUser } = user;

    return {
        ...safeUser,
        role: "authenticated",
    };
};
