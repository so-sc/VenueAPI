const venue = require('../models/venue');
const user = require('../models/user');

function findToken(reqToken){
	
	return new Promise(
		function(resolve, reject) {
			user.find({token: reqToken}, (err, _req) => {
				if(_req.length == 1)
					resolve();
				else
					reject("Invalid Token or Token Expired");
			});
		}
	);
}

function _findToken(reqToken, minPriority){
	return new Promise(
	function(resolve, reject) {
		user.find({token: reqToken}, (err, _req) => {
			if(_req.length == 1){
				if(_req[0].priority >= minPriority)
					resolve();
				else
					reject("403 - Forbidden");
			}
			else
				reject("Invalid Token or Token Expired");
		});
		
	});
}
	
exports.listAllVenues = (req, res) => {
	
	findToken(req.params.token).then( () => {
		venue.find({}, (err, ven) => {
			if(err){
				res.status(500).send(err);
			}
			res.status(200).json(ven);
		});
	})
	.catch(message => {
		res.status(500).send(message);
	});
};

exports.createNewVenue = (req, res) => {
	_findToken(req.params.token, 2).then(() => {
		let newVenue = new venue(req.body);
		newVenue.save((err, ven) => {
			if(err){
				res.status(500).send(err);
			}
			res.status(201).json(ven);
		});
	}).catch(message => {
		res.status(500).send(message);
	});
};

exports.readVenue = (req, res) => {
	findToken(req.params.token).then(()=> {
		venue.findById(req.params.venueid, (err, ven) => {
			if(err){
				res.status(500).send(err);
			}
			res.status(200).json(ven);
		});
	}).catch(message => {
		res.status(500).send(message);
	});
};

/* 
Updating Venue
@todo
*/
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
