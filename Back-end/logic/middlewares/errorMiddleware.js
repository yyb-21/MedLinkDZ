// Centralized error handling middleware
// Must be the last middleware registered in app.js
const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err.message);

    // Multer file size error
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: 'Le fichier est trop volumineux. Taille max: 5MB.'
        });
    }

    // Multer general error
    if (err.name === 'MulterError') {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    // Default server error
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Erreur interne du serveur.'
    });
};

export default errorMiddleware;
