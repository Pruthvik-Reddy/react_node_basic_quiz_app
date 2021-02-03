import React, { Component } from 'react';
import axios from "axios";
import './exam.css';
import {Navbar,Nav} from 'react-bootstrap';


export default class Aptitude extends Component {
    constructor() {
      super();
      this.state = {
        
        data: [],
        name : [],
        count: 0,
        dict : {},
        pass : "Pass",
        fail: "Fail",

//        count: 0,
        correctAnswers:0,
        wrongAnswers:0,
        endQuiz: false,
        // buttonClicked: false
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
   
    handlecheck=(e, ans)=>{
      console.log(ans)
      //console.log(id);
      //var wrongAnswers = this.state.wrongAnswers;
      //var correctAnswers=this.state.correctAnswers;
      var dict = this.state.dict;
      //var id = this.state.id;
      //console.log(id);
      if(ans.correctanswer === e.currentTarget.value) {
        //correctAnswers = correctAnswers + 1
        dict[ans._id] = 1
        this.setState({ dict })
      
      }else if(ans.correctanswer !== e.currentTarget.value) {
        dict[ans._id] = -1
        //wrongAnswers = wrongAnswers + 1
        //correctAnswers = correctAnswers - 1
        this.setState({ dict })
  
      }
    }
  
    submitQuiz = () => {
      //console.log
      this.setState({endQuiz: true})
      var wrongAnswers = this.state.wrongAnswers;
      var correctAnswers=this.state.correctAnswers;
      var dict = this.state.dict;
      var name = this.state.name;
  
      for (var key in dict){
        if (dict[key] === 1){
          correctAnswers = correctAnswers + 1
        }
        else{
          wrongAnswers = wrongAnswers + 1
        }
        
      }
      this.setState({ wrongAnswers, correctAnswers })
      this.setState({name})
  
        //postive  += 1
    }
  
    render() {
      const {correctAnswers} = this.state;
      const {wrongAnswers} = this.state;
      return (
        <div className="container cd1">
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/" style={{fontWeight:"bold"}}>Quiz App</Navbar.Brand>
            <Nav className="mr-auto">
                
                <Nav.Link href="" style={{color:"white"}}>{this.state.name}</Nav.Link>
             </Nav>      
         </Navbar>

        <div className="container cd9">           
              {/* <button
                className="btn btn-primary"
                onClick={this.getDetails}
              >
                Start Exam
              </button> */}
              {this.state.endQuiz === false ? <form onSubmit={this.onSubmit}>
              <div>
              
                   {this.state.data.map(data=> {
                      return (
                        <React.Fragment>
                          
                          <p> 
                            <b>Quiz</b> : <b> {data.questiontext} </b>
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
                  <h3>Username: {this.state.name}    </h3>
                  <h3>No.of CorrectAnswers : {Number(correctAnswers) < 0 ? 0 : correctAnswers}</h3>
                  <h3>No.of WrongAnswers : {wrongAnswers}</h3>
                  <h3>Total Score : {Number(correctAnswers) < 0 ? 0 : correctAnswers}</h3>
                  <h3>Result: {Number(correctAnswers) >= Number(this.state.data.length)/2 ? this.state.pass : this.state.fail}</h3>
               </div>}
             </div>
             
        </div>
      );
    }
  }
