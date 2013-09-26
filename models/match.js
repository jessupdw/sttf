// dependencies
var mongoose = require('mongoose'),
    player   = require('./player');

// schema
var matchSchema = new mongoose.Schema({

    _id: mongoose.Schema.ObjectId,
    players: [{
        _id:    { type: mongoose.Schema.ObjectId, ref: 'Player', required: true },
        game_1: { type: Number, min: 1, max: 99, required: true },
        game_2: { type: Number, min: 1, max: 99, required: true },
        game_3: { type: Number, min: 1, max: 99 }
    }]

});


// export the mongoose model
module.exports = mongoose.model('Match', matchSchema);
