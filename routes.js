var matchController = require('./controllers/match');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index', {
            req: res,
            title: 'Home'
        });
    });

    app.get('/log', function(req, res) {
        res.render('log', {
            req: res,
            title: 'Log Your Match',
            styles: ['css/log.css']
        });
    });

    app.get('/match/:id', matchController.get);
    app.post('/match', matchController.post);

};
