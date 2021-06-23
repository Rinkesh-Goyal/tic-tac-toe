const player=(sign)=>{
    this.sign=sign; 
    const getSign=()=>{
        return this.sign;
    }
    return {getSign};
};

const GameBoard=()=>{
    const gameboard=["","","","","","","","",""];

    let setIndex=(index,sign)=>{
        gameboard[index]=sign;
    }

    let getIndex=()=>gameboard[index];
    return{setIndex,getIndex}
}


window.onload =function(){
    const div=document.querySelectorAll(".index");
    for(let i = 0;i<div.length;i++)
        div[i].addEventListener('click',gameController);
    }
let round=1;
let isOver=false;

function gameController(e){
    const playerX=player("X");
    const playerO=player("O");
    
    const play=(index)=>{
        GameBoard.setIndex(index,getCurrentPlayer());
        if(checkWinner(index)){
            display.setMsg(getCurrentPlayer());
            isOver=true;
            return;
        }
        
        if(round===9){
            display.setMsg("Draw");
            isOver=true;
            return;
        }
        round++;
        display.setMsg(`Player ${getCurrentPlayer()}'s turn`);
    }


    const getCurrentPlayer=()=>round%2!==0? playerX.getSign() : playerO.getSign();
    
    const checkWinner=(index)=>{
        const winCond=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]


    }


    
    console.log(e.target.dataset.index);
    
}

