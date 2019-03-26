const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
    res.status(200).json({
        js: req.decoded.priority,
        message: "Online"
    });
});

module.exports = router;