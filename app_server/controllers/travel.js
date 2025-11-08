/* GET travel page */
module.exports.travel = function(req, res) {
    res.render('travel', { 
        title: 'Travel - Travlr Getaways',
        layout: 'layouts/layout'
    });
};

