import React from 'react';
import axios from 'axios';
import '../App.css';
function getQuestion(id)
{
    axios.post('https://www.exambazaar.com/api/coding-round/routes/random-question', {
        "api_key": "9928577901",
"api_secret": "5ee9bee4376b540ffdc6c9ad",
"examId":id
      })
      .then(function (response) {
        console.log(response.data.data.question);
      })
      .catch(function (error) {
        console.log(error);
      });
}
const RenderExams=(props)=>{
    const exams=props.exams;
    const examsArr=exams.map(e=>{
        return(
        
           <ul className='list'>
       <li key={e._id} className='listitem'>
       <button onClick={()=>{getQuestion(e._id)}}> {e.name}</button>
       
        </li>
       
        </ul>
        
        );
    })
    return examsArr;
};
export default RenderExams;