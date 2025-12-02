const Trip = require('../../app_server/models/trip');

/* GET list of trips */
module.exports.tripsList = async function(req, res) {
    try {
        const trips = await Trip.find({}).exec();
        if (!trips || trips.length === 0) {
            res.status(200).json([]);
            return;
        }
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ 
            error: 'Internal server error',
            message: err.message 
        });
    }
};

/* GET single trip by code */
module.exports.tripsFindByCode = async function(req, res) {
    try {
        if (!req.params.tripCode) {
            res.status(400).json({ error: 'Trip code parameter is required' });
            return;
        }
        
        const trip = await Trip.findOne({ code: req.params.tripCode }).exec();
        if (!trip) {
            res.status(404).json({ 
                error: 'Trip not found',
                message: `No trip found with code: ${req.params.tripCode}`
            });
            return;
        }
        res.status(200).json(trip);
    } catch (err) {
        res.status(500).json({ 
            error: 'Internal server error',
            message: err.message 
        });
    }
};

