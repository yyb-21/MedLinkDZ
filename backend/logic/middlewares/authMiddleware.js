import { verifyToken } from '../utils/helpers.js';

// Middleware to check if the user is authenticated via JWT
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Accès refusé. Token manquant.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        // Attach user info to the request object
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token invalide ou expiré.' });
    }
};
