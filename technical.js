
import React, { Component } from 'react';
import axios from "axios";

import './exam.css';


export default class Technical extends Component{


  constructor(){
    super();
    this.state={
      data:[],
      currentQuestionIndex:0,
      questions:[],
      answers:{},
      correctAnswers:[],
      number_of_correct:0,
      number_of_wrong:0


    };
  }


  componentDidMount(){
    axios.get("http://localhost:5000/users/tech").then(res => {
        this.setState({
          data: res.data ,
           
        });
      });
      
    }

  handleNext(){
    let incrementedQuestionIndex=this.state.currentQuestionIndex + 1;
    this.setState({currentQuestionIndex:incrementedQuestionIndex});
  }

  button_func(value){
    //console.log(value);
    let currentQuestionIndex=this.state.currentQuestionIndex;
    let answers=this.state.answers;
    answers[currentQuestionIndex]=value;
    //console.log("This is answers");
    //console.log(answers);
    this.setState({answers});


  }

  getResults(){
    let correctAnswers=this.state.correctAnswers;
    let answers=this.state.answers;
    let number_of_correct=0;
    let number_of_wrong=0;
    for(var i=0;i<this.state.correctAnswers.length;i++){
      if (answers[i]===correctAnswers[i]){
        number_of_correct=number_of_correct+1;

      }
      else{
        number_of_wrong=number_of_wrong+1;
      }
    }
    this.state.number_of_correct=number_of_correct;
    this.state.number_of_wrong=number_of_wrong;
  }

  render(){
    if(typeof this.state.data!=='undefined' && this.state.data.length>0){
      if(this.state.correctAnswers.length==0){
          let correctAnswers=this.state.data.map((d)=>{
            return d.correctanswer;
          })
          //console.log("Correct Answers");
          //console.log(correctAnswers);
          this.setState({correctAnswers});
      }
      const currentQuestionIndex=this.state.currentQuestionIndex;
      //console.log(this.state.data);
      if(currentQuestionIndex>=this.state.data.length){
        this.getResults();
        let number_of_correct=this.state.number_of_correct;
        let number_of_wrong=this.state.number_of_wrong;
        //console.log(this.state.answers);
        //console.log(this.state.correctAnswers);
        //console.log(this.state.number_of_correct);
        //console.log(this.state.number_of_wrong);
        return(<div><h1>End of the Quiz</h1>
        <div style={{position:"absolute",top:"200px",left:"550px"}}>
                              <h3>No.of CorrectAnswers : {number_of_correct}</h3>
                              <h3>No.of WrongAnswers : {number_of_wrong}</h3>
                              <h3>Total Score : {number_of_correct}</h3>
                           </div></div>)
      }
      var question;
      var answers;
      question=this.state.data[currentQuestionIndex].questiontext;
      var answerlist=this.state.data[currentQuestionIndex].answerlist
      //var answer_list_jsx=answerlist.map((d)=><label><input type='radio' value={d} name="foo"  onChange={(evt)=>this.onChangeOption(evt.target.value)}/>{d}<br /> </label>)
      var answer_list_jsx=answerlist.map((d)=><button key={d} onClick={()=>this.button_func(d)}>{d}</button>)
      
      return(<div>
        <h1> Question {currentQuestionIndex+1}</h1>
        <h3>{question}</h3>
        {answer_list_jsx}
        <button onClick={()=>this.handleNext()}></button>
        
      </div>)


      
    }
    else{
      return (<div>Loading Questions</div>)
    }
    
  }




}
// import db from './db';

/*

export default class Technical extends Component {
    constructor() {
      super();
      this.state = {
        
        data: [],
        dict:{},
        data_ids:[],
        
        count: 0,
        
       
        correctAnswers:0,
        wrongAnswers:0,
        endQuiz: false,
        // buttonClicked: false
      };
      // this.getDetails = this.getDetails.bind(this);
    }

   

    componentDidMount() {
      axios.get("http://localhost:5000/users/tech").then(res => {
        this.setState({
          data: res.data ,
           
        });
      });
    }
    func(){
      if(this.state.data!==[]){
        //console.log(this.state.data);
        this.state.data_ids=this.state.data.map((dat)=>{return dat._id;})
      }
      //console.log(this.state.data_ids);
  

      
    }

    
  handlecheck=(e, ans)=>{
    //console.log(ans)
    var wrongAnswers = this.state.wrongAnswers;
    var correctAnswers=this.state.correctAnswers;
    var dict=this.state.dict;
    if(ans.correctanswer === e.currentTarget.value) {
      //correctAnswers = correctAnswers + 1
      dict[ans._id]=1
      this.setState({ dict })
    
    }else if(ans.correctanswer !== e.currentTarget.value) {
      // wrongAnswers = wrongAnswers + 1
      // correctAnswers = correctAnswers - 1
      dict[ans._id]=-1
      
      this.setState({ dict })

    }
  }

  submitQuiz = () => {
    this.setState({endQuiz: true})
    var wrongAnswers=this.state.wrongAnswers;
    var correctAnswers=this.state.correctAnswers;
    var dict=this.state.dict;
    for(var key in dict){
      if(dict[key]===1){
        correctAnswers=correctAnswers+1;
      }else{
        wrongAnswers=wrongAnswers+1;
      }
    }
    this.setState({wrongAnswers,correctAnswers});
  }


    render() {

    
      const {correctAnswers} = this.state;
      const {wrongAnswers} = this.state;
      let message;
      if(this.state.data!==[]){
        message=<div>
          <Everyitem index={0}></Everyitem>
        </div>
      }
      else{
        message=<div></div>
      }
      return (
        <div>
          {message}
        </div>
        
      );
    }
  }
*/