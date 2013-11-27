/**
 * LadderController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  seed: function (req, res) {
  	Player.find().done(function (err, players) {
  		if (err) {
  			console.log(err);
  			res.json(err);
  		}

  		var seeded_player_ids = new Array();

  		for (var id in players) {
  			seeded_player_ids.push(players[id].fullName());
  		}

  		Ladder.create({
  			event_type: 'seed',
  			event_id: '0',
  			players: seeded_player_ids
  		}).done(function (err, ladder) {
  			if (err) {
  				console.log(err);
  				res.json(err);
  			}
  			else {
  				res.json(ladder);
  			}
  		});
  	});
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to LadderController)
   */
  _config: {}

  
};
