// dependencies
var mongoose = require('mongoose');


// schema
var playerSchema = new mongoose.Schema({

    name: {
        first: { type: String, required: true },
        last:  { type: String, required: true }
    },

    rank: Number
});


// virtual property getter
playerSchema.virtual('name.full').get(function () {
    return this.name.first + ' ' + this.name.last;
});


// pre-save hook
playerSchema.pre('save', function(next) {
    // existing player, move on
    if (!this.isNew) return next();

    // automatically rank the player at the bottom of the ladder
    var Player = mongoose.model('Player');
    Player.count(function (err, count) {
        if (!err) this.rank = count + 1;
    });

    return next();
});


// export the mongoose model
module.exports = mongoose.model('Player', playerSchema);
