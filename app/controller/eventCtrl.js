var express = require('express');
var mongoose = require('mongoose');
var Event = require('../models/eventModel.js')

var create = function(req,res){
    let requestObj = {
        EventName : req.body.eventname,
        Person : req.body.person,
        Description : req.body.description,
        Image: req.body.image,
        Range : req.body.range,
    }
    Event.create(requestObj, (err,data) => {
        if(err){
            res.json({message: "Error in storing event", status: 400})
        }
        else if(data){
            return res.json({message: "Event succefully saved", status: 200})
        }
        else return res.json({ message: "There are an error to get the data", status: 400 });
    })
}

exports.create = create;