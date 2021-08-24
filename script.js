// Create a gameboard obj with an array that displays the board
// function that registers DOM events and adjusts the array above
// function to display the current array
// logic to see if you won the game/draw/loss
// register whos X and whose O
// ['x','x','x','x','x','x','x','x','x']

const gameBoard = (()=>{
    const boardArray = ['','','','','','','','','']


    return{boardArray}

})();

const displayController = (()=>{
    const boxSelectors = document.getElementsByClassName("box")

    const render = (gameBoard.boardArray.forEach((move,index)=>{
            boxSelectors[index].innerHTML = move
        }));
    
    return{boxSelectors,render}

})();

const Player = () =>{
    
    


};

const game = (() => {
    let lastX = false



    
    // NEED TO FIX 
    Object.keys(displayController.boxSelectors).forEach((selector,index)=>{
        selector.addEventListener('click',() =>{
            if(lastX === False){
                gameBoard.boardArray[index] = 'X'
            }else{
                gameBoard.boardArray[index] = 'O'
            }
            displayController.render
        });
    })
})();