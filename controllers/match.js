// dependencies
var mongoose = require('mongoose'),
    Match = require('../models/match');

// GET
exports.get = function(req, res) {

    return Match.findById(req.params.id, function(err, match) {

        if (err) {
            res.send(err);
        } else {
            if (!match) {
                res.send(404, 'Not Found');
            } else {
                res.json(match);
            }
        }

    });

};


// POST
exports.post = function(req, res) {

    var match = new Match();

    match.players = [
        {
            player: mongoose.Schema.ObjectId(req.body.p1),
            game_1: req.body.p1_g1,
            game_2: req.body.p1_g2,
            game_3: req.body.p1_g3
        },
        {
            player: mongoose.Schema.ObjectId(req.body.p2),
            game_1: req.body.p2_g1,
            game_2: req.body.p2_g2,
            game_3: req.body.p2_g3
        },
    ];

    match.save();

    res.send(match);
};
