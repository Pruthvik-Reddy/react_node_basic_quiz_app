const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Ans = new Schema({
   

   
   
    answerlist:[{
        type: String,
        Required:true
    },
    {
        type: String,
        Required:true
    },
    {
        type: String,
        Required:true
    },
    {
        type: String,
        Required:true
    } 

],
questionId:{
     type: Schema.Types.ObjectId, ref: "Ques" 

},
  
  
    correctanswer: {
        type: String,
        Required:true
    }
    
    
    
    
    
});

module.exports = mongoose.model('Ans', Ans);