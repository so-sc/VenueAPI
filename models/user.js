// Model for User

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    faculty_id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        default: 0
    }
});

module.exports = mongoose.model('Users', userSchema);