const mongoose = require('mongoose');
const Trip = require('./trip');
const fs = require('fs');
const path = require('path');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Read trips data from JSON file
const tripsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'trips.json'), 'utf8')
);

// Connect to database
mongoose.connect(dbURI, {});

// Function to seed the database
const seedDatabase = async () => {
    try {
        // Wait for database connection
        await new Promise((resolve) => {
            mongoose.connection.once('open', resolve);
        });
        
        console.log('Database connection established');
        
        // Remove all existing trips
        await Trip.deleteMany({});
        console.log('Existing trips removed');
        
        // Convert date strings to Date objects
        const formattedTrips = tripsData.map(trip => ({
            ...trip,
            start: new Date(trip.start)
        }));
        
        // Insert new trips
        const trips = await Trip.insertMany(formattedTrips);
        console.log(`${trips.length} trips inserted successfully`);
        
        // Close connection
        mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
        process.exit(1);
    }
};

// Start seeding
seedDatabase();

