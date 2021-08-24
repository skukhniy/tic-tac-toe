// Create a gameboard obj with an array that displays the board
// function that registers DOM events and adjusts the array above
// function to display the current array
// logic to see if you won the game/draw/loss
// register whos X and whose O

const gameBoard = (()=>{
    const boardArray = ['x','x','x','x','x','x','x','x','x']


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
