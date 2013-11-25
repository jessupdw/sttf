/**
 * Match
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    tableName: 'matches',

    attributes: {

        winner_id: 'string',

        p1: 'string',
        p1g1: 'integer',
        p1g2: 'integer',
        p1g3: 'integer',

        p2: 'string',
        p2g1: 'integer',
        p2g2: 'integer',
        p2g3: 'integer'

    },

    /**
     * Lifecycle Callbacks.
     */

     // determine the winner of the match
    beforeCreate: function(values, next) {

        if (values.p1 == values.p2) {
            return next("Players are not allowed to play themselves.");
        }

        Player.find

        // calculate number of wins per player
        var p1 = p2 = 0;
        (values.p1g1 > values.p2g1) ? p1++ : p2++;
        (values.p1g2 > values.p2g2) ? p1++ : p2++;

        if (values.p1g3 && values.p2g3) {
            (values.p1g3 > values.p2g3) ? p1++ : p2++;
        }

        values.winner_id = (p1 > p2) ? values.p1 : values.p2;

        next();

    },

};
