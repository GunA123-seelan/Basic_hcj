const buttonEL = document.getElementById('roll-btn');
const diceEL = document.getElementById('dice');

buttonEL.addEventListener('click',()=>{
    diceEL.classList.add('anim-roll');
    setTimeout(() => {
         diceEL.classList.remove('anim-roll');   
         generateDiceNum();
    },1000);
})

historyList=[];
generateDiceNum = ()=>{
    const diceNum = Math.floor(Math.random()*6)+1;
    console.log("diceNum",diceNum);
    const retNum = diceFaceGet(diceNum);
    console.log(retNum);
    diceEL.innerHTML = retNum;
    historyList.push(diceNum);
    updateHistory();
}

diceFaceGet = (num)=>{
    switch (num) {
        case 1:
          return "&#9856;";
        case 2:
          return "&#9857;";
        case 3:
          return "&#9858;";
        case 4:
          return "&#9859;";
        case 5:
          return "&#9860;";
        case 6:
          return "&#9861;";
        default:
          return "";
      }
}

updateHistory=()=>{
    console.log("history",historyList);

    const resultEL = document.getElementById('result');
    resultEL.innerHTML = '';
    for(let i=0;i<historyList.length;i++){
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `roll ${i+1} <span>${diceFaceGet(historyList[i])}</span>`;
        resultEL.appendChild(createDiv);
        // diceFaceGet(historyList[i]);
    }
}