/**
 * MatchController
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

	log: function (req, res) {
		Player.find().done(function (err, players) {
			if (err) {
				console.log(err);
				res.json(err);
			}
			else {
				res.view({ players: players });
			}
		});
	},

	save: function (req, res) {
		var data = {
			p1: req.param('player1'),
			p1g1: req.param('player1_game1'),
			p1g2: req.param('player1_game2'),
			p1g3: req.param('player1_game3'),

			p2: req.param('player2'),
			p2g1: req.param('player2_game1'),
			p2g2: req.param('player2_game2'),
			p2g3: req.param('player2_game3')
		};

		Match.create(data).done(function (err, match) {
			// Error handling
			if (err) {
				console.log(err);
				res.json(err);
			}

			// The Match was created successfully!
			else {
				Player.findOne(match.winner_id).done(function (err, winner) {
					res.view({ winner: winner });
				});
			}
		});
	}

};
