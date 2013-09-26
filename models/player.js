// dependencies
var mongoose = require('mongoose');


// schema
var playerSchema = new mongoose.Schema({

    _id: mongoose.Schema.ObjectId,

    name: {
        first: { type: String, trim: true, required: true },
        last:  { type: String, trim: true, required: true }
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
    if (!this.isNew) next();

    // automatically rank the player at the bottom of the ladder
    var self = this;
    var Player = mongoose.model('Player');
    Player.count(function (err, count) {
        if (!err)
            self.rank = count + 1;

        next();
    });
});


// export the mongoose model
module.exports = mongoose.model('Player', playerSchema);
