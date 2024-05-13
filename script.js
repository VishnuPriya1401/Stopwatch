let [milliseconds, seconds, minutes, hours]= [0,0,0,0];

let int=null;
let lapCount = 1;
let isPause=false;
let isStart=false;
let isReset=false;

let hr= document.querySelector('.hr-time');
let min= document.querySelector('.min-time');
let sec= document.querySelector('.sec-time');
let millisec= document.querySelector('.ms-time');

document.querySelector('.start-btn').addEventListener('click',()=>{
  isReset=false;
  if((int !== null)&&(isStart)){
    clearInterval(int);
  }
  else{
    int = setInterval(displayTimer, 10);
    isStart=true;
  }
});

document.querySelector('.pause-btn').addEventListener('click',()=>{
  clearInterval(int);
  isPause=true;
  isStart=false;
});

document.querySelector('.lap-btn').addEventListener('click',()=>{
  if((!isPause)&&(int!==null)&&(!isReset)){
    clearInterval(int);
    lapSet(lapCount++);
  }
})

document.querySelector('.reset-btn').addEventListener('click',()=>{
  isPause=false;
  isStart=false;
  clearInterval(int);
  [milliseconds, seconds, minutes, hours]=[0,0,0,0];
  hr.innerHTML="00";
  min.innerHTML="00";
  sec.innerHTML="00";
  millisec.innerHTML="000";
  lapCount = 1;
  document.querySelector('.laps').innerHTML='';
  lapsHTML=[];
})

function displayTimer(){
  isPause=false;
  milliseconds+=10;
  if(milliseconds === 1000){
    milliseconds = 0;
    seconds++;
    if(seconds === 60){
      seconds = 0;
      minutes++;
      if(minutes === 60){
        minutes = 0;
        hours++;
      }
    }
  }
  let h = hours < 10 ? "0"+ hours : hours;
  let m = minutes < 10 ? "0"+ minutes : minutes;
  let s = seconds < 10 ? "0"+ seconds : seconds;
  let ms = milliseconds < 10
          ? "00" + milliseconds
          : milliseconds < 100
          ? "0" + milliseconds
          : milliseconds;
  
  hr.innerHTML=`${h}`; 
  min.innerHTML=`${m}`;
  sec.innerHTML=`${s}`;
  millisec.innerHTML=`${ms}`;
}


function lapSet(count){
  let lapsHTML = '';
  let lapcount='';

    const [ms, sec, min, hr] = [milliseconds, seconds, minutes, hours];

    let h = hr < 10 ? "0"+ hours : hours;
    let m = min < 10 ? "0"+ minutes : minutes;
    let s = sec < 10 ? "0"+ seconds : seconds;
    let millisec = ms < 10
            ? "00" + milliseconds
            : milliseconds < 100
            ? "0" + milliseconds
            : milliseconds;
    
    if(count<10){
      lapcount = '0'+count;
    }
    else{
      lapcount = count;
    }
    const html = `<div class="lap-record">${lapcount}. - ${h} : ${m} : ${s} : ${millisec}<div>`;
    
    lapsHTML+=html;

    document.querySelector('.laps').innerHTML += `${lapsHTML} \n`; 
        
    int = setInterval(displayTimer, 10);
}
