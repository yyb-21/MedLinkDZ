import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Hash a plain text password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Compare plain text password with hashed password
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

// Generate a JWT token with user info
export const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// Verify a JWT token and return the decoded payload
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
