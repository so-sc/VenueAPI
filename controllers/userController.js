const user = require('../models/user');

exports.listAllUsers = (req, res) => {
	user.find({}, (err, usr) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(200).json(usr);
	});
};

exports.createNewUser = (req, res) => {
	let newUser = new user(req.body);
	newUser.save((err, usr) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(201).json(usr);
	});
};

exports.readUser = (req, res) => {
	user.findById(req.params.userid, (err, usr) => {
		if(err){
			res.status(500).send(err);
		}
		res.status(200).json(usr);
	});
};

exports.updateUser = (req, res) => {
	user.findOneAndUpdate(
		{_id: req.params.userid },
		req.body,
		{new: true},
		(err, usr) => {
			if(err){
				res.status(500).send(err);
			}
			res.status(200).json(usr);
		}
	);
};

exports.deleteUser = (req, res) => {
	user.remove({_id: req.params.userid },(err, task) => {
		if(err){
			res.status(404).send(err);
		}
		res.status(200).json({message: "User Deleted Successfully"});
	});
};
