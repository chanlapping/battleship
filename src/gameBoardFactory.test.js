import { experiments } from "webpack";
import gameBoardFactory from "./gameBoardFactory";



test('places ship on correct position', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('patrol', 'h', 0, 0); // h: horizontal, v: vertical
    expect(gameBoard.get(0, 0)).toBe(0);
    expect(gameBoard.get(1, 0)).toBe(0);
});

test('places ship with correct direction', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('patrol', 'v', 0, 0);
    expect(gameBoard.get(0, 0)).toBe(0);
    expect(gameBoard.get(0, 1)).toBe(0);
});

test('places correct ship number on position', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('patrol', 'h', 0, 0);
    gameBoard.placeShip('carrier', 'v', 2, 2);
    expect(gameBoard.get(0, 0)).toBe(0);
    expect(gameBoard.get(1, 0)).toBe(0);
    expect(gameBoard.get(2, 2)).toBe(1);
    expect(gameBoard.get(2, 3)).toBe(1);
    expect(gameBoard.get(2, 4)).toBe(1);
    expect(gameBoard.get(2, 5)).toBe(1);
    expect(gameBoard.get(2, 6)).toBe(1);
});

test('cannot place ship if there is not enough space', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('carrier', 'h', 6, 0);
    expect(gameBoard.get(6, 0)).toBe('e');
    expect(gameBoard.get(7, 0)).toBe('e');
    expect(gameBoard.get(8, 0)).toBe('e');
    expect(gameBoard.get(9, 0)).toBe('e');
});

test('cannot place ship if there is not enough space, vertical', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('carrier', 'v', 0, 6);
    expect(gameBoard.get(0, 6)).toBe('e');
    expect(gameBoard.get(0, 7)).toBe('e');
    expect(gameBoard.get(0, 8)).toBe('e');
    expect(gameBoard.get(0, 9)).toBe('e');
});

test('cannot place ship if overlaps with another ship', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('destroyer', 'h', 2, 2);
    gameBoard.placeShip('destroyer', 'v', 3, 2);
    expect(gameBoard.get(3, 2)).toBe(0);
    expect(gameBoard.get(3, 3)).toBe('e');
    expect(gameBoard.get(3, 4)).toBe('e');
});

test('records a miss if the square is empty', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.get(0, 0)).toBe('m');
});

test('if hit, calls the correct ship hit method', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('patrol', 'h', 0, 0);
    gameBoard.receiveAttack(1, 0);
    expect(gameBoard.get(1, 0)).toBe('x');
    expect(gameBoard.getShip(0).getNumberOfHits()).toBe(1);
});

test('reports all ships are sunk', () => {
    const gameBoard  = gameBoardFactory();
    gameBoard.placeShip('patrol', 'h', 0, 0);
    gameBoard.placeShip('destroyer', 'h', 1, 1);
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);
    gameBoard.receiveAttack(1, 1);
    gameBoard.receiveAttack(2, 1);
    gameBoard.receiveAttack(3, 1);
    expect(gameBoard.allSunk()).toBe(true);
});

test('if not all sunk, reports false', () => {
    const gameBoard  = gameBoardFactory();
    gameBoard.placeShip('patrol', 'h', 0, 0);
    gameBoard.placeShip('destroyer', 'h', 1, 1);
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);
    gameBoard.receiveAttack(1, 1);
    gameBoard.receiveAttack(2, 1);
    expect(gameBoard.allSunk()).toBe(false);
});