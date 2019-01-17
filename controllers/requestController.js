const request = require('../models/request');
const user = require('../models/user');

exports.listAllRequests = (req, res) => {
	let findToken = new Promise((resolve, reject) => {
		user.find({token: req.params.token}, (err, _req) => {
			console.log(_req.length);
			if(_req.length <= 0){
				res.status(500).send("Invalid Token or Token Expired");
			}
			else{
				resolve();
			}
		});
	});
	findToken.then(() => {
		request.find({}, (err, _req) => {
			if(err){
				res.status(500).send(err);
			}
			res.status(200).json(_req);
		});
	});
};

exports.createNewRequest = (req, res) => {
	let newRequest = new request(req.body);
	newRequest.save((err, _req) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(201).json(_req);
	});
};

exports.readRequest = (req, res) => {
	request.findById(req.params.requestid, (err, _req) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(200).json(_req);
	});
};

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

exports.deleteRequest = (req, res) => {
	request.remove({_id: req.params.requestid },(err, _req) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(200).json({message: "Request Deleted Successfully"});
	});
};

exports.findDepartmentRequests = (req, res) => {
	let findToken = new Promise((resolve, reject) => {
		user.find({token: req.params.token}, (err, _req) => {
			console.log(_req.length);
			if(_req.length <= 0){
				res.status(500).send("Invalid Token or Token Expired");
			}
			else{
				resolve();
			}
		});
	});
	findToken.then(() => {
		request.find({department: req.params.requestid}, (err, _req) =>{
			console.log("second");
			if(err){
				res.status(500).send(err);
			}
			else{
				res.status(200).send(_req);
			}
		});
	});
};

exports.deleteDepartmentRequests = (req, res) => {
	request.remove({department: req.params.requestid }, (err, _req) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(200).json(_req);
	});
};

exports.findIDRequests = (req, res) => {
	request.find({faculty_id: req.params.requestid }, (err, _req) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(200).json(_req);
	});
};

exports.deleteIDRequest = (req, res) => {
	request.remove({faculty_id: req.params.requestid }, (err, _req) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(200).json({message: "Requests Deleted Successfully"});
	});
};