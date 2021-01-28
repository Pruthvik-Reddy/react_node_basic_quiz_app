const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Ques = new Schema({
    _quesid:{
        type:String
    },
    
    questiontext: {
        type: String,
        Required:true
    },
    questioncategory: {
        type: String,
        Required:true
    },
    answertype: {
        type: String,
        Required:true
    },
    
    answerlist:[{
        type: String,
        Required:true
    },


],
    correctanswer: {
        type: String,
        Required:true
    },
    
});

module.exports = mongoose.model('Ques', Ques);