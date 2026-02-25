const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const { successResponse } = require("../utils/response");

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            const error = new Error("All fields are required");
            error.statusCode = 400;
            return next(error);
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 400;
            return next(error);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return successResponse(
            res,
            { userId: user._id },
            "User registered successfully",
            201
        );

    } catch (err) {
        next(err);
    }
};


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error("Email and password are required");
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("Invalid email or password");
            error.statusCode = 400;
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const error = new Error("Invalid email or password");
            error.statusCode = 400;
            return next(error);
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }
        );

        return successResponse(
            res,
            {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            },
            "Login successful"
        );

    } catch (err) {
        next(err);
    }
};

module.exports = { register, login };