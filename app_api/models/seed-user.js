const mongoose = require('mongoose');
const User = require('./user');
const bcrypt = require('bcryptjs');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Admin user credentials
const adminEmail = 'admin@example.com';
const adminPassword = 'P@ssw0rd';
const adminName = 'Admin User';

// Connect to database
mongoose.connect(dbURI, {});

// Function to seed the admin user
const seedAdminUser = async () => {
    try {
        // Wait for database connection
        await new Promise((resolve) => {
            mongoose.connection.once('open', resolve);
        });
        
        console.log('Database connection established');
        
        // Check if admin user already exists
        const existingUser = await User.findOne({ email: adminEmail }).exec();
        if (existingUser) {
            console.log('Admin user already exists. Skipping seed.');
            mongoose.connection.close();
            process.exit(0);
            return;
        }
        
        // Hash password
        const saltRounds = 10;
        const hash = await bcrypt.hash(adminPassword, saltRounds);
        
        // Create admin user
        const adminUser = new User({
            email: adminEmail,
            name: adminName,
            hash: hash
        });
        
        await adminUser.save();
        console.log('Admin user created successfully');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        
        // Close connection
        mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin user:', error);
        mongoose.connection.close();
        process.exit(1);
    }
};

// Start seeding
seedAdminUser();
