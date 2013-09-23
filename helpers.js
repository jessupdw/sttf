module.exports = function(app, hbs) {

    /**
     * Return a list of players for use in a select list.
     */
    hbs.registerAsyncHelper('players', function(null, cb) {
        app.get('db').collection('players').find().toArray(function (err, players) {
            var output;

            players.forEach(function (player) {
                output += '<option value="' + player._id + '">' + player.name.first + ' ' + player.name.last + '</option>';
            });

            cb(output);
        });
    });

}
