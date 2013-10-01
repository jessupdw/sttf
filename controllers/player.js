// dependencies
var mongoose = require('mongoose');
var Player   = require('../models/player');


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

exports.post = function (req, res){

  console.log(req.body);  
  var player  = new Player({
      name: {
        first: req.body.p_fn,
        last: req.body.p_ln
      },
      email: req.body.p_em,
      nickname: req.body.p_nn
  });

  console.log(player);

  player.save(function (err) {
  console.log(err)});

  res.send(player);
};