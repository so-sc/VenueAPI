//Model of a Request

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema ({
	faculty_id:{
		type: String,
		required: true
	},
	username:{
		type: String,
		required: true
	},
	department:{
		type: String,
		required: true
	},
	date:{
		type: String,
		required: true
	},
	venue:{
		type: String,
		required: true
	},
	purpose:{
		type: String,
		required: true
	}
},{
	timestamps: {
		createdAt: 'created_at'
	}
});

module.exports = mongoose.model('Requests', requestSchema);	
