const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const auth = require('../middleware/auth');

const User = require("../models/User")
const { check, validationResult } = require('express-validator/check');
users.use(cors())
var username;

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
  
// users.get('/userid', auth, async (req, res) => {
//     try {
//       const user = await User.findById(req.user.id).select('-password');
//       console.log(user)
//       res.send(user);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ msg: 'Server error' });
//     }
//   });
  

users.post('/register',  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('email', 'enter correct email').isEmail().not().isEmpty(),
    // check('password', 'minimum length of password is 6 characters').isLength({
    //   min: 6
    // })
  ]
,(req,res)=>{

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
        useremail:req.body.useremail
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
            res.send('User email already exits');
            //return res.json({ errors: [{ msg: 'User does not exist' }] });
        }
    }).catch(err=>{
        res.send('error: '+err)
    })
})

users.post('/login',(req,res)=>{
    
    User.findOne({
    userid:req.body.userid
    }).then(user=>{
        //const val = user;
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
                //res.send('hello')
                username = user;
                res.send(user)
                //val = user
                //console.log(payload)
                
            
            }else{
                res.send({error: "User does not exists1111"})
                
      
            }
        }else{
            
            res.send(username)
        }
    }).catch(err=>{
        res.send('error is: '+ err)
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
            res.send("User does not exists11111111111111111111111111111")
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
           //console.log(result);
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