module.exports = function(app, hbs) {

    /**
     * Return a list of players for use in a select list.
     */
    hbs.registerAsyncHelper('players', function(id, cb) {
        var collection = app.get('db').collection('players');

        if (id == 'all')
        {
            collection.find().toArray(function (err, players) {
                var output = '';

                players.forEach(function (player) {
                    output += '<option value="' + player._id + '">' + player.name.first + ' ' + player.name.last + '</option>';
                });

                cb(output);
            });
        }
        else
        {
            collection.findOne({_id: id}, function (err, player) {
                cb('<option value="' + player._id + '">' + player.name.first + ' ' + player.name.last + '</option>');
            });
        }
    });

}
