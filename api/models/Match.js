/**
 * Match
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

// reuse the model validation for all the game fields
var gameValidation = {
    type: 'integer',
    required: true,
    min: 1
};

module.exports = {

    tableName: 'matches',

    attributes: {

        match_type: {
            type: 'string',
            in: ['regulation', 'forfeit'],
            defaultsTo: 'regulation'
        },

        winner_id: 'string',
        loser_id: 'string',

        p1: 'string',
        p1g1: gameValidation,
        p1g2: gameValidation,
        p1g3: 'integer',

        p2: 'string',
        p2g1: gameValidation,
        p2g2: gameValidation,
        p2g3: 'integer'

    },

    /**
     * Lifecycle Callbacks.
     */

     // determine the winner of the match
    beforeCreate: function(values, cb) {

        if (values.p1 == values.p2) {
            return cb("Players are not allowed to play themselves.");
        }

        // calculate number of wins per player
        var p1Wins = p2Wins = 0;

        (values.p1g1 > values.p2g1) ? p1Wins++ : p2Wins++;
        (values.p1g2 > values.p2g2) ? p1Wins++ : p2Wins++;

        if (values.p1g3 && values.p2g3) {
            (values.p1g3 > values.p2g3) ? p1Wins++ : p2Wins++;
        }

        if (p1Wins > p2Wins) {
            values.winner_id = values.p1;
            values.loser_id = values.p2;
        }
        else {
            values.winner_id = values.p2;
            values.loser_id = values.p1;
        }

        cb();

    },

};
