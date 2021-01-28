const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String
    },
    useremail:{
        type:String
    },

    userid:{
        type:String
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