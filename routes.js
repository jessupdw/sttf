var matchController = require('./controllers/match');
var playerController = require('./controllers/player');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index', {
            req: req,
            title: 'Home'
        });
    });

    app.get('/log', function(req, res) {
        res.render('log', {
            req: req,
            title: 'Log Your Match',
            styles: ['css/log.css']
        });
    });

    app.get('/match/:id', matchController.get);
    app.post('/match', matchController.post);

	app.get('/playeradd', function(req, res) {
        res.render('playeradd', {
             req: req,
             title: 'Add a Player',
             styles: ['css/playeradd.css']
        });
    });

	app.post('/player', playerController.post);
};
