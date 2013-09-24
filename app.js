// dependencies
var mongoose  = require('mongoose'),
    mongoskin = require('mongoskin'),
    express   = require('express'),
    validator = require('express-validator'),
    hbs       = require('express-hbs'),
    config    = require('./config');


// application
var app = module.exports = express();


// database
app.set('db', mongoskin.db(config.mongo.uri, {safe: true})); // mongoskin
mongoose.connect(config.mongo.uri); // mongoosejs


/**
 * Middleware
 */

// session support
app.use(express.cookieParser('s.t.t.f'));
app.use(express.session());

// parse request bodies (req.body)
app.use(express.bodyParser());

// support _method (PUT in forms etc)
app.use(express.methodOverride());

// input validation support
app.use(validator());

// serve static files from the /public directory
app.use(express.static(__dirname + '/public'));

// define a custom res.message() method which stores messages in the session
app.response.message = function(msg) {

    // reference `req.session` via the `this.req` reference
    var sess = this.req.session;

    // simply add the msg to an array for later
    sess.messages = sess.messages || [];
    sess.messages.push(msg);

    return this;

};

// expose the "messages" local variable when views are rendered
app.use(function(req, res, next) {

    var msgs = req.session.messages || [];

    // expose "messages" local variable
    res.locals.messages = msgs;

    // expose "hasMessages"
    res.locals.hasMessages = !! msgs.length;

    next();

    // empty or "flush" the messages so they don't build up
    req.session.messages = [];

});

// view engine
app.engine('html', hbs.express3({
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: __dirname + '/views/layouts/default.html',
    contentHelperName: 'content'
}));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


/**
 * Routing & Controllers
 */
require('./helpers')(app, hbs);
require('./routes')(app);


// start the server
app.listen(config.listen);
