
import React, { Component } from 'react';
import axios from "axios";
import './exam.css';
// import db from './db';


export default class Technical extends Component {
    constructor() {
      super();
      this.state = {
        
        data: [],
        
        count: 0,
        //correct_lis: [],
        //wrong_lis: [],
        
       
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

    
  handlecheck=(e, ans)=>{
    console.log(ans)
    var wrongAnswers = this.state.wrongAnswers;
    var correctAnswers=this.state.correctAnswers;
    //var num;
    if(ans.correctanswer === e.currentTarget.value) {
      correctAnswers = correctAnswers + 1
      // if (correctAnswers >= 0 && correctAnswers < 1 && wrongAnswers >= 1){
      //   num = wrongAnswers
      //   correctAnswers = correctAnswers + 1
      //   wrongAnswers = wrongAnswers - num  
      // }
      // if (correctAnswers >= 0 && correctAnswers < 1){
      //   //num = wrongAnswers
      //   correctAnswers = correctAnswers + 1
      //   //wrongAnswers = wrongAnswers - num  
      // }
      // if(wrongAnswers < correctAnswers){
      //   correctAnswers = correctAnswers + 1
      // }
    
      // if (wrongAnswers > 0){
      //   wrongAnswers = wrongAnswers - 1  
      // }
      this.setState({ correctAnswers })
      // console.log(wrongAnswers,correctAnswers);
    
    }else if(ans.correctanswer !== e.currentTarget.value) {
      wrongAnswers =wrongAnswers + 1
      correctAnswers = correctAnswers - 1
    //   if (wrongAnswers >= 0 && wrongAnswers < 1 && correctAnswers >= 1){
    //     num = correctAnswers
    //     wrongAnswers = wrongAnswers + 1
    //     correctAnswers = correctAnswers - num
    //   }
    //   if (wrongAnswers >= 0 && wrongAnswers < 1){
    //     //num = correctAnswers
    //     wrongAnswers = wrongAnswers + 1
    //     //correctAnswers = correctAnswers - num
    //   }
    //   if(wrongAnswers > correctAnswers){
    //       wrongAnswers = wrongAnswers + 1
    //   }
      
    //   if (correctAnswers >0){
    //     correctAnswers = correctAnswers - 1
    //   }
      
    this.setState({ wrongAnswers, correctAnswers })
    //   console.log(wrongAnswers,correctAnswers);
    // }

    // if (correctAnswers > wrongAnswers){
    //   correctAnswers = 0
    //   correctAnswers = 1
    //   console.log(correctAnswers);
    // }
    // else{
    //   wrongAnswers = 0
    //   wrongAnswers = 1
    //   console.log(wrongAnswers);

   }
  }

  submitQuiz = () => {
    this.setState({endQuiz: true})
  }

    render() {

      
      const {correctAnswers} = this.state;
      const {wrongAnswers} = this.state;
      return (
        <div>
        <div className="container cd9">           
              
              {this.state.endQuiz === false ? <form onSubmit={this.onSubmit}>
              <div>
              
                   {this.state.data.map(data=> {
                      return (
                        <React.Fragment>
                          
                          <p> 
                            {/* <b>Quiz</b> : <b> {data.questiontext} </b> */}
                            <b>Quiz</b> :   <b> {data.questiontext}</b>
                    {/* <h4> {currentIndex + 1} of {data.length} </h4> */}
                          </p>
                          <p> 
                            <input type="radio" name={data._id} value={data.answerlist[0]} id="0" onChange={(e)=>this.handlecheck(e, data)}/>&nbsp;
                            <label for="0">{data.answerlist[0]} </label>
                          </p>
                          <p> 
                          <input type="radio" name={data._id} value={data.answerlist[1]} id="1" onChange={(e)=>this.handlecheck(e, data)}/>&nbsp;
                          <label for="1">{data.answerlist[1]} </label>
                          </p>
                          <p> 
                          <input type="radio" name={data._id} value={data.answerlist[2]} id="2" onChange={(e)=>this.handlecheck (e, data)} />&nbsp;
                          <label for="2">{data.answerlist[2]} </label>
                          </p>
                          <p> 
                          <input type="radio" name={data._id} value={data.answerlist[3]} id="3" onChange={(e)=>this.handlecheck (e,data)} />&nbsp;
                          <label for="3">{data.answerlist[3]} </label> 
                          </p>
                          {/* <button className="button" onClick={this.nextQuestionHander} disabled = {this.state.disabled}>Next</button> */}
                        <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>  
                        </React.Fragment>
                      );
                    })
                  }
              </div> 
                            
              <div className="form-group">
                <input type="submit" value="Submit" onClick={this.submitQuiz} className="btn btn-primary btn-lg" />
               </div>
             </form> : <div style={{position:"absolute",top:"200px",left:"550px"}}>
                  <h3>No.of CorrectAnswers : {Number(correctAnswers) < 0 ? 0 : correctAnswers}</h3>
                  <h3>No.of WrongAnswers : {wrongAnswers}</h3>
                  <h3>Total Score : {Number(correctAnswers) < 0 ? 0 : correctAnswers}</h3>
               </div>}
             </div>
             
        </div>
      );
    }
  }
