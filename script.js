// Create a gameboard obj with an array that displays the board
// function that registers DOM events and adjusts the array above
// function to display the current array
// logic to see if you won the game/draw/loss
// register whos X and whose O
// ['x','x','x','x','x','x','x','x','x']



const Player = (name,move,turn) =>{
    const getPlayerName = ()=>{
        return name
    }
    const getMoveType = ()=>{
        return move
    }

    let currentTurn = turn

    const getTurn = ()=> {
        return currentTurn
    }
    const nextTurn = ()=>{
        if(currentTurn === true){
            currentTurn = false
        }else{
            currentTurn = true
        }
    }
    return{getPlayerName,getMoveType,getTurn,nextTurn}
};

const gameBoard = (()=>{
    const boardArray = ['','','','','','','','','']
    //intialize players
    const player1 = Player('player1','X',true)
    const player2 = Player('player2','O',false)

    return{boardArray,player1,player2}

})();

const displayController = (()=>{
    const boxSelectors = document.getElementsByClassName("box")

    const render = () => (gameBoard.boardArray.forEach((move,index)=>{
            console.log("render check")
            console.log(gameBoard.boardArray)
            boxSelectors[index].innerHTML = move
        }));
    
    return{boxSelectors,render}

})();

const game = (() => {
    // NEED TO FIX 
    Object.keys(displayController.boxSelectors).forEach((index)=>{
        displayController.boxSelectors[index].addEventListener('click',() =>{
            if(gameBoard.player1.getTurn() === true){
                gameBoard.boardArray[index] = gameBoard.player1.getMoveType()
                console.log("player 1 turn")
                gameBoard.player1.nextTurn()
                gameBoard.player2.nextTurn()
            }else if(gameBoard.player2.getTurn() === true){
                gameBoard.boardArray[index] = gameBoard.player2.getMoveType()
                console.log("player 2 turn")
                gameBoard.player1.nextTurn()
                gameBoard.player2.nextTurn()
            }else{
                console.log(gameBoard.player1.getTurn())
                console.log(gameBoard.player2.getTurn())
            }
            displayController.render()
            console.log(gameBoard.boardArray)
        });
    })
})();