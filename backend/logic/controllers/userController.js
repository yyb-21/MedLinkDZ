import * as userService from '../services/userService.js';
import {
    hashPassword,
    comparePassword,
    generateToken,
    generateResetToken,
    verifyResetToken,
    generateVerifyToken,
    verifyVerifyToken,
    sendVerificationEmail,
    sendResetPasswordEmail,
} from '../utils/helpers.js';

// POST /api/auth/register
export const registerUser = async (req, res) => {
    const { nom, prenom, email, password, phone } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    try {
        // Validate required fields
        if (!nom || !prenom || !normalizedEmail || !password) {
            return res.status(400).json({ success: false, message: 'Veuillez remplir tous les champs obligatoires.' });
        }

        // Check if email already exists
        const existingUser = await userService.findUserByEmail(normalizedEmail);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Un utilisateur avec cet email existe déjà.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Le mot de passe doit contenir au moins 8 caractères.' });
        }

        // Hash the password before storing
        const password_hash = await hashPassword(password);

        // Create the user
        const newUser = await userService.createUser({ nom, prenom, email: normalizedEmail, password_hash, phone });

        // Send email verification
        const verificationToken = generateVerifyToken(newUser);
        await sendVerificationEmail(newUser, verificationToken);

        res.status(201).json({
            success: true,
            message: 'Inscription réussie ! Un email de vérification a été envoyé.',
            user: newUser
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la création du compte.',
        });
    }
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    try {
        if (!normalizedEmail || !password) {
            return res.status(400).json({ success: false, message: 'Email et mot de passe sont requis.' });
        }

        // Find user by email
        const user = await userService.findUserByEmail(normalizedEmail);
        
        if (!user) {
            return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
        }

        // Compare password with stored hash
        const isMatch = await comparePassword(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
        }

        if (!user.is_verified) {
            return res.status(401).json({
                success: false,
                message: 'Email non vérifié. Veuillez vérifier votre boîte mail pour activer votre compte.'
            });
        }

        if (user.is_suspended) {
            return res.status(403).json({
                success: false,
                message: 'Votre compte a été suspendu par un administrateur.'
            });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Remove password_hash from response
        const { password_hash, ...userWithoutPassword } = user;

        res.status(200).json({
            success: true,
            message: 'Connexion réussie !',
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur lors de la connexion.' });
    }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
    try {
        const user = await userService.findUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé.' });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
};

// POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    try {
        if (!normalizedEmail) {
            return res.status(400).json({ success: false, message: 'Email est requis.' });
        }

        const user = await userService.findUserByEmail(normalizedEmail);
        if (!user) {
            return res.status(200).json({
                success: true,
                message: 'Si cet email existe, un lien de réinitialisation a été envoyé.'
            });
        }

        const resetToken = generateResetToken(user);
        await sendResetPasswordEmail(user, resetToken);

        return res.status(200).json({
            success: true,
            message: 'Si cet email existe, un lien de réinitialisation a été envoyé.'
        });
    } catch (error) {
        console.error('Error during forgot password:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur lors de la demande de réinitialisation.' });
    }
};

// POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        if (!token || !newPassword) {
            return res.status(400).json({ success: false, message: 'Token et nouveau mot de passe sont requis.' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ success: false, message: 'Le mot de passe doit contenir au moins 8 caractères.' });
        }

        let decoded;
        try {
            decoded = verifyResetToken(token);
        } catch (err) {
            return res.status(400).json({ success: false, message: 'Token invalide ou expiré.' });
        }

        const user = await userService.findUserById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé.' });
        }

        const password_hash = await hashPassword(newPassword);
        await userService.updateUserPassword(decoded.id, password_hash);

        res.status(200).json({
            success: true,
            message: 'Mot de passe réinitialisé avec succès.'
        });
    } catch (error) {
        console.error('Error during reset password:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur lors de la réinitialisation du mot de passe.' });
    }
};

// GET /api/auth/verify-email
export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        if (!token) {
            return res.status(400).json({ success: false, message: 'Token de vérification manquant.' });
        }

        let decoded;
        try {
            decoded = verifyVerifyToken(token);
        } catch (err) {
            return res.status(400).json({ success: false, message: 'Token de vérification invalide ou expiré.' });
        }

        const user = await userService.findUserById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé.' });
        }

        if (user.is_verified) {
            return res.status(200).json({ success: true, message: 'Email déjà vérifié.' });
        }

        await userService.verifyUserEmail(decoded.id);

        res.status(200).json({ success: true, message: 'Email vérifié avec succès.' });
    } catch (error) {
        console.error('Error during verify email:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur lors de la vérification de l’email.' });
    }
};

// POST /api/auth/resend-verification
export const resendVerification = async (req, res) => {
    const { email } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    try {
        if (!normalizedEmail) {
            return res.status(400).json({ success: false, message: 'Email est requis.' });
        }

        const user = await userService.findUserByEmail(normalizedEmail);
        if (!user) {
            return res.status(200).json({ success: true, message: 'Si cet email existe, un e-mail de vérification a été renvoyé.' });
        }

        if (user.is_verified) {
            return res.status(200).json({ success: true, message: 'Cet email est déjà vérifié.' });
        }

        const verificationToken = generateVerifyToken(user);
        await sendVerificationEmail(user, verificationToken);

        res.status(200).json({ success: true, message: 'E-mail de vérification renvoyé avec succès.' });
    } catch (error) {
        console.error('Error during resend verification:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur lors de l’envoi de l’email de vérification.' });
    }
};

// PATCH /api/auth/update-profile
export const updateProfile = async (req, res) => {
    try {
        const { nom, prenom, phone } = req.body;

        // If a file was uploaded (avatar), use its path
        const avatar_url = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedUser = await userService.updateUser(req.user.id, {
            nom: nom || undefined,
            prenom: prenom || undefined,
            phone: phone || undefined,
            avatar_url
        });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé.' });
        }

        res.status(200).json({
            success: true,
            message: 'Profil mis à jour avec succès.',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur lors de la mise à jour.' });
    }
};
