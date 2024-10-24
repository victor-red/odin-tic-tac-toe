const handleDom = (function (){
    const startGameButton = () => {
        const startGameButton = document.querySelector(".start-game-button");
        const startGameDiv = document.querySelector(".start-game-div");
        const confirmGameButton = document.querySelector(".confirm-game-button");
        const overlay = document.querySelector(".overlay");
        overlay.addEventListener("click", () =>{
            overlay.classList.remove("active");
            startGameDiv.classList.remove("active");
        });
        startGameButton.addEventListener("click", () =>{
            overlay.classList.toggle("active");
            startGameDiv.classList.toggle("active");
        }
        );
        confirmGameButton.addEventListener("click", () => {
            const player1Name = document.querySelector("#player1-name").value;
            const player2Name = document.querySelector("#player2-name").value;
            const player1NameInput = document.querySelector("#player1-name");
            const player2NameInput = document.querySelector("#player2-name");
            const playerOne = createPlayer(player1Name, "X");
            const playerTwo = createPlayer(player2Name, "O");
            const tictactoe = game(playerOne, playerTwo);
            overlay.classList.remove("active");
            startGameDiv.classList.remove("active");
            tictactoe.playRound();
            player1NameInput.value = '';
            player2NameInput.value = '';
            console.log(playerOne.playerName);
            console.log(playerTwo.playerName);
        })
    }
    return{startGameButton};
}())


const gameBoard = (function (){
    
    let boardArray;

    const initializeArray = () => boardArray = Array(9).fill(null);

    const updateBoard = (position, player) => boardArray[position] = player.playerMarker;

    const getBoard = () => boardArray;

    const resetBoard = () =>{
        boardArray.length = 0;
        boardArray = Array(9).fill(null)};

     const notStarted =() => {
            alert('Game not started yet.');
        }

    const initializeCells = () => {
        
        let gridCells = Array.from(document.querySelectorAll(".tic-tac-toe-cell"))

        for (let i = 0; i < gridCells.length; i++){
            gridCells[i].addEventListener("click", notStarted);
        }
    }

    return {initializeArray, updateBoard, getBoard, resetBoard, initializeCells, notStarted};
})();

function createPlayer(name, marker){
    const playerName = name;
    const playerMarker = marker;

    return {playerName, playerMarker};

}

function game(player1, player2){

    let gridCells = Array.from(document.querySelectorAll(".tic-tac-toe-cell"))


    let round;

    gameBoard.initializeArray(gridCells);



    const resetBoardMarkers = () => {

        const grid = document.querySelector(".tic-tac-toe-div");
        let gridCells = Array.from(document.querySelectorAll(".tic-tac-toe-cell"))

        for (let i = 0; i < gridCells.length; i++){
                const newCell = document.createElement("div");
                newCell.classList.add("tic-tac-toe-cell");
                grid.appendChild(newCell);
                gridCells[i].remove()
        }


        gameBoard.initializeArray();
        gameBoard.initializeCells();

    }

    const checkDraw = () => {
        let count = 0;
        for ( let l = 0; l < gameBoard.getBoard().length; l++){
            if (gameBoard.getBoard()[l] != null){
                count++
            }
        }
        if (count == gameBoard.getBoard().length){
            alert(`It is a draw!`);
            gameBoard.resetBoard();
            resetBoardMarkers();
        }
    }

    const checkWin = () => {
        if((gameBoard.getBoard()[0] == gameBoard.getBoard()[1] && gameBoard.getBoard()[1] == gameBoard.getBoard()[2] && gameBoard.getBoard()[0] == gameBoard.getBoard()[2] && gameBoard.getBoard()[0] != null) ||
        (gameBoard.getBoard()[3] == gameBoard.getBoard()[4] && gameBoard.getBoard()[4] == gameBoard.getBoard()[5] && gameBoard.getBoard()[3] == gameBoard.getBoard()[5] && gameBoard.getBoard()[3] != null) ||
        (gameBoard.getBoard()[6] == gameBoard.getBoard()[7] && gameBoard.getBoard()[7] == gameBoard.getBoard()[8] && gameBoard.getBoard()[6] == gameBoard.getBoard()[8] && gameBoard.getBoard()[6] != null) ||
        (gameBoard.getBoard()[0] == gameBoard.getBoard()[3] && gameBoard.getBoard()[3] == gameBoard.getBoard()[6] && gameBoard.getBoard()[0] == gameBoard.getBoard()[6] && gameBoard.getBoard()[0] != null) ||
        (gameBoard.getBoard()[1] == gameBoard.getBoard()[4] && gameBoard.getBoard()[4] == gameBoard.getBoard()[7] && gameBoard.getBoard()[1] == gameBoard.getBoard()[7] && gameBoard.getBoard()[1] != null) ||
        (gameBoard.getBoard()[2] == gameBoard.getBoard()[5] && gameBoard.getBoard()[5] == gameBoard.getBoard()[8] && gameBoard.getBoard()[2] == gameBoard.getBoard()[8] && gameBoard.getBoard()[2] != null) ||
        (gameBoard.getBoard()[0] == gameBoard.getBoard()[4] && gameBoard.getBoard()[4] == gameBoard.getBoard()[8] && gameBoard.getBoard()[0] == gameBoard.getBoard()[8] && gameBoard.getBoard()[0] != null) ||
        (gameBoard.getBoard()[2] == gameBoard.getBoard()[4] && gameBoard.getBoard()[4] == gameBoard.getBoard()[6] && gameBoard.getBoard()[2] == gameBoard.getBoard()[6] && gameBoard.getBoard()[2] != null)
        ){
            if(round % 2 == 0){
                alert(`${player1.playerName} won!`)
                gameBoard.resetBoard();
                resetBoardMarkers();
            };
            if (round % 2 != 0){
                alert(`${player2.playerName} won!`)
                gameBoard.resetBoard();
                resetBoardMarkers();
            }
        }
        else{
            return false;
        }
        }


    


    const playRound = () => {

        let gridCells = Array.from(document.querySelectorAll(".tic-tac-toe-cell"))

        round = 0;

        for (let i = 0; i < gridCells.length; i++){
            gridCells[i].removeEventListener("click", gameBoard.notStarted);
            gridCells[i].addEventListener("click", () => { {
                if(gameBoard.getBoard()[i] != null){
                    alert('This position has already been chosen, choose another one.');
                }
                else if(round % 2 == 0){
                    gameBoard.updateBoard(i, player1);
                    gridCells[i].textContent = player1.playerMarker;
                    checkWin();
                    checkDraw();
                    round++
                }
                else{
                    gameBoard.updateBoard(i, player2)
                    gridCells[i].textContent = player2.playerMarker;
                    checkWin();
                    checkDraw();
                    round++
                }
                console.log(gameBoard.getBoard());
            } 
        });
        }

        
    }
        return {playRound, checkWin, checkDraw, resetBoardMarkers}

    }



handleDom.startGameButton();
gameBoard.initializeCells();

