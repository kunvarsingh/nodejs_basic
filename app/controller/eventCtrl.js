var express = require('express');
var mongoose = require('mongoose');
var Event = require('../models/eventModel.js')
var cloudinary = require('cloudinary');
var fs = require('fs');

var eventCreate = function(req,res){
    let requestObj = {
        EventName : req.body.eventname,
        noOfperson : req.body.noOfperson,
        Description : req.body.description,
        Image: req.body.image,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
    }

    Event.create(requestObj, (err,data) => {
        if(err){
            res.json({message: "Error while saving events!.", status: 400})
        }
        else if(data){
            return res.json({message: "Event succefully created!.", status: 200})
        }
        else return res.json({ message: "There are an error to get the data", status: 400 });
    })
}

var imageUploadOnCloud = function(req, res){

    cloudinary.config({
      cloud_name: 'pennybase-technologies-private-solution', 
      api_key: '638493116712829', 
      api_secret: 'wPY1PjR02-duNX7Si5rJjhYJYMk' 
    });

     var img_base64 = req.body.image;
     var userId = req.body.userId;

     binaryData = new Buffer(img_base64, 'base64');

     fs.writeFile("digital_diary"+userId+".jpg", binaryData, "binary", function(err) {
       console.log("file write");

         if (err) {
             console.log("errror in writtting file");
         } else {
            console.log("Image upload");
                 cloudinary.uploader.upload("digital_diary"+userId+".jpg", function(result) {
                     if (result.url) {
                         res.json({
                             status: 200,
                             message:"Image upload successfully!.",
                             url: result.url
                         });
                     }else{
                        res.send({status : 400, message :"Oop's sorry,Please try again!."})
                     }
                 })
         }
     });
}

exports.eventCreate = eventCreate;
exports.imageUploadOnCloud = imageUploadOnCloud;