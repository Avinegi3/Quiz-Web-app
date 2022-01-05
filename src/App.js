import React,{useState} from 'react';
import Lottie from 'react-lottie';
import './App.css';

let questions=[];
let answers=[];
var s=0,m=0;
let x=0,y=0,count=0,accuracy=0;

fetch("https://api.startladder.co/api/frontend/tasks")
  .then(response => response.json())   
  .then(result=>{  
    console.log(result.task_array);
     while (y<=6) {
      questions.push(result.task_array[y].question);
      answers.push(result.task_array[y].answer);
      y++;
     }        
     
  });
  
function App() {

    
  const correct = {
    loop: true,
    autoplay: true,
    renderer:'svg',
    animationData: require('./tick.json'),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
   },
  }
   const wrong = {
    loop: true,
    autoplay: true,
    renderer:'svg',
    animationData: require('./wrong.json'),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
   },
  } 
  
  const[time,setTime]=useState({min:0,sec:0});
  const[divM,setDivM]=useState({display:"none"});
  const[value,setValue]=useState(""); 
  const[p,setP]=useState({display:"none"});
  const[button,setButton]=useState({display:"block"});
  const[div,setDiv]=useState({display: "none"}); 
  const[lottie,setlottie]=useState({display:"none"});
  const[lottie1,setlottie1]=useState({display:"none"});
  
  let updatedMin= time.min, updatedSec=time.sec;


  const checkAns=()=>{
     accuracy =Math.round((count/6)*100); 
     console.log(accuracy);
  }

  const start=()=>{
    run();
    setInterval(() => {
      run();
    }, 1000);
    
  }

  const run=()=>{
    updatedSec++;
    if(updatedSec===60){
      updatedMin=updatedMin+1;
      updatedSec=0;
    }
    setTime(updatedSec);
      s=updatedSec;
    setTime(updatedMin);
    m=updatedMin;
  }



  const ShowDiv=()=>{
    setButton({display: "none"});
    setDiv({display: "block"});
    start();
   }

    const keyPress=(event)=>{
      if(event.key==="Enter"){
        setValue("");
        check();
        
      } 
   }

   const check=()=>{
     var lower=answers[x].toLowerCase();
     console.log(lower);
     if(value===lower){
      count++;
        setlottie({display: "block"});
        setTimeout(() => {
          setlottie({display: "none"});
          x++;
        }, 3000);
          
      }
     else{
       console.log("no");
       
       setlottie1({display: "block"});
       setlottie1({margin:"25px auto"}); 
       setTimeout(() => {
        setlottie1({display: "none"});
        x++;
      }, 2000);
     }
     if(x===5){
      checkAns();
      setDivM({display: "block"})
    } 
   }

   const back=()=>{
    window.location.reload(false);
   }
   const solve=()=>{
    setShow({display: "none"});
    setP({display: "block"})
   }
  

  return (
    <div className="main">
    <div className="div1" style={div} >
      <h4 className="topic">TOPIC</h4>
      <p className="p1">Product Management</p>
      <div className="time"> 
      <div className="min"><p className="minP">{m} <br></br>MIN </p>  </div> 
      <div className="sec"> <p className="minP"> {s} <br></br>SEC</p>    </div>
      
      </div>
    </div>
    <div className="div2" style={div} >
      <h4 className="questions">QUESTION </h4>
      <p className="p2">{questions[x]}</p>
    </div>
    <div className="div3" style={div}  >
      <h4 className="answers">ANSWERS</h4>
      <input type="text" className="input" value={value} ref={(input) => {input && input.focus() }} onChange={event=>setValue(event.target.value)} placeholder="Type Answer..." onKeyPress={keyPress} />
      <p className="p3"> Stuck?</p><p className="hidep" style={p}>Time is running!</p> <button className="solution" style={show} onClick={solve} > See Solution </button>
      <Lottie style={lottie} options={correct} height={100} width={100}/><Lottie style={lottie1} options={wrong} height={50} width={50}/>
      
    </div>
    <button className="bt1" style={button} onClick={ShowDiv}> Start Quiz  </button>
    <div className="accuracy" style={divM}><h1 className="acc">Accuracy <br></br>{accuracy} %</h1>
    <button className="bt1 btn" onClick={back}>Play Again</button>
     </div>
    </div>
    
    
     );
}

export default App;
