import User from '../models/User.js';
import {uploadFile} from "../utils/uploadFile.js";
import nodemailer from "nodemailer";

export const sendUserDataToAdmin = async (userData) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const { userName, email, feedback, avatar, createdTika } = userData;

    const mailOptions = {
        from: `"Ticket Tika Chaap" <${process.env.EMAIL_USER}>`,
        to: "info@unitedmonks.com",
        subject: "New User Feedback Received",
        html: `
            <h2>New User Submitted Feedback</h2>
            <p style="display: flex;align-items: start"><strong style="margin-right: 10px">Avatar: </strong> ${avatar ? `<img src="${avatar}" alt="Avatar" width="120"/>` : 'N/A'}</p>
            <p><strong>Name:</strong> ${userName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Feedback:</strong> ${feedback}</p>
            <p><strong>Created Tika:</strong></p>
            ${createdTika ? `<img src="${createdTika}" alt="Created Tika Image" width="288"/>` : 'N/A'}
        `,
    };

    await transporter.sendMail(mailOptions);
};



export const createUser = async (req, res) => {
    try {
        const { userName, email, feedback, createdTika } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Image is required." });
        }

        const avatar = await uploadFile(file.buffer);

        const newUser = new User({ userName, email, feedback, avatar, createdTika });
        await newUser.save();

        await sendUserDataToAdmin(newUser);

        res.status(201).json({
            message: "User created and welcome email sent successfully.",
            user: newUser,
            emailSent: true,
        });

    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ message: err.message });
    }
};



// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({message: 'User not found'});
        res.json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const { userName, email, feedback, createdTika } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (userName) user.userName = userName;
        if (email) user.email = email;
        if (feedback) user.feedback = feedback;
        if (createdTika) user.createdTika = createdTika;

        if (req.file) {
            const imageBuffer = req.file.buffer;
            user.avatar = await uploadFile(imageBuffer);
        }

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({message: 'User not found'});
        res.json({message: 'User deleted'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
