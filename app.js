// dependencies
var mongoose = require('mongoose'),
    express  = require('express'),
    swig     = require('swig'),
    config   = require('./config');


// application
var app = module.exports = express();


// middleware
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));


// view engine
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');


// database
mongoose.connect(config.mongo.uri, function(err) {

// assign the db connection to a variable so we can use it later
    var db = mongoose.connection;


    // handle any connection errors
    db.on('error', console.error.bind(console, 'connection error:'));


    // handle a successful db connection
    db.once('open', function callback() {

        // begin routing requests to the application
        require('./routes')(app);

    });

});


// start the server
app.listen(config.listen);
