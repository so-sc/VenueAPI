//Controller to Handle Users

const user = require('../models/user');

//Function to Validate Token
function findToken(reqToken){
	return new Promise(
		function(resolve, reject){
			user.find({token: reqToken}, (err, _req) => {
				if(_req.length == 1)
					resolve();
				else
					reject("Invalid Token or Token Expired");
			});
		}
	);
}

//Function to validate Token and Priority of user
function findTokenAndPriority(reqToken, minPriority){
	return new Promise(
		function(resolve, reject){
			user.find({token: reqToken}, (err, _req) => {
				if(_req.length == 1){
					if(_req[0].priority >= minPriority)
						resolve();
					else
						reject("403 - Forbidden ");
				}
				else
					reject("Invalid Token or Token Expired");
			});
		}
	);
}

//List all Users in DB
exports.listAllUsers = (req, res)=>{
	findTokenAndPriority(req.params.token, 2).then(() => {
		user.find({}, (err, usr) =>{
			if(err){
				res.status(500).send(err);
			}
			res.status(200).json(usr);
		});
	}).catch(message => {
		res.status(500).send(message);
	});
};

//Create a new user
exports.createNewUser = (req, res) => {
	let newUser = new user(req.body);
	newUser.save((err, usr) =>{
		if(err){
			res.status(500).send(err);
		}
		res.status(201).json(usr);
	});
};

//Read Details of a User
exports.readUser = (req, res) =>{
	findToken(req.params.token).then(() => {
		user.findById(req.params.userid, (err, usr) => {
			if(err){
				res.status(500).send(err);
			}
			res.status(200).json(usr);
		});
	}).catch(message => {
		res.status(500).send(message);
	});
};

//Update Current User
exports.updateUser = (req, res) =>{
	findToken(req.params.token).then(() => {
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
	}).catch(message => {
		res.status(500).send(message);
	});
};

//Delete Current User
exports.deleteUser = (req, res) => {
	findToken(req.params.token).then(() => {
		user.remove({_id: req.params.userid },(err, task) => {
			if(err){
				res.status(404).send(err);
			}
			res.status(200).json({message: "User Deleted Successfully"});
		});
	}).catch(message => {
		res.status(500).send(message);
	});
};

//Find All users of a Department
exports.findDepartmentUsers = (req, res) => {
	findTokenAndPriority(req.params.token, 1).then(() => {
		user.find({department: req.params.deptid}, (err, _req) => {
			if(err)
				res.status(500).send(err);
			else
				res.status(200).json(_req);
		});
	}).catch(message => {
		res.status(500).send(message);
	});
}

//Delete all users of a Department
exports.deleteAllDepartmentUsers = (req, res) => {
	findTokenAndPriority(req.params.token, 1).then(() => {
		user.remove({department: req.params.deptid}, (err, _req) => {
			if(err)
				res.status(500).send(err);
			else
				res.status(200).json(_req);
		});
	}).catch(message => {
		res.status(500).send(message);
	});
}