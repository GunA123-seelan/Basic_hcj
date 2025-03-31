const btnEL = document.getElementById('rol-btn');
const diceEL = document.getElementById('dice');
const items = document.getElementById('items');

historyArr = [];
getDiceVal=()=>{
    const getNum = Math.floor(Math.random() * 6) +1;
    const diceFace = getDiceFace(getNum);
    diceEL.innerHTML=diceFace;
    historyArr.push(getNum);
    updateList();
}

updateList=()=>{
    items.innerHTML='';
    for(let i=0;i<historyArr.length;i++){
        const newlist = document.createElement('li');
        newlist.innerHTML=`Roll ${i+1} <span>${getDiceFace(historyArr[i])}</span>`;
        items.appendChild(newlist);
    }
}

getDiceFace=(num)=>{
    switch(num){
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

btnEL.addEventListener('click',()=>{
    diceEL.classList.add('add-roll');
    setTimeout(()=>{
        diceEL.classList.remove('add-roll');
        getDiceVal();
    },1000)
})