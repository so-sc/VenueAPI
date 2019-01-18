const mongoose = require('mongoose');

const db_URI = "<ENTER_URI_HERE>";

const options = {
	reconnectTries: Number.MAX_VALUE,
	poolSize: 10
};

mongoose.connect(db_URI, options).then(
	() => {
		console.log("Database Connection Established");
	},
	err => {
		console.log("Error Connecting to Database. Error : ", err);
	}
);

require("../models/venue");
require("../models/user");
require("../models/request");
