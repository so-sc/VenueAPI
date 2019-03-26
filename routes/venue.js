const express = require('express');
const router = express.Router();
const venue = require('../models/venue');
const AuthController = require('../controllers/AuthController');

/*------------  MINIMUM PRIORITY 2 ------------*/
// Create new Venue
router.post('/create', AuthController.verify_token, function(req, res) {
    if(req.decoded.priority > 1){
        let newVenue = new venue(req.body);
        newVenue.save((err, _venue) => {
            if(err)
                res.status(500).json({
                    message: "Error Saving to Database. Please contact Admin"
                });
            else
                res.status(200).json(_venue);
        });
    }
});

// Delete a Venue
router.delete('/delete/:id', AuthController.verify_token, function(req, res) {
    if(req.decoded.priority > 1){
        if(req.params.id == 'all'){
            venue.remove({}, (err, _response) => {
                if(err)
                    res.status(500).json({
                        message: "Error Deleting Venues. Please contact Admin"
                    });
                else
                    res.status(200).json(_response);
            });
        }
        else{
            venue.remove({_id: req.params.id}, (err, _response) => {
                if(err)
                    res.status(500).json({
                        message: "Error Deleting Venue. Please contact Admin"
                    });
                else
                    res.status(200).json(_response);
            });
        }
    }
    else
        res.status(403).json({
            message: "Forbidden"
        });
});

/*------------ NO MINIMUM PRIORITY ------------*/

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

// Read Details of Specific Venue
router.post('/:name', AuthController.verify_token, function(req, res) {
    venue.find({name: req.params.name}, (err, _venue) => {
        if(err)
            res.status(500).json({
                message: "Some Error Occured. Please contact Admin"
            });
        else
            res.status(200).json(_venue);
    });
});