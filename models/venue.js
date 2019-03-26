const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema ({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    available:{
        type: String, 
        default: 'yes'
    }
});

module.exports = mongoose.model('Venues', venueSchema);