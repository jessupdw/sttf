/**
* Ladder
*
* @module      :: Model
* @description :: A short summary of how this model works and what it represents.
* @docs		:: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {

        // these properties should be passed in by the controller making the change
        event_type: 'string',
        event_id: 'string',
        players: {
            type: 'array',
        }

    },

    // class method to retrieve the latest ladder document
    getLatest: function (cb) {
        Ladder.find().sort('createdAt DESC').limit(1).done(function (err, ladder) {
            cb(err, ladder[0]);
        });
    },

};
