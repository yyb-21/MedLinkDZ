import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const FRONTEND_URL = process.env.FRONTEND_URL?.trim() || 'http://localhost:5173';
const SMTP_HOST = process.env.SMTP_HOST?.trim();
const SMTP_PORT = process.env.SMTP_PORT?.trim();
const SMTP_USER = process.env.SMTP_USER?.trim();
const SMTP_PASS = process.env.SMTP_PASS?.trim();
const SMTP_SECURE = String(process.env.SMTP_SECURE || '').trim().toLowerCase() === 'true';
const EMAIL_FROM = process.env.EMAIL_FROM?.trim() || SMTP_USER || 'no-reply@medlinkdz.com';
const SMTP_CONFIGURED = Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS);

let transporter = null;
let emailMode = 'disabled';

if (SMTP_CONFIGURED) {
    transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: SMTP_SECURE,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });
    emailMode = 'smtp';
} else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
    emailMode = 'ethereal';
    console.log('No SMTP configured. Using Ethereal test email account for development.');
    console.log(`Preview URL will be available in the backend logs after sending.`);
}

const sendEmail = async ({ to, subject, html, text }) => {
    if (!transporter) {
        console.log('Email transport not configured. Email content:');
        console.log({ to, subject, text, html });
        return false;
    }

    try {
        const info = await transporter.sendMail({
            from: EMAIL_FROM,
            to,
            subject,
            text,
            html,
        });

        if (emailMode === 'ethereal') {
            console.log('Ethereal email sent. Preview URL:', nodemailer.getTestMessageUrl(info));
        }

        return true;
    } catch (error) {
        console.error('Failed to send email:', error);
        return false;
    }
};

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

// Generate a verification token for email confirmation
export const generateVerifyToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, type: 'verify' },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

// Generate a password reset token
export const generateResetToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, type: 'reset' },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
};

// Verify a JWT token and return the decoded payload
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

// Verify a password reset token and return the decoded payload
export const verifyResetToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== 'reset') {
        throw new Error('Invalid reset token');
    }
    return decoded;
};

// Verify an email verification token and return the decoded payload
export const verifyVerifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== 'verify') {
        throw new Error('Invalid verification token');
    }
    return decoded;
};

export const sendVerificationEmail = async (user, token) => {
    const verifyUrl = `${FRONTEND_URL}/verify-email?token=${encodeURIComponent(token)}`;
    const subject = 'Vérifiez votre email MedLink DZ';
    const text = `Bonjour ${user.prenom},\n\nMerci de vous être inscrit sur MedLink DZ. Cliquez sur le lien suivant pour vérifier votre adresse email : ${verifyUrl}\n\nSi vous n'avez pas créé de compte, ignorez cet email.`;
    const html = `
        <p>Bonjour ${user.prenom},</p>
        <p>Merci de vous être inscrit sur <strong>MedLink DZ</strong>.</p>
        <p>Cliquez sur le lien suivant pour vérifier votre adresse email :</p>
        <p><a href="${verifyUrl}">Vérifier mon email</a></p>
        <p>Si vous n'avez pas créé de compte, ignorez cet email.</p>
    `;
    return sendEmail({ to: user.email, subject, text, html });
};

export const sendResetPasswordEmail = async (user, token) => {
    const resetUrl = `${FRONTEND_URL}/reset-password?token=${encodeURIComponent(token)}`;
    const subject = 'Réinitialisation de votre mot de passe MedLink DZ';
    const text = `Bonjour ${user.prenom},\n\nVous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien suivant pour créer un nouveau mot de passe : ${resetUrl}\n\nSi vous n'avez pas demandé cette réinitialisation, ignorez cet email.`;
    const html = `
        <p>Bonjour ${user.prenom},</p>
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Cliquez sur le lien suivant pour définir un nouveau mot de passe :</p>
        <p><a href="${resetUrl}">Réinitialiser mon mot de passe</a></p>
        <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
    `;
    return sendEmail({ to: user.email, subject, text, html });
};
