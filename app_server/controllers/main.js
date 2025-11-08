var path = require('path');

/* GET home page */
module.exports.index = function(req, res) {
    res.render('index', { 
        title: 'Travlr Getaways',
        layout: 'layouts/layout'
    });
};

/* GET rooms page */
module.exports.rooms = function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/rooms.html'));
};

/* GET meals page */
module.exports.meals = function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/meals.html'));
};

/* GET news page */
module.exports.news = function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/news.html'));
};

/* GET about page */
module.exports.about = function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/about.html'));
};

/* GET contact page */
module.exports.contact = function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/contact.html'));
};
