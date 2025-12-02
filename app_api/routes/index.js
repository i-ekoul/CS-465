var express = require('express');
var router = express.Router();
var ctrlTrips = require('../controllers/trips');

/* GET list of trips */
router.get('/trips', ctrlTrips.tripsList);

/* GET single trip by code */
router.get('/trips/:tripCode', ctrlTrips.tripsFindByCode);

module.exports = router;

