/*  LOGIN VALIDATIONS   */
const express = require('express');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

/*POST REQUEST FOR LOGIN    */
router.post('/', AuthController._sign_in_checks, function(req, res) { 
    
    //Find Given Details in DB
    user.find({faculty_id: req.body.faculty_id, password: req.body.password}).then(user => {

        //Check if Document is Empty
        if(!user || user.length == 0) {
            res.status(200).json({
                message: 'No Accounts Found'
            });
        }
        else{
            let token = jwt.sign({faculty_id: user[0].faculty_id, priority: user[0].priority}, 'secret', {
                expiresIn: 8000
            });
            return res.status(200).json({
                token
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Something Went Wrong'
        });
    });
});

module.exports = router;