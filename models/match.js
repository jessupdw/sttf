// dependencies
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , Player   = require('./player');

// schema
var matchSchema = new Schema({

    players: [{
        player: { type: ObjectId },
        game_1: { type: Number   },
        game_2: { type: Number   },
        game_3: { type: Number   }
    }]

});


// export the mongoose model
module.exports = mongoose.model('Match', matchSchema);
