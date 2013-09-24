// dependencies
var mongoose = require('mongoose');


// schema
var matchSchema = new mongoose.Schema({

    players: [{
        player: { type: mongoose.Schema.ObjectId, ref: 'Player' },
        game_1: { type: Number, required: true },
        game_2: { type: Number, required: true },
        game_3: { type: Number }
    }]

});


// export the mongoose model
module.exports = mongoose.model('Match', matchSchema);
