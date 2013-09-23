// var matchController  = require('./controllers/match'),
//     playerController = require('./controllers/player');


module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index', { title: 'Home' });
    });

    app.get('/log', function(req, res) {
        res.render('log', {
            title: 'Log Your Match'
        });
    });


    // app.get('/match/:id', matchController.get);
    // app.get('/player/:id', playerController.get);

};
