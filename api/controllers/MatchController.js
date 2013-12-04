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
				sails.log(err);
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
			if (err) throw err;

			// The Match was created successfully!
			else {

				Ladder.getLatest(function (err, ladder) {
					if (err) throw err;

					var current_ladder = ladder.players;
		            var winner_current_position = current_ladder.indexOf(match.winner_id);
		            var loser_current_position  = current_ladder.indexOf(match.loser_id);

		            // if a match is forfeited, the loser moves to the end of the ladder
		            // and the other player remains where they are
		            if (match.match_type == 'forfeit') {
		                // new order of the ladder
		                var new_ladder = new Array();

		                for (var i = 0; i < current_ladder.length; i++) {
		                    if (current_ladder[i] != loser) {
		                        new_ladder.push(current_ladder[i]);
		                    }
		                }

		                new_ladder.push(loser);
		                current_ladder = new_ladder;
		            }

		            // if this is a normal scored match, then we handle swapping the winner / loser
		            // based on their current standings
		            else {
		                // new order of the ladder.. need to copy the array or else it acts as a pointer
		                var ladder_reference = current_ladder.slice(0);

		                if (winner_current_position > loser_current_position) {
		                    for (var i = loser_current_position; i <= winner_current_position; i++) {
		                        sails.log("Index: " + i);
		                        if (i == loser_current_position) {
		                            current_ladder[i] = match.winner_id;
		                        }
		                        else {
		                            current_ladder[i] = ladder_reference[i-1];
		                        }
		                    }
		                }
		            }

		            Ladder.create({
		                event_type: 'match',
		                event_id: match.id,
		                players: current_ladder
		            }).done(function (err, ldr) {
		                if (err) throw err;

						res.view({ ladder: ldr, winner: match.winner_id });
		            });

				});

			}
		});
	}

};
