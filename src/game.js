import playerFactory from "./playerFactory";
import gameBoardFactory from "./gameBoardFactory";
import * as gameDOM from "./gameDOM";

export let player;
export let computer;
export let playerBoard;
export let computerBoard;

export let gameInProgress = false;

export function newGame() {
    player = playerFactory();
    computer = playerFactory();
    playerBoard = gameBoardFactory();
    computerBoard = gameBoardFactory();
    gameInProgress = true;

    // populate game boards
    playerBoard.placeShip('patrol', 'h', 5, 4);
    playerBoard.placeShip('submarine', 'h', 0, 7);
    playerBoard.placeShip('destroyer', 'v', 6, 6);
    playerBoard.placeShip('battleship', 'v', 8, 3);
    playerBoard.placeShip('carrier', 'v', 3, 1);

    computerBoard.placeShip('patrol', 'h', 1, 1);
    computerBoard.placeShip('submarine', 'h', 0, 9);
    computerBoard.placeShip('destroyer', 'v', 2, 3);
    computerBoard.placeShip('battleship', 'h', 4, 2);
    computerBoard.placeShip('carrier', 'v', 6, 4);

}

const playerBoardDisplay = document.querySelector('#player-board');

export function playTurn() {
    if (computerBoard.allSunk()) {
        console.log('player wins');
        gameInProgress = false;
        return;
    }
    computer.makeRandomPlay(playerBoard);
    gameDOM.displayBoard(playerBoard, playerBoardDisplay, 'player');
    if (playerBoard.allSunk()) {
        console.log('computer wins');
        gameInProgress = false;
    }
}

// game loop
//   wait for player to make a move
//   check if computer all sunk
//     true -> end game, decalre player wins
//   computer make a move
//   check if player all sunk
//     true -> end game, decalre computer wins