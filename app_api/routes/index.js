var express = require('express');
var router = express.Router();
var ctrlTrips = require('../controllers/trips');

/* GET list of trips */
router.get('/trips', ctrlTrips.tripsList);

/* GET single trip by code */
router.get('/trips/:tripCode', ctrlTrips.tripsFindByCode);

/* POST create new trip */
router.post('/trips', ctrlTrips.tripsCreate);

/* PUT update trip by code */
router.put('/trips/:tripCode', ctrlTrips.tripsUpdateOne);

/* DELETE trip by code */
router.delete('/trips/:tripCode', ctrlTrips.tripsDeleteOne);

module.exports = router;

