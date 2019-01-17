const venue = require('../models/venue');

exports.listAllVenues = (req, res) => {
	venue.find({}, (err, ven) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(200).json(ven);
	});
};

exports.createNewVenue = (req, res) => {
	let newVenue = new venue(req.body);
	newVenue.save((err, ven) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(201).json(ven);
	});
};

exports.readVenue = (req, res) => {
	venue.findById(req.params.venueid, (err, ven) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(200).json(ven);
	});
};

exports.updateVenue = (req, res) => {
	venue.findOneAndUpdate(
		{id: req.params.venueid },
		req.body,
		{
			returnNewDocument: true
		},
		function(err, ven){
			if(err){
				res.status(500).send(err);
			}
			console.log(req.body.username);
			res.status(200).json(ven);
		}

	);
};

exports.deleteVenue = (req, res) => {
	venue.remove({_id: req.params.venueid },(err, ven) => {
		if(err){
			res.status(404).send(err);
		}
		res.status(200).json({message: "User Deleted Successfully"});
	});
};
