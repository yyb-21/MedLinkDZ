import * as userService from '../services/userService.js';
import { hashPassword, comparePassword, generateToken } from '../utils/helpers.js';

// POST /api/auth/register
export const registerUser = async (req, res) => {
    const { nom, prenom, email, password, phone } = req.body;

    try {
        // Validate required fields
        if (!nom || !prenom || !email || !password) {
            return res.status(400).json({ success: false, message: 'Veuillez remplir tous les champs obligatoires.' });
        }

        // Check if email already exists
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Un utilisateur avec cet email existe déjà.' });
        }

        // Hash the password before storing
        const password_hash = await hashPassword(password);

        // Create the user
        const newUser = await userService.createUser({ nom, prenom, email, password_hash, phone });

        // Generate JWT token
        const token = generateToken(newUser);

        res.status(201).json({
            success: true,
            message: 'Inscription réussie !',
            token,
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

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email et mot de passe sont requis.' });
        }

        // Find user by email
        const user = await userService.findUserByEmail(email);
        
        if (!user) {
            return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
        }

        // Compare password with stored hash
        const isMatch = await comparePassword(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
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

// PATCH /api/auth/update-profile
export const updateProfile = async (req, res) => {
    try {
        const { nom, prenom, phone } = req.body;

        // If a file was uploaded (avatar), use its path
        const avatar_url = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedUser = await userService.updateUser(req.user.id, {
            nom, prenom, phone, avatar_url
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
