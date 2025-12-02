const Trip = require('../models/trip');

/* GET list of trips */
module.exports.tripsList = async function(req, res) {
    try {
        const trips = await Trip.find({}).exec();
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* GET single trip by ID */
module.exports.tripsFindByCode = async function(req, res) {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode }).exec();
        if (!trip) {
            res.status(404).json({ error: 'Trip not found' });
            return;
        }
        res.status(200).json(trip);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



