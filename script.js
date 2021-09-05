
//player factory thatll make a new player module whenever it is called.
const Player = (name,move,turn) =>{
    const getPlayerName = ()=>{
        return name
    }
    const getMoveType = ()=>{
        return move
    }
    // this logic helps determine whose turn is it
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

// contains the board array, initalizes two players, and has the check winner function
const gameBoard = (()=>{
    const boardArray = [' ',' ',' ',' ',' ',' ',' ',' ',' ']
    //intialize players
    const player1 = Player('player1','X',true)
    const player2 = Player('player2','O',false)

    const checkWinner = (check=false)=>{
        const winningCombos = [[0,1,2],[3,4,5],[6,7,8],
                                [0,3,6],[1,4,7],[2,5,8],
                                [0,4,8],[2,4,6]]
        for (var i = 0; i< winningCombos.length; i++){
            let winStringCheck = ''
            winningCombos[i].forEach((box)=>{
                winStringCheck += gameBoard.boardArray[box]
            })
            if(check){
                console.log(gameBoard.boardArray)
                console.log(winStringCheck)
            }
            if(winStringCheck === 'XXX' || winStringCheck === 'OOO'){
                return(winStringCheck[0])
            }else if(gameBoard.boardArray.includes(' ') === false){
                //setTimeout(()=>{alert("It's a Tie")},1)
                return('tie')
            }
        }
        return(null)
    }
    return{boardArray,player1,player2,checkWinner}

    
})();

// contains selectors from HTML
const displayController = (()=>{
    const boxSelectors = document.getElementsByClassName("box")

    const resetSelector = document.getElementById("reset")

    const vsCPU = document.getElementById("CPU")
    const vsPlayer = document.getElementById("player2")

    const render = () => (gameBoard.boardArray.forEach((move,index)=>{
            boxSelectors[index].innerHTML = move
        }));
    
    return{boxSelectors,resetSelector,vsCPU,vsPlayer,render}

})();

// holds info for the CPU such as move type
const CPU =(()=>{
    let openMoves = []
    const cpuMoveType = ()=>{return('O')}
    return{cpuMoveType}
})();


// contains both the minimax algrothim and a bestmove function to determine the best move for the cpu
const ai = (()=>{
    const bestMove = ()=>{
        let bestScore = -Infinity;
        let move;

        gameBoard.boardArray.forEach((box,index)=>{
        if(box === ' '){
            gameBoard.boardArray[index] = CPU.cpuMoveType()
            let score = minimax(gameBoard.boardArray,0,false);
            gameBoard.boardArray[index] = ' ';
            if (score > bestScore){
                bestScore = score;
                move = index
            }
            }
        })

        gameBoard.boardArray[move] = CPU.cpuMoveType();
    }

    let scores ={
        'O':1,
        'tie':0,
        'X':-1
        }

    const minimax = (board,depth,maximizingPlayer)=>{
        let result = gameBoard.checkWinner()
        if (result !== null){
            return scores[result];
        }
        
        if(maximizingPlayer){
            let bestScore = -Infinity
            board.forEach((box,index)=>{
                // is spot avalible?
                if(box === ' '){
                    board[index] = CPU.cpuMoveType()
                    let score = minimax(board,depth+1,false)
                    board[index] = ' ';
                    bestScore = Math.max(score,bestScore);
                }
            }) 
            return bestScore;
        }else{
            let bestScore = Infinity;
            board.forEach((box,index)=>{
                if(box === ' '){
                    board[index] = gameBoard.player1.getMoveType()
                    let score = minimax(board,depth+1,true)
                    board[index] = ' ';
                    bestScore = Math.min(score,bestScore)
                }
        })
        return bestScore;
    }
}
    return{bestMove}
})();



const game = (() => {
    // checks to see if the game is vs the CPU or vs a real player
    let cpuCheck = true
    let playerCheck = false
    displayController.vsCPU.addEventListener('click',()=>{
        if (gameBoard.boardArray.toString() === [" ", " ", " ", " ", " ", " ", " ", " ", " "].toString()){
            cpuCheck = true
            playerCheck = false
            console.log(cpuCheck)
            }
    });
    displayController.vsPlayer.addEventListener('click',()=>{
        if (gameBoard.boardArray.toString() === [" ", " ", " ", " ", " ", " ", " ", " ", " "].toString()){
        cpuCheck = false
        playerCheck = true
        console.log(playerCheck)
        }
    });

    // adjusts the gameboard array based on where player 1 clicked. also controls player2/cpu moves
    Object.keys(displayController.boxSelectors).forEach((index)=>{
        displayController.boxSelectors[index].addEventListener('click',() =>{
            if(gameBoard.player1.getTurn() === true && gameBoard.boardArray[index] == ' '){
                gameBoard.boardArray[index] = gameBoard.player1.getMoveType()
                if(playerCheck === true){
                    gameBoard.player1.nextTurn()
                    gameBoard.player2.nextTurn()
                }
            }else if(gameBoard.player2.getTurn() === true && playerCheck === true && gameBoard.boardArray[index] == ' '){
                gameBoard.boardArray[index] = gameBoard.player2.getMoveType()
                gameBoard.player2.nextTurn()
                gameBoard.player1.nextTurn()
            }else{
                console.log(null)
                return(null)
                
            }
            if(cpuCheck === true){
                ai.bestMove()
            }
            displayController.render()
            let winner = gameBoard.checkWinner(check =true)
            console.log(winner)
            if(winner === 'X'|| winner==='O'){
                setTimeout(()=>{alert('WINNER!!!')},1)
            }else if (winner ==='tie'){
                setTimeout(()=>{alert('tie')},2)
            }
            console.log(gameBoard.boardArray)
        });
    })

    displayController.resetSelector.addEventListener('click',()=>{
        gameBoard.boardArray = [' ',' ',' ',' ',' ',' ',' ',' ',' ']
        displayController.render()
    })

})();


