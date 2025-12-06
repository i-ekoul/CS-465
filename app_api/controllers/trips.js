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

/* POST create new trip */
module.exports.tripsCreate = async function(req, res) {
    try {
        // Validate required fields
        const requiredFields = ['code', 'name', 'length', 'start', 'resort', 'perPerson', 'image', 'description'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            res.status(400).json({ 
                error: 'Bad request',
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
            return;
        }

        // Check if trip with this code already exists
        const existingTrip = await Trip.findOne({ code: req.body.code }).exec();
        if (existingTrip) {
            res.status(400).json({ 
                error: 'Bad request',
                message: `Trip with code '${req.body.code}' already exists`
            });
            return;
        }

        // Create new trip
        const trip = new Trip(req.body);
        const savedTrip = await trip.save();
        res.status(201).json(savedTrip);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ 
                error: 'Validation error',
                message: err.message 
            });
        } else if (err.code === 11000) {
            res.status(400).json({ 
                error: 'Bad request',
                message: 'Trip code must be unique'
            });
        } else {
            res.status(500).json({ 
                error: 'Internal server error',
                message: err.message 
            });
        }
    }
};

/* PUT update trip by code */
module.exports.tripsUpdateOne = async function(req, res) {
    try {
        if (!req.params.tripCode) {
            res.status(400).json({ error: 'Trip code parameter is required' });
            return;
        }

        // Find trip by code
        const trip = await Trip.findOne({ code: req.params.tripCode }).exec();
        if (!trip) {
            res.status(404).json({ 
                error: 'Trip not found',
                message: `No trip found with code: ${req.params.tripCode}`
            });
            return;
        }

        // Update trip fields
        Object.keys(req.body).forEach(key => {
            if (req.body[key] !== undefined) {
                trip[key] = req.body[key];
            }
        });

        // Save updated trip
        const updatedTrip = await trip.save();
        res.status(200).json(updatedTrip);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ 
                error: 'Validation error',
                message: err.message 
            });
        } else if (err.code === 11000) {
            res.status(400).json({ 
                error: 'Bad request',
                message: 'Trip code must be unique'
            });
        } else {
            res.status(500).json({ 
                error: 'Internal server error',
                message: err.message 
            });
        }
    }
};

/* DELETE trip by code */
module.exports.tripsDeleteOne = async function(req, res) {
    try {
        if (!req.params.tripCode) {
            res.status(400).json({ error: 'Trip code parameter is required' });
            return;
        }

        const trip = await Trip.findOneAndDelete({ code: req.params.tripCode }).exec();
        if (!trip) {
            res.status(404).json({ 
                error: 'Trip not found',
                message: `No trip found with code: ${req.params.tripCode}`
            });
            return;
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ 
            error: 'Internal server error',
            message: err.message 
        });
    }
};

