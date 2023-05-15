import gameBoardFactory from "./gameBoardFactory";
import playerFactory from "./playerFactory";
import * as game from "./game";
import * as gameDOM from "./gameDOM";
import './style.css';

// create new game

game.newGame();

const playerBoardDisplay = document.querySelector('#player-board');
const computerBoardDisplay = document.querySelector('#computer-board');
gameDOM.displayBoard(game.playerBoard, playerBoardDisplay, 'player');
gameDOM.displayBoard(game.computerBoard, computerBoardDisplay, 'computer');

// game loop

// do {
//     // player attacks
//     // computer attacks
// } while (!playerBoard.allSunk() && !computerBoard.allSunk());