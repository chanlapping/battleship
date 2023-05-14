import gameBoardFactory from "./gameBoardFactory";
import playerFactory from "./playerFactory";
import * as gameDOM from "./gameDOM";
import './style.css';

// create new game

//create game boards
const playerBoard = gameBoardFactory();
const computerBoard = gameBoardFactory();

//create players
const player = playerFactory();
const computer = playerFactory();

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

const playerBoardDisplay = document.querySelector('#player-board');
const computerBoardDisplay = document.querySelector('#computer-board');
gameDOM.displayBoard(playerBoard, playerBoardDisplay, 'player');
gameDOM.displayBoard(computerBoard, computerBoardDisplay, 'computer');