import React, { Component } from "react";
import axios from 'axios';
import {Navbar} from 'react-bootstrap';
import "./Create.css";
export default class Create extends Component {
    constructor(props) {
        super(props);

        this.onChangequestiontext = this.onChangequestiontext.bind(this);
        this.onChangequestioncategory = this.onChangequestioncategory.bind(this);
        this.onChangeanswertype = this.onChangeanswertype.bind(this);
        this.onChangeanswerlist = this.onChangeanswerlist.bind(this);
        
        // this.onChangeoption1 = this.onChangeoption1.bind(this);
        // this.onChangeoption2 = this.onChangeoption2.bind(this);
        // this.onChangeoption3 = this.onChangeoption3.bind(this);
        // this.onChangeoption4 = this.onChangeoption4.bind(this);
        this.onChangecorrectanswer = this.onChangecorrectanswer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
           
            value:'',
            questiontext: '',
            questioncategory:'',
            answertype:'',
            answerlist:'',
            correctanswer:'',
            showMessage: false
            // option1:'',
            // option2:'',
            // option3:'',
            // option4:'',          

            
        }
    };

    error= () =>{
        if(this.state.questiontext !== '' 
        && this.state.questioncategory !== '' 
        && this.state.answertype !=='' 
        && this.state.answerlist !== '' 
        && this.state.correctanswer !== '') {
            this.setState({showMessage:true});
        }  else {
             alert("All fields are required")
        }
       };  

    onChangequestiontext(e) {
        this.setState({
            questiontext: e.target.value
        });
    }

    onChangequestioncategory(e) {
        this.setState({
            questioncategory: e.target.value
        });
    }

    onChangeanswertype(e) {
        this.setState({
            answertype: e.target.value
        });
    }
    onChangeanswerlist(e) {
        this.setState({
            answerlist: e.target.value.split(',')
        });
    }

    
   
    // onChangeoption1(e) {
    //     this.setState({
    //         option1: e.target.value
    //     });
    // }
    // onChangeoption2(e) {
    //     this.setState({
    //         option2: e.target.value
    //     });
    // }
    // onChangeoption3(e) {
    //     this.setState({
    //         option3: e.target.value
    //     });
    // }
    // onChangeoption4(e) {
    //     this.setState({
    //         option4: e.target.value
    //     });
    // }

    onChangecorrectanswer(e) {
        this.setState({
            correctanswer: e.target.value
        });
    }
    
    

  

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Question Text: ${this.state.questiontext}`);
        console.log(`Question Category: ${this.state.questioncategory}`);
        console.log(`Answer Type: ${this.state.answertype}`);
        console.log(`Answer list: ${this.state.answerlist}`);
        
        console.log(`CorrectAnswer : ${this.state.correctanswer}`);
    
        

        const newQuestion = {
            
            questiontext: this.state.questiontext,
            questioncategory: this.state.questioncategory,
            answertype: this.state.answertype,
            answerlist:this.state.answerlist,
            
            correctanswer: this.state.correctanswer  
            
        };

       


        axios.post('http://localhost:5000/users/ques', newQuestion)
            .then(res => console.log(res.data));
        
        
       
        
        this.setState({
            questiontext: '',
            questioncategory:'',
            answertype: '',
            answerlist:'',
            correctanswer: '',
                  

            
        })
    }

    dropdown = (e) =>{
        console.log(e.target.value)
       this.setState({
           value: e.target.value
       });   
    }   
    render() {
        return (
            <div className="container cd3">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/" style={{fontWeight:"bold"}}>Quiz App</Navbar.Brand> 
                    
                    {/* <Navbar.Brand href="/category" style={{fontWeight:"bold"}}>category</Navbar.Brand>    */}
                </Navbar>
            <div className="cd4">
                <h3 className="color">Create New Question</h3>
                <form onSubmit={this.onSubmit}>
                <div  style={{width :"500px"}} className="form-group">
                        <label className="color">Question Text: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.questiontext}
                                onChange={this.onChangequestiontext}
                                required
                                />
                    </div>
                    <div  style={{width :"500px"}} className="form-group">
                        <label className="color">Question Category: </label>
                        <select id="questioncategory"   
                        className="form-control"
                          value={this.state.questioncategory} 
                          onChange={this.onChangequestioncategory} 
                          required

                      >
                             <option value="">select.....</option>
                            <option value="Technical" >Technical</option>
                            <option value="GK">GK</option>
                            <option value="Aptitude">Aptitude</option>
                           
                      </select>
                                
                                
                    </div>
                    <div  style={{width :"500px"}} className="form-group">
                        <label className="color">Answer Type: </label>
                        <select   onClick={this.dropdown} 
                        className="form-control"
                        value={this.state.answertype} 
                        onChange={this.onChangeanswertype} 
                        required
                        
                        >
                            <option value="">select.....</option>
                            <option value="text">Textbox</option>
                            <option value="radio">RadioButton</option>
                            {/* <option value="check">Checkbox</option>
                            <option value="image">image</option>
                            <option value="video">video</option> */}
                        </select>
                 
                    </div>
                    <div  style={{width :"500px"}} className="form-group">
                        <label className="color">Answer List: </label>
                        {/* {this.state.value==='text'?<div>
                            <input
                             type="text"
                             className="form-control"
                             id="t"
                             value={this.state.answerlist} 
                             onChange={this.onChangeanswerlist} 
                             />
                        </div>:null} */}

                        {this.state.value==='radio'?<div>
                        <input type="text"
                         className="form-control"
                         placeholder="option1,option2,option3,option4"
                         value={this.state.answerlist} 
                         onChange={this.onChangeanswerlist}
                         required 
                        /><br/>
                       
                                </div>:null}
                       
                                            
                                    </div>
                  
                    <div  style={{width :"500px"}} className="form-group">
                        <label className="color">CorrectAnswer: </label>
                        <input
                                type="text" 
                                className="form-control"
                                value={this.state.correctanswer}
                                onChange={this.onChangecorrectanswer}
                                required
                                />
                    </div>
                     
                    <div   className="color" className="form-group">{
                           this.state.showMessage && <p> Question Created   </p>
                    }
                        <button type="submit" value="Save " className="btn btn-primary middle1" onClick={() => this.error()}>Create
                        </button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

 
 
 