const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const jwt_secret = 'secret';


// Validating Sign in Credentials
exports._sign_in_checks = [
    check('faculty_id').exists(),
    check('password').isLength({min: 6}).exists()
];

//Validating Registration Credentials
exports._register_checks = [
    check('username').isEmail().exists(),
    check('password').isLength({min: 6}).exists(),
    check('faculty_id').isAlpha().exists(),
    check('department').isNumeric().isLength({min: 9}).exists()
];

//-----------------------------------------------------------------------
/*
*   Verify Token
*/

exports.verify_token = function(req, res, next){
    let token = req.body.token;
    if(token){
        token = /^(Bearer\x\S*)$/.test(token) ? token.split(' ')[1] : token;

        //verify the token
        jwt.verify(token,jwt_secret, function(err, decoded){

            //If Token is Invalid
            if(err){
                return res.status(401).json({
                    message: 'Invalid Token',
                    error: err
                });
            }
            
            //check if the token contains email
            if(decoded.faculty_id){
                req.decoded = decoded;
                next();
            }else{
                //Invalid Token Request
                return res.status(401).json({
                    message: 'Invalid Token',
                    error: 'Malformed or Tampered Token'
                });
            }
        });
    }else {
        //Token Not Found
        return res.status(401).json({
            message: 'Authorization Required'
        });
    }
}