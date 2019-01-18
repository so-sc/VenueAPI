//Controller to Handle Venues

const venue = require('../models/venue');
const user = require('../models/user');

//Function to Validate user Token
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

//Function to Validate User Token and Priority
function findTokenAndPriority(reqToken, minPriority){
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

//List all Venues
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

//Create New Venue
exports.createNewVenue = (req, res) => {
	
	//Venue can be only created with user with high priority
	findTokenAndPriority(req.params.token, 2).then(() => {
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

//Read Details of a Venue
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

//Delete a Venue
exports.deleteVenue = (req, res) => {
	
	//Venue can be only deleted by users with High Priority
	findTokenAndPriority(req.params.token, 2).then(() => {
		venue.remove({_id: req.params.venueid },(err, ven) => {
			if(err){
				res.status(404).send(err);
			}
			res.status(200).json({message: "Venue Deleted Successfully"});
		});
	}).catch(message => {
		res.status(500).send(message);
	});
};
