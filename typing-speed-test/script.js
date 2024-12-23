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

let timer = 0;
let interval = null;
let currentQuote = "";
let startTime = false;


function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}


function startTypingTest() {
    currentQuote = getRandomQuote();
    quoteElement.textContent = currentQuote;
    textInput.value = "";
    textInput.disabled = false;
    textInput.focus();
    timer = 0;
    startTime = true;
    resultElement.textContent = "";
    startBtn.disabled = true;

    interval = setInterval(() => {
        timer++;
        timerElement.textContent = `Time: ${timer}s`;
    }, 1000);
}

function endTypingTest() {
    clearInterval(interval);
    textInput.disabled = true;
    startBtn.disabled = false;

    const typedText = textInput.value.trim();
    const wordsTyped = typedText.split(" ").length;
    const correct = typedText === currentQuote;

    if (correct) {
        resultElement.textContent = `Well done! Your speed is ${wordsTyped} words in ${timer} seconds.`;
    } else {
        resultElement.textContent = `Oops! Make sure you type the quote correctly.`;
    }
}

startBtn.addEventListener("click", startTypingTest);

textInput.addEventListener("input", () => {
    if (textInput.value === currentQuote) {
        endTypingTest();
    }
});
