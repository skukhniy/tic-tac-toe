// stop boxes from being clicked twice.
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

    const resetSelector = document.getElementById("reset")

    const vsCPU = document.getElementById("CPU")
    const vsPlayer = document.getElementById("player2")

    const render = () => (gameBoard.boardArray.forEach((move,index)=>{
            // console.log(gameBoard.boardArray)
            boxSelectors[index].innerHTML = move
        }));
    
    return{boxSelectors,resetSelector,vsCPU,vsPlayer,render}

})();

const CPU =(()=>{
// set up functions that'll grab random moves
//later on get functions that will always pick the optimal move.
    let openMoves = []
    const cpuMoveType = ()=>{return('O')}
    const cpuMove = ()=>{
        gameBoard.boardArray.forEach((box,index)=>{
            if(box === ''){
                openMoves.push(index)
            }
        })
        let move = openMoves[Math.floor(Math.random() * openMoves.length)]
        return(move)
    }
    return{cpuMove,cpuMoveType}
})();

const game = (() => {
    const checkWinner = ()=>{
        const winningCombos = [[0,1,2],[3,4,5],[6,7,8],
                                [0,3,6],[1,4,7],[2,5,8],
                                [0,4,8],[2,4,6]]
        for (var i = 0; i< winningCombos.length; i++){
            let winStringCheck = ''
            winningCombos[i].forEach((box)=>{
                winStringCheck += gameBoard.boardArray[box]
            })
            console.log(winStringCheck)
            if(winStringCheck === 'XXX' || winStringCheck === 'OOO'){
                // COME BACK TO DECIDE WHAT TO DO ONCE A WINNER IS DECIDED (RESET GAMEBOARD?)
                setTimeout(()=>{alert('WINNER!!!')},1)
                break
            }
        }
    }
    let cpuCheck = true
    let playerCheck = false
    displayController.vsCPU.addEventListener('click',()=>{
        if (gameBoard.boardArray === ['','','','','','','','','']){
            cpuCheck = true
            playerCheck = false
            }
    });
    displayController.vsPlayer.addEventListener('click',()=>{
        if (gameBoard.boardArray === ['','','','','','','','','']){
        cpuCheck = false
        playerCheck = true
        }
    });
    Object.keys(displayController.boxSelectors).forEach((index)=>{
        displayController.boxSelectors[index].addEventListener('click',() =>{
            if(gameBoard.player1.getTurn() === true && gameBoard.boardArray[index] == ''){
                gameBoard.boardArray[index] = gameBoard.player1.getMoveType()
                //console.log("player 1 turn")
                if(playerCheck === true){
                    gameBoard.player1.nextTurn()
                    gameBoard.player2.nextTurn()
                }
            }else if(gameBoard.player2.getTurn() === true && playerCheck === true && gameBoard.boardArray[index] == ''){
                    gameBoard.boardArray[index] = gameBoard.player2.getMoveType()
                    gameBoard.player2.nextTurn()
                    gameBoard.player1.nextTurn()
                    console.log('PLAYER 1 TURNED')
            }else{
                console.log(gameBoard.player1.getTurn())
                console.log(gameBoard.player2.getTurn())
            }
            if(cpuCheck === true){
                gameBoard.boardArray[CPU.cpuMove()] = CPU.cpuMoveType()
            }
            displayController.render()
            checkWinner()
            console.log(gameBoard.boardArray)
        });
    })

    displayController.resetSelector.addEventListener('click',()=>{
        gameBoard.boardArray = ['','','','','','','','','']
        displayController.render()
    })

})();