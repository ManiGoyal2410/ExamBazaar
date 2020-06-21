import React from 'react';
import axios from 'axios';
import RenderExams from './components/ExamComponent';
import './App.css';
class App extends React.Component{
    constructor(props){
        super(props);
            this.state={streams:{
                logo:{}
            },
            exams:[]
        }
        }
    
    componentDidMount(){
        this.fetchStream();
        //this.fetchExam();
       // this.getQues();
    }
    fetchStream=()=>{
        axios.get('https://www.exambazaar.com/api/coding-round/routes/exam-info/9928577901').then((response)=>{
        const streams=response.data.data.streams;
        this.setState({streams:streams})
        console.log(streams) 
        }).catch((error)=>{
                console.log(error);
                
        })
        
    }
    fetchExam=(k)=>{
        axios.get('https://www.exambazaar.com/api/coding-round/routes/exam-info/9928577901').then((response)=>{
            const exams=response.data.data.exams;
           const ext= exams.filter(exams=>exams.stream===k)
            this.setState({exams:ext})
            console.log(ext) 
            }).catch((error)=>{
                    console.log(error);
                    
            })
    }
    
    /*getQues=()=>{
        axios.post('https://www.exambazaar.com/api/coding-round/routes/random-question', {
            "api_key": "9928577901",
"api_secret": "5ee9bee4376b540ffdc6c9ad",
"examId":"58ac2c277e852a2c401a8c39"
          })
          .then(function (response) {
            console.log(response.data.data.question);
          })
          .catch(function (error) {
            console.log(error);
          });
    }*/
    
    render()
    {
        return(
            <div className='app'>
                <h1 className='heading1'>
                    ExamBazaar
                </h1>
                <div id="buttons">
                   
                    <button id="b1" onClick={()=>{this.fetchExam('58ac21ec144a140ee0fe62f1')}}>Engineering</button>
                    <button id="b1" onClick={()=>{this.fetchExam('58ac2211144a140ee0fe62f2')}}>Medical</button>
                    <button id="b1" onClick={()=>{this.fetchExam('58ac2222144a140ee0fe62f3')}}>Commerce</button>
                    <button id="b1" onClick={()=>{this.fetchExam('58ac222e144a140ee0fe62f4')}}>School</button>
                    <button id="b1" onClick={()=>{this.fetchExam('58ac226e3cfd4f32bccf8a7d')}}>MBA</button>
                    <button id="b1" onClick={()=>{this.fetchExam('58ac22823cfd4f32bccf8a7e')}}>Law</button>
                    <button id="b1" onClick={()=>{this.fetchExam('58ac22913cfd4f32bccf8a7f')}}>Foreign Studies</button>
                    <button id="b1" onClick={()=>{this.fetchExam('58ac22a33cfd4f32bccf8a80')}}>Civil Services</button>
                    <button id="b1" onClick={()=>{this.fetchExam('58ac22ac3cfd4f32bccf8a81')}}>SSC</button>
                    <button id="b1" onClick={()=>{this.fetchExam('58ac22b73cfd4f32bccf8a82')}}>Bank</button>
                    <button id="b1" onClick={()=>{this.fetchExam('58ac22c13cfd4f32bccf8a83')}}>Defence</button>
                    <button id="b1" onClick={()=>{this.fetchExam('5a9d473fafecc2120d6da0cb')}}>Design</button>
                    
                </div>

               
                <div className='card'>
                    
                    <RenderExams exams={this.state.exams}/>
                    
                </div>
                <div id='maindiv'>
                
                </div>
                <div id='imgdiv'></div>
            </div>
            
        
        );
    }
}
export default App;
