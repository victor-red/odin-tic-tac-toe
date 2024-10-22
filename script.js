const gameBoard = (function (){
    let boardArray = Array(9).fill(null);

    const updateBoard = (position, player) => boardArray[position] = player.playerMarker;
    const getBoard = () => boardArray;

    return {updateBoard, getBoard};
})();

function createPlayer(name, marker){
    const playerName = name;
    const playerMarker = marker;

    return {playerName, playerMarker};

}

function game(player1, player2){
    let end = false;
    let round = 0;

    const checkDraw = () => {
        let count = 0;
        for ( let l = 0; l < gameBoard.getBoard().length; l++){
            if (gameBoard.getBoard()[l] != null){
                count++
            }
        }
        if (count == gameBoard.getBoard().length){
            return true;
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
            return true;
        }
        else{
            return false;
        }
        }



    const playRound = () => {
        while (!end){
            let position = prompt("Enter the position");
            position = position - 1;
            if (position < 0 || position > 8 || gameBoard.getBoard()[position] != null){
                alert("Invalid position, try again.")
                continue;
            }
            if (round % 2 == 0){
            gameBoard.updateBoard(position, player1);
        }
            else{
                gameBoard.updateBoard(position, player2);
            }
            if (checkWin() && round % 2 == 0)
                {
                    end = true;
                    console.log(`${player1.playerName} wins!`)
                };
            if (checkWin() && round % 2 != 0)
                {
                    end = true;
                    console.log(`${player2.playerName} wins!`)
                };
            if (checkDraw()){
                console.log(`It's a draw!`);
            }
            round++
            console.log(gameBoard.getBoard());
        }

    }
    return {playRound, checkWin, checkDraw}
}




const playerOne = createPlayer("Player1", "X")
const playerTwo = createPlayer("Player2", "O")
const tictactoe = game(playerOne, playerTwo);

tictactoe.playRound();

