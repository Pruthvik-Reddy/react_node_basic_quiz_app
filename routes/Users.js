const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY='secret'
let Ques=require('../models/ques');
// let Exam=require('../models/tech');
// const { db } = require('../models/tech');

users.route('/').get(function(req, res) {
    Exam.find(function(err, exam) {
        if (err) {
            console.log(err);
        } else {
            res.json(exam);
        }
    });
});


users.post('/register',(req,res)=>{
    const today = new Date()
    const userData ={
        username:req.body.username,
        useremail:req.body.useremail,
        userid:req.body.userid,
        usertype:req.body.usertype,
        userpassword:req.body.userpassword,
        created:today
    }
    User.findOne({
        userid:req.body.userid
    }).then(user=>{
        if(!user){
            bcrypt.hash(req.body.userpassword,10,(err,hash)=>{
                userData.userpassword=hash
                User.create(userData).then(user=>{
                    res.json({status:user.userid+ 'registerred'})
                }).catch(err=>{
                    res.send('error: '+ err)
                })
            })
        }else{
            res.json({error: 'User already exists'})
        }
    }).catch(err=>{
        res.send('error: '+err)
    })
})

users.post('/login',(req,res)=>{
    User.findOne({
    userid:req.body.userid
    }).then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.userpassword, user.userpassword)){
                const payload={
                    _id:user._id,
                    username:user.username,
                    useremail:user.useremail,
                    userid:user.userid
                }
                let token = jwt.sign(payload,process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                res.json(user)
            
            }else{
                res.json({error: "User does not exists"})
            }
        }else{
            res.json({error: "User does not exists"})
        }
    }).catch(err=>{
        res.send('error: '+ err)
    })
})

users.get('/profile',(req,res)=>{
    var decoded = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    User.findOne({
        _id:decoded._id
    }).then(user=>{
        if(user){
            res.json(user)
        }else{
            res.send("User does not exists")
        }
    }).catch(err=>{
        res.send('error: '+ err)
    })

})

users.route('/ques').post(function(req, res) {
    
    let quizbee = new Ques({
        questiontext: req.body.questiontext,
        questioncategory: req.body.questioncategory,
        answertype: req.body.answertype,
        answerlist:req.body.answerlist,
       
        correctanswer: req.body.correctanswer
    });
    quizbee.save()
        .then(quizbee => {
            res.status(200).json({'quizbee': 'question added successfully'});
        })
        .catch(err => {
            res.status(400).send('Registration Failed');
        });
        
           });
           users.route('/tech').get(function(req, res) {
            Ques.find({"questioncategory":"Technical"},function(err, result) {
               if (err) {
                 res.send(err);
               } else {
                 res.send(result);
                 
               }
             });
});
users.route('/gk').get(function(req, res) {
    Ques.find({"questioncategory":"GK"},function(err, result) {
       if (err) {
         res.send(err);
       } else {
         res.send(result);
         
       }
     });
   });
   users.route('/apt').get(function(req, res) {
    Ques.find({"questioncategory":"Aptitude"},function(err, result) {
       if (err) {
         res.send(err);
       } else {
         res.send(result);
         
       }
     });
   });

module.exports = users;