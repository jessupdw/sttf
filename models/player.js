// dependencies
var mongoose = require('mongoose');


// schema
var playerSchema = new mongoose.Schema({

    _id: mongoose.Schema.ObjectId,

    name: {
        first: { type: String, trim: true, required: true },
        last:  { type: String, trim: true, required: true }
    },

    email: { type: String, trim: true, required: true },

    nickname: { type: String, default: '' },

    rank: Number,

    createDate: { type: Date, default: Date.now }
});


// virtual property getter
playerSchema.virtual('name.full').get(function () {
    return this.name.first + ' ' + this.name.last;
});


// validators
playerSchema.path('email').validate(function (email) {
    return email.length;
}, 'Email cannot be blank');

playerSchema.path('email').validate(function (email, fn) {
    var Player = mongoose.model('Player');

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
        Player.find({ email: email }).exec(function (err, players) {
            fn(!err && players.length === 0);
        })
    } else {
        fn(true);
    }
}, 'Email already exists');


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
