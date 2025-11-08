var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.index);

/* GET rooms page. */
router.get('/rooms', ctrlMain.rooms);

/* GET meals page. */
router.get('/meals', ctrlMain.meals);

/* GET news page. */
router.get('/news', ctrlMain.news);

/* GET about page. */
router.get('/about', ctrlMain.about);

/* GET contact page. */
router.get('/contact', ctrlMain.contact);

module.exports = router;
