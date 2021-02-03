const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    useremail:{
        type:String,
        required:true
    },

    userid:{
        type:String,
        required:true
    },
    
    userpassword:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = User = mongoose.model('users',UserSchema)