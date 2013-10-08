// dependencies
var mongoose = require('mongoose'),
    player   = require('./player');

// schema
var matchSchema = new mongoose.Schema({

    _id: mongoose.Schema.ObjectId,
    winner_id: { type: mongoose.Schema.ObjectId, ref: 'Player' },
    players: [{
        _id:    { type: mongoose.Schema.ObjectId, ref: 'Player', required: true },
        game_1: { type: Number, min: 1, max: 99, required: true },
        game_2: { type: Number, min: 1, max: 99, required: true },
        game_3: { type: Number, min: 1, max: 99 }
    }]

});


// pre-save hook
matchSchema.pre('save', function(next) {
    if (this.isNew) {

        // players
        var player1 = this.players[0];
        var player2 = this.players[1];

        // number of wins per player
        var p1 = p2 = 0;

        // do some calculations
        (player1.game_1 > player2.game_1) ? p1++ : p2++;
        (player1.game_2 > player2.game_2) ? p1++ : p2++;

        if (player1.game_3 && player2.game_3) {
            (player1.game_3 > player2.game_3) ? p1++ : p2++;
        }

        this.winner_id = (p1 > p2) ? player1._id : player2._id;
    }

    next();
});


// export the mongoose model
module.exports = mongoose.model('Match', matchSchema);
