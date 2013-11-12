/**
 * Player
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    tableName: 'players',

    attributes: {

        firstName: {
            type: 'string',
            required: true,
            minLength: 2,
            maxLength: 64
        },

        lastName: {
            type: 'string',
            required: true,
            minLength: 2,
            maxLength: 64
        },

        nickname: {
            type: 'string',
            required: true,
            unique: true,
            minLength: 2,
            maxLength: 64
        },

        rank: {
            type: 'integer',
            unique: true,
            integer: true,
            min: 1,
            max: 999 // just because
        },

        // custom instance method
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        }

    },

    // lifecycle callbacks
    beforeCreate: function(values, next) {
        Player.find().sort('rank').limit(1).done(function(err, player) {
            if (err) {
                return next(err);
            }
            else {
                if (player.length == 1) {
                    values.rank = player[0].rank + 1;
                }
                else {
                    values.rank = 1;
                }

                next();
            }
        });
    }

};
