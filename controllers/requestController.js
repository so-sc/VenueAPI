//Controller to Handle Requests

const request = require('../models/request');
const user = require('../models/user');

//Function to validate Token of user
function findToken(reqToken){
	return new Promise(
		function(resolve, reject) {
			user.find({token: reqToken}, (err, _req) => {
				if(_req.length == 1)
					resolve()
				else
					reject("Invalid Token or Token Expired");
			});
		}
	);
}

//Function to Validate Token and Priority of User
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
		}
		
	);
}

//List All Requests by all users
exports.listAllRequests = (req, res) => {
	findTokenAndPriority(req.params.token, 2).then(() => {
		request.find({}, (err, _req) => {
			if(err){
				res.status(500).send(err);
			}
			res.status(200).json(_req);
		});
	}).catch(message => {
		res.status(500).send(message);
	});
};

//Create New Requests
exports.createNewRequest = (req, res) => {
	findToken(req.params.token).then( () => {
		let newRequest = new request(req.body);
		newRequest.save((err, _req) => {
			if(err){
				res.status(500).send(err);
			}
			res.status(201).json(_req);
		});
	}).catch(message => {
		res.status(500).send(message);
	});
};

//Read Requests of current user
exports.readRequest = (req, res) => {
	findToken(req.params.token).then( () => {
		request.findById(req.params.requestid, (err, _req) => {
			if(err){
				res.status(500).send(err);
			}
			res.status(200).json(_req);
		});
	}).catch(message => {
		res.status(500).send(message);
	});
};

//Update Request of current user
exports.updateRequest = (req, res) => {
	request.findOneAndUpdate(
		{faculty_id: req.params.requestid },
		req.body,
		{new: true},
		(err, _req) => {
			if(err){
				res.status(500).send(err);
			}
			res.status(200).json(_req);
		}
	);
};

//Delete Requests of current user
exports.deleteRequest = (req, res) => {
	findToken(req.params.token).then( () => {
		request.remove({_id: req.params.requestid },(err, _req) => {
			if(err){
				res.status(500).send(err);
			}
			res.status(200).json({message: "Request Deleted Successfully"});
		});
	}).catch(message => {
		res.status(500).send(message);
	});
};

//List All Requests by a Department
exports.findDepartmentRequests = (req, res) => {
	findTokenAndPriority(req.params.token,1).then(() => {
		request.find({department: req.params.deptid}, (err, _req) =>{
			if(err){
				res.status(500).send(err);
			}
			else{
				res.status(200).json(_req);
			}
		});
	});
};

//Delete All Requests of a Department
exports.deleteAllDepartmentRequests = (req, res) => {
	findTokenAndPriority(req.params.token,1).then( () => {
		request.remove({department: req.params.deptid }, (err, _req) => {
			if(err){
				res.status(500).send(err);
			}
			res.status(200).json(_req);
		});
	});
};

//Find a Request By ID
exports.findIDRequests = (req, res) => {
	request.find({faculty_id: req.params.requestid }, (err, _req) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(200).json(_req);
	});
};

//Delete a Request By ID
exports.deleteIDRequest = (req, res) => {
	request.remove({faculty_id: req.params.requestid }, (err, _req) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(200).json({message: "Requests Deleted Successfully"});
	});
};