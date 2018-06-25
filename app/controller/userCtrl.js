// External module import via NPM manager------------------------
var express = require('express');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var User = require('../models/userModel.js');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


// ----------------------------Registeration-------------------------------
/* Kunvar singh 15-06-2018*/
// -----------------------------------------------------------

var registration = function(req, res) {

      let Password = req.body.password;
      let Email = req.body.email;
      let confirmpassword = { confirmpassword : req.body.confirmpassword };
      var token;

      if(confirmpassword.confirmpassword == Password) {

            User.findOne({Email:Email},{},(err,data)=>{
              if(err){  res.json({ message : "Error occured on server!",status : 400, data : err}) }
                 
                 if(!data){
                   crypto.randomBytes(10,(err,buf)=>{
                     token = buf.toString('hex');
                     req.body.verificationToken = token;
                   });

                    bcrypt.hash(Password, 10, (err, hash)=> {
                      if (err) {
                          res.json({ message: "unable to bcrypt the password",status: 200 })
                        } 
                        else if (hash){
                              let requestObj = {
                                  UserName: req.body.username,
                                  Email : Email,
                                  Password: hash,
                                  };

                                  if(requestObj.UserName && requestObj.Email){
                                    User.create(requestObj,(err, data)=>{
                                      if (err) {
                                            console.log('errrrrrrrrrrrrrrrrrr', err);
                                             res.json({ message: "error, There is unable to store record in db",status: 400 })
                                           } else if (data) {
                                            requestObj.savePassword = Password;
                                              return res.json({message :"Your account created successfully!.",status : 200})
                                          }
                                        else return res.json({ message: "There are an error to get the data", status: 400 });
                                    });
                                  }
                                  else return res.json({ message : "Please enter the all required fields",status : 400 })
                        }
                         else return res.json({  message: "Password is unable to bcrypt the password" , status: 400 })
                });
              }
              else return res.json({message : "This email id is already register with us",status : 400});
             });
      }
      else return res.json({ message: "Password and confirmPassword not match", status :400});
    }

// ----------------------------Login-------------------------------
/* Kunvar singh 15-06-2018*/
// -----------------------------------------------------------
  var login = function(req,res) {
          var reqObj = {
             Email : req.body.email,
             Password : req.body.password
          };

          if(reqObj.Email && reqObj.Password){
                      User.findOne({Email :req.body.email},{},function(err ,data){
                        if(err) return res.json({message : "Err, unable to get the data",err,status : 400})

                        if(data) {
                                bcrypt.compare(req.body.password,data.Password,function(err  ,success){
                                if(err) return res.json({message : "unable to campare the password",status : 400})
                                
                                else if(success){
                                   var token = jwt.sign({id:data._id},'secret',{ expiresIn: '1h' });
                                   return res.json({status :200, message : "User login successfully",auth : true,token : token , data : data })

                                   var userid =  function(req, res) {
                                                var token = req.headers['token'];
                                                jwt.verify(token, "name", function(err, decoded) {
                                                  if (err) return res.json(err);
                                                  return res.json(decoded);
                                                });
                                            }
                                 }
                                 else return res.json({ message : "Please enter the correct password ",status:400})
                               });
                           }
                           else return res.json({message : "Your email is not register with us, Please signup first!.",status : 400});
                      });
            }
            else return res.json({message : "Please enter email & password!.",status : 400})
   }

// Export function for access interact with DB
    exports.registration = registration;
    exports.login  = login;
