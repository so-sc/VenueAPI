const express = require('express');
const router = express.Router();
const request = require('../models/request');
const user = require('../models/user');
const AuthController = require('../controllers/AuthController');

/*------------  MINIMUM PRIORITY 2 -----------------------*/

// Request to List All Requests 
router.post('/all', AuthController.verify_token, function(req, res, next) {
    if(req.decoded.priority > 1){
        request.find({}, (err, _req) => {
            if(err)
                res.status(500).json({
                    message: "Internal Server Error"
                });
            else
                res.status(200).json(_req);
        });
    }
    else
        res.status(403).json({
            message: "403 - Forbidden"
        });
});

// Request for Deleting All Requests
router.delete('/all', AuthController.verify_token, function(req, res) {
    if(req.decoded.priority > 1){
        request.remove({}, (err, _response) => {
            if(err)
                res.status(500).json({
                    message: "Internal Server Error"
                });
            else
                res.status(200).json(_response);
        });
    }
});


/*------------  MINIMUM PRIORITY 1 -----------------------*/
router.post('/dept', AuthController.verify_token, function(req, res, next) {
    if(req.decoded.priority > 0){
        user.findOne({faculty_id: req.body.faculty_id}, (err, _usr) => {
            if(err)
                res.status(500).json({
                    message: "Oops! Looks like something went wrong. Please contact Admin"
                });
            else{
                request.find({department: _usr.department}, (err, _req) => {
                    if(err)
                        res.status(500).json({
                            message: "Oops! Looks like something went wrong. Please contact Admin"
                        });
                    else
                        res.status(200).json(_req);
                });
            }
        });
    }
});

/*------------ NO MINIMUM PRIORITY -----------------------*/
router.post('/', AuthController.verify_token, function(req, res, next) {
    request.find({faculty_id: req.decoded.faculty_id}, (err, _req) => {
        if(err)
            res.status(500).json({
                message: "Cannot List Requests by User. Please contact Admin"
            });
        else
            res.status(200).json(_req);
    });
});

router.post('/create', AuthController.verify_token, function(req, res) {
    let newRequest = new request(req.body);
    newRequest.save((err, _req) => {
        if(err)
            res.status(500).json({
                message: "Error Saving to Database. Please contact Admin"
            });
        else
            res.status(200).json(_req);
    });
});

router.delete('/delete/:id', AuthController.verify_token, function(req, res) {
    request.remove({_id: req.params.id}, (err, _res) => {
        if(err)
            res.status(500).json({
                message: "Error Deleting Request. Please contact Admin"
            });
        else
            res.status(200).json(_res);
    });
});

module.exports = router;