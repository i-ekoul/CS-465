var express = require('express');
var router = express.Router();
var ctrlTrips = require('../controllers/trips');
var ctrlAuth = require('../controllers/auth');
var auth = require('../middleware/auth');

/* POST login */
router.post('/login', ctrlAuth.login);

/* GET list of trips - Public */
router.get('/trips', ctrlTrips.tripsList);

/* GET single trip by code - Public */
router.get('/trips/:tripCode', ctrlTrips.tripsFindByCode);

/* POST create new trip - Protected */
router.post('/trips', auth.authenticate, ctrlTrips.tripsCreate);

/* PUT update trip by code - Protected */
router.put('/trips/:tripCode', auth.authenticate, ctrlTrips.tripsUpdateOne);

/* DELETE trip by code - Protected */
router.delete('/trips/:tripCode', auth.authenticate, ctrlTrips.tripsDeleteOne);

module.exports = router;

