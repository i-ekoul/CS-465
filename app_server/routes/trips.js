var express = require('express');
var router = express.Router();
var ctrlTrips = require('../controllers/trips');

/* GET list of trips */
router.get('/', ctrlTrips.tripsList);

/* GET single trip by code */
router.get('/:tripCode', ctrlTrips.tripsFindByCode);

module.exports = router;



