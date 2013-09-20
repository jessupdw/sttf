// dependencies
var mongoose = require('mongoose');
var Player   = require('../models/player.js');


// GET
exports.get = function(req, res) {

    return Player.findById(req.params.id, function(err, player) {

        if (err) {
            res.send(err);
        } else {
            if (!player) {
                res.send(404, 'Not Found');
            } else {
                res.json(player);
            }
        }

    });

};
