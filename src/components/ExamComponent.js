import React from 'react';
import axios from 'axios';
import '../App.css';
/*function getQuestion(id)
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
}*/
let quesArray=[];
let index=0;
function GetPrevQuestion() {
    var ques=quesArray[index-2].questiona;
    var stat=quesArray[index-2].statementa;
    var opt=quesArray[index-2].optionsa;
    index=index-1;
    const answers = opt.map(e=>{
        return(
          `<label>
              <input type="radio" name="ques${opt.indexOf(e.option)}" value="${e.option}">
              ${e.option} 
            </label>
            <br> </br>`);
      });
      const answerST = answers.join('');
        const questdiv = `
                        <br> </br>
                        <div>
                          <div class = "question" id = "ques">
                            <p style="font-size: 18px">Ques. ${stat}</p>
                            ${answerST}
                          </div>
                        </div>
      `;
document.getElementById('maindiv').innerHTML=questdiv;
}
function RenderQuestion(id)
{
  //document.getElementById('maindiv').innerHTML="";
    const quesurl = 'https://www.exambazaar.com/api/coding-round/routes/random-question';
    axios.post(quesurl, {"api_key": "9928577901", "api_secret": "5ee9bee4376b540ffdc6c9ad", "examId":id})
    .then((response) => {
      const question = response.data.data.question.questions[0];
      const statement = question.question;
      const options = question.options;
      const img=response.data.data.question.images;
      if(img!==null)
      {
        for(var i=0;i<img.length;i++)
        {
            const img1=img[i];
            return(`<img src="${img1}" /><br>`)
        }
       
      }

      const obj={
          questiona:question,
          statementa:statement,
          optionsa:options
      }
      quesArray.push(obj);
      index=index+1;
        const answers = options.map(e=>{
        return(
          `
          <label>
              <input type="radio" name="question${options.indexOf(e.option)}" value="${e.option}">
              ${e.option} 
            </label>
           
            <br> </br>`);
      });
      const answerST = answers.join('');

      const questdiv = `
                        <br> </br>
                        <div>
                          <div class = "question" id = "question">
                            <p style="font-size: 18px">Ques. ${statement}</p>
                            ${answerST}
                          </div>
                        </div>
      `;
document.getElementById('maindiv').innerHTML=questdiv;
 //console.log(question);
      console.log(statement);
      console.log(options);
    }, (error) => {
      console.log(error);
    });
}
const RenderExams=(props)=>{
    const exams=props.exams;
    const examsArr=exams.map(e=>{
        return(
        
           <ul className='list'>
       <li key={e._id} className='listitem'>
       <button onClick={()=>RenderQuestion(e._id)} className='btnexm'> {e.name}</button>
       <li> 
       <button onClick={()=>RenderQuestion(e._id)} className='btndir'> Next </button>
       </li>
       <li> 
       <button onClick={()=>GetPrevQuestion()} className='btndir'> Previous </button>
       </li>
        </li>
       
        </ul>
        
        );
    })
    return examsArr;
};
export default RenderExams;