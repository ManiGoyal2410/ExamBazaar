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
let isFirst=true;
function NewQuestion(id)
{
  //console.log('Next clicked');
  RenderQuestion(id);
}
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
      if(index===0)
          {
            
            const prevBTN = document.getElementById('prevbtn');
            prevBTN.disabled = true;
            
            console.log(prevBTN); 
            isFirst=true;
          }
          else
          {
            const prevBTN = document.getElementById('prevbtn');
            prevBTN.disabled = false;
            document.getElementById('maindiv').innerHTML=questdiv;
          }

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
      const mcqma = question.mcqma;
      if(img!==null)
      {
        for(var i=0;i<img.length;i++)
        {
            var img1=img[i];
            console.log(img1);
           var imgage= `<div><img src="${img1}" alt="image"/></div><br>`;
           document.getElementById('imgdiv').innerHTML=imgage;
           //console.log(document.getElementById('maindiv').insertAdjacentHTML('beforeend',imgage))
           console.log(imgage)
        }
       
      }
      if(img==null)
      {
        document.getElementById('imgdiv').innerHTML="";
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
      if(isFirst)
      {
        const buttonHTML = `
        <div style="margin-left: 15px">
        <ButtonGroup>
          <Button id="prevbtn" color="primary">Previous</Button>
          <Button id="nextbtn" color="secondary">Next</Button>
        </ButtonGroup>
        </div>`
        ;
        document.getElementById('maindiv').insertAdjacentHTML('afterend',buttonHTML);
              const nextBTN = document.getElementById('nextbtn');
              nextBTN.onclick = function() {NewQuestion(id);};
              const prevBTN = document.getElementById('prevbtn');
              prevBTN.onclick = function() {GetPrevQuestion();};
              prevBTN.disabled = true;
              console.log(nextBTN);
              console.log(prevBTN); 
              
      }
      else
      {
        const prevBTN = document.getElementById('prevbtn');
        prevBTN.disabled = false;
        const nextBTN = document.getElementById('nextbtn');
        nextBTN.onclick = function() {NewQuestion(id);};
        
      }
      
document.getElementById('maindiv').innerHTML=questdiv;
isFirst=false;

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
       
       
        </li>
       
        </ul>
        
        );
    })
    return examsArr;
};
export default RenderExams;