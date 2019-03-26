const express = require('express');
const router = express.Router();
const user = require('../models/user');
const AuthController = require('../controllers/AuthController');

router.post('/', AuthController.verify_token, function(req, res, next){
    user.find({}, (err, _usr) => {
        if(err)
            res.status(500).json({
                message: "Something Went Wrong"
            });
        else
            res.status(200).json(_usr);
    });
});

router.post('/dept', AuthController.verify_token, function(req, res, next){ 
    if(req.decoded.priority >= 1){
        user.find({faculty_id: req.decoded.faculty_id}, (err, _faculty) => {
            if(err)
                res.status(500).json({
                    message: "Something Went Wrong"
                });
            else{
                user.find({dept: _faculty[0].dept}, (_err, _facs) => {
                    if(err)
                        res.status(500).json({
                            message: "Something Went Wrong"
                        });
                    else
                        res.status(200).json(_facs);
                });
            }
        });
    }
    else{
        res.status(403).json({
            message: "FORBIDDEN"
        });
    }
});

module.exports = router;