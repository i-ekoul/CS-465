const Trip = require('../models/trip');

/* GET travel page */
module.exports.travel = async function(req, res) {
    try {
        const trips = await Trip.find({}).exec();
        console.log('Travel page - Found trips:', trips.length);
        
        // Format dates for display
        const formattedTrips = trips.map(trip => {
            const tripObj = trip.toObject();
            if (tripObj.start) {
                const date = new Date(tripObj.start);
                tripObj.startFormatted = date.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
            }
            return tripObj;
        });
        
        res.render('travel', { 
            title: 'Travel - Travlr Getaways',
            page: 'travel',
            layout: 'layouts/layout',
            trips: formattedTrips
        });
    } catch (err) {
        console.error('Travel page error:', err);
        res.status(500).render('error', {
            message: err.message,
            error: {}
        });
    }
};

