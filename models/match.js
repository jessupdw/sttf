// dependencies
var mongoose = require('mongoose');


// schema
var matchSchema = new mongoose.Schema({

    participants: [{
        player: { type: mongoose.Schema.ObjectId, ref: 'Player' },
        game_1: { type: Number, required: true },
        game_2: { type: Number, required: true },
        game_3: { type: Number }
    }]

});


// validations
//matchSchema.path('participants[0].game_1').validate(function (game) {
//  return game.length > 0;
//}, 'You must enter a score for Game 1');


// export the mongoose model
module.exports = mongoose.model('Match', matchSchema);
