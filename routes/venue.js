const express = require('express');
const router = express.Router();
const venue = require('../models/venue');
const AuthController = require('../controllers/AuthController');

/*------------  MINIMUM PRIORITY 2 ------------*/

// List All Venues
router.post('/', AuthController.verify_token, function(req, res) {
    venue.find({}, (err, _venues) => {
        if(err)
            res.status(500).json({
                message: "Error Accessing Database. Please contact Admin"
            });
        else
            res.status(200).json(_venues);
    });
});

