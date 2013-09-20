// dependencies
var mongoose = require('mongoose');


// schema
var playerSchema = new mongoose.Schema({

    name: {
        first: { type: String, required: true },
        last:  { type: String, required: true }
    },

});


// virtual property getter
playerSchema.virtual('name.full').get(function () {
    return this.name.first + ' ' + this.name.last;
});


// export the mongoose model
module.exports = mongoose.model('Player', playerSchema);
