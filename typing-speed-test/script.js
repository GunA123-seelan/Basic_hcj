const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "JavaScript is the language of the web.",
    "Frontend development includes HTML, CSS, and JavaScript.",
    "Practice makes perfect.",
    "Typing fast improves your productivity."
];

const quoteElement = document.getElementById("quote");
const textInput = document.getElementById("textInput");
const startBtn = document.getElementById("startBtn");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");
const clearElement = document.getElementById("clearBtn");

let timer = 0;
let interval = null;
let currentQuote = ""; 
// let startTime = false;

clearElement.addEventListener('click',()=>{
    clearElement.disabled=true;
    interval=null;
    timer=0;
    timerElement.textContent=''; 
    quoteElement.textContent='';
    textInput.value='';
    textInput.disabled=false;
    startBtn.disabled=false;
    resultElement.textContent='';

})
startBtn.addEventListener('click',startPro);

function startPro(){
    console.log("start");
    textInput.disabled=false;
    currentQuote=getQuote();
    quoteElement.textContent=currentQuote;
    startBtn.disabled=true;
    textInput.value="";
    clearElement.disabled=true;
    textInput.focus();
    interval = setInterval(()=>{
        timer++;
        timerElement.textContent=`Time ${timer}s`
    },1000)
    
}
textInput.addEventListener('input',()=>{
        if(textInput.value === currentQuote){
            endPro();
        }
})
function endPro(){
    console.log("endpro",textInput.value);
    clearInterval(interval);
    let trim1=textInput.value.trim();
    let words = trim1.split(" ").length;
    console.log("words",words);
    if(textInput.value === currentQuote){
        resultElement.textContent = `Well done! Your speed is ${words} words in ${timer} seconds.`;
        clearElement.disabled=false;
        textInput.disabled=true;
    }else{
        resultElement.textContent=`sorry`;
    }
}
function getQuote(){
    return quotes[Math.floor(Math.random() * quotes.length)]
}
