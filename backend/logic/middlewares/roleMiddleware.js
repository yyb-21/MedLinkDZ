// Middleware to restrict access based on user role
// Usage: roleMiddleware('ADMIN') or roleMiddleware('ADMIN', 'PHARMACY')
export const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Accès refusé. Utilisateur non authentifié.' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Accès interdit. Rôle insuffisant.' });
        }

        next();
    };
};
