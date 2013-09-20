module.exports = function(app) {

    // Controller Routes

    var playerController = require('./controllers/player');
    app.get('/player/:id', playerController.get);


    var matchController = require('./controllers/match');
    app.get('/match/:id', matchController.get);
    app.post('/match',    matchController.post);



    // View Routes
    app.get('/', function(req, res) {
        console.log(req);
        res.render('index', {
            "title": "Home",
            "req": req
        });
    });

    app.get('/log', function(req, res) {
        var Player = require('./models/player.js');

        Player.find(function(err, players) {
            if (err) res.send(err);

            res.render('log', {
                'title': 'Log your match',
                'styles': [{ href: 'css/log.css'}],
                'req': req,
                'players': players
            });
        });
    });

};
