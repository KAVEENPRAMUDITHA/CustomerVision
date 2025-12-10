const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        const adminEmail = 'admin';
        // Check if admin exists
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('Admin account already exists');
            return;
        }

        // Create new admin
        // Note: The User model pre-save hook hashes the password.
        const newAdmin = new User({
            email: adminEmail,
            password: 'admin123',
            role: 'admin'
        });

        await newAdmin.save();
        console.log('Admin account created: admin / admin123');
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

module.exports = seedAdmin;
