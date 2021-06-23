
window.onload=(event)=>{



const Player=(sign)=>{
    this.sign=sign;

    const getSign=()=>{return sign;}
    return{getSign};
}

const gameBoard=(()=>{
    const board=["","","","","","","","",""];

    const setField=(index,sign)=>{
        board[index]=sign;
    }

    const getField=(index)=>{return board[index];}

    const reset=()=>{
        for(let i=0;i<board.length;i++){
            board[i]="";
        }
    }

    return{setField,getField,reset};
})();

const display=(()=>{
    const field=document.querySelectorAll(".index");
    const message=document.getElementById("msg");
    const restartElement=document.getElementById("restart");
    
    for(let i=0;i<field.length;i++){
        field[i].addEventListener('click',(e)=>{
            // console.log(typeof (e.target.dataset.index));
            gameController.playRound(parseInt(e.target.dataset.index));
            updateBoard();
        })
    }

    restartElement.addEventListener('click',restart)

    const updateBoard=()=>{
        for(let i=0;i<field.length;i++){
            field[i].textContent=gameBoard.getField(i);
        }
    }

    const setResultMessage = (winner) => {
        if (winner === "Draw") {
          setMessageElement("It's a draw!");
        } else {
          setMessageElement(`Player ${winner} has won!`);
        }
      };
    
      const setMessageElement = (msg) => {
        message.textContent = msg;
      };

    return {updateBoard,setResultMessage,setMessageElement};
})();

const gameController=(()=>{
    let round=1;
    let isOver=false;
    const playerX=Player('X');
    const playerO=Player('O');

    const playRound=(fieldIndex)=>{
        gameBoard.setField(fieldIndex,getCurrentPlayer());

        if(checkWinner(fieldIndex)){
            display.setResultMessage(getCurrentPlayer());
            isOver=true;
            //Add logic to reload
            // setTimeout(window.location.reload,500);
            // reset();
            // gameBoard.reset();
            // updateBoard();
            setTimeout(restart,2000);
            
            return;
        }

        if(round===9){
            display.setResultMessage('Draw');
            isOver=true;
            return;
        }
        round++;
        // console.log(round);
        display.setMessageElement(`Player ${getCurrentPlayer()}'s turn`);

    };

    const getCurrentPlayer=()=>{
        
        return round%2===1?playerX.getSign():playerO.getSign();
    }

    const checkWinner = (fieldIndex) => {
        const winConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
    
        return winConditions
          .filter((combination) => combination.includes(fieldIndex))
          .some((possibleCombination) =>
            possibleCombination.every(
              (index) => gameBoard.getField(index) === getCurrentPlayer()
            )
          );
      };

    const getIsOver=()=>{
        return isOver;
    }

    const reset=()=>{
        round=1;
        isOver=false;
    }
            
    return{playRound,reset,getIsOver};

})();

function restart(){
            gameController.reset();
            gameBoard.reset();
            display.updateBoard();
            display.setMessageElement("Player X's turn");
    }
}
