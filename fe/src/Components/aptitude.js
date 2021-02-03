import React, { Component } from 'react';
import axios from "axios";
import './exam.css';
import {Navbar,Nav} from 'react-bootstrap';


export default class Aptitude extends Component {
    constructor() {
      super();
      this.state = {
        data: [],
        
        //count: 0,
        currentQuestionIndex : 0,
        questions : [],
        answers : {},

        //correct_lis: [],
        //wrong_lis: [],
        name : [],
        //count: 0,
        dict : {},
        pass : "Pass",
        fail: "Fail",
        
       
        correctAnswers:[],
        number_of_correct:0,

        number_of_wrong:0,
        endQuiz: false,
      };
      // this.getDetails = this.getDetails.bind(this);
    }
  
    componentDidMount() {
      axios.get("http://localhost:5000/users/apt").then(res => {
        this.setState({
          data: res.data ,
           
        });
      });
      console.log('Hello world');
      axios.post("http://localhost:5000/users/login").then((res) => {
        
         this.setState({
         name: res.data.username
          
         });
        
        console.log(this.state.name);
         
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
        

    
    // handlecheck=(e, ans)=>{
    //   console.log(ans)
    //   //console.log(id);
    //   //var wrongAnswers = this.state.wrongAnswers;
    //   //var correctAnswers=this.state.correctAnswers;
    //   var dict = this.state.dict;
    //   //var id = this.state.id;
    //   //console.log(id);
    //   if(ans.correctanswer === e.currentTarget.value) {
    //     //correctAnswers = correctAnswers + 1
    //     dict[ans._id] = 1
    //     this.setState({ dict })
      
    //   }else if(ans.correctanswer !== e.currentTarget.value) {
    //     dict[ans._id] = -1
    //     //wrongAnswers = wrongAnswers + 1
    //     //correctAnswers = correctAnswers - 1
    //     this.setState({ dict })
  
    //   }
    // }
  
    // submitQuiz = () => {
    //   //console.log
    //   this.setState({endQuiz: true})
    //   var wrongAnswers = this.state.wrongAnswers;
    //   var correctAnswers=this.state.correctAnswers;
    //   var dict = this.state.dict;
    //   var name = this.state.name;
  
    //   for (var key in dict){
    //     if (dict[key] === 1){
    //       correctAnswers = correctAnswers + 1
    //     }
    //     else{
    //       wrongAnswers = wrongAnswers + 1
    //     }
        
    //   }
    //   this.setState({ wrongAnswers, correctAnswers })
    //   this.setState({name})
  
    //     //postive  += 1
    // }
  
    render() {
      //const {correctAnswers} = this.state;
      //const {wrongAnswers} = this.state;
      if(typeof this.state.data!=='undefined' && this.state.data.length>0){
        if(this.state.correctAnswers.length===0){
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
          return(
          <React.Fragment>
           <div className="container cd1">
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/" style={{fontWeight:"bold"}}>Quiz App</Navbar.Brand>
                <Nav className="mr-auto">
                    
                    <Nav.Link href="" style={{color:"white"}}>{this.state.name}</Nav.Link>
                 </Nav>      
            </Navbar>
    </div>
          <div><h1>End of the Quiz</h1>
          <div style={{position:"absolute",top:"200px",left:"550px"}}>
                                <h3>Username: {this.state.name}    </h3>
                                <h3>No.of CorrectAnswers : {number_of_correct}</h3>
                                <h3>No.of WrongAnswers : {number_of_wrong}</h3>
                                <h3>Total Score : {number_of_correct}</h3>
                                <h3>Result: {Number(number_of_correct) >= Number(this.state.data.length)/2 ? this.state.pass : this.state.fail}</h3>
                             </div></div>
                             </React.Fragment>)
        }
        var question;
        //var answers;
        question=this.state.data[currentQuestionIndex].questiontext;
        var answerlist=this.state.data[currentQuestionIndex].answerlist
        //var answer_list_jsx=answerlist.map((d)=><label><input type='radio' value={d} name="foo"  onChange={(evt)=>this.onChangeOption(evt.target.value)}/>{d}<br /> </label>)
        var answer_list_jsx=answerlist.map((d)=>{
          return (
            <React.Fragment>
          <button className="button button4" key={d} onClick={()=>this.button_func(d)}>{d}</button>
          <br></br>
          <br></br>
          </React.Fragment>
          )
        })
        
        return(<div>
  
  
  <div className="container cd1">
          <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/" style={{fontWeight:"bold"}}>Quiz App</Navbar.Brand>
              <Nav className="mr-auto">
                  
                  <Nav.Link href="" style={{color:"white"}}>{this.state.name}</Nav.Link>
               </Nav>      
           </Navbar>
  
  </div>
  
  <center>
        <h1> Question {currentQuestionIndex+1}</h1>
        <h3>{question}</h3>
        {answer_list_jsx}<br></br>
        <button className="button button1" onClick={()=>this.handleNext()}>Next</button>
        </center>
       
        </div>)
  
  
        
      }
      else{
        return (<div>Loading Questions</div>)
      }
  
  
  
  
               
          
          
      
      };
  }
