var express = require('express');
var eventCtrl = require('../app/controller/eventCtrl');
var router = express.Router();

router.get('/', function(req,res){
    res.send({status: 200, message: 'I am in default event module'})
})

router.post('/create-event', eventCtrl.eventCreate);
router.post('/imageUploadOnCloud', eventCtrl.imageUploadOnCloud);

module.exports = router;
