import { experiments } from "webpack";
import gameBoardFactory from "./gameBoardFactory";
import shipFactory from "./shipFactory";

describe('gameBoard', () => {
    let gameBoard;
    beforeEach(() => gameBoard = gameBoardFactory());

    test('places ship on correct position', () => {
        gameBoard.placeShip('patrol', 'h', 0, 0);
        expect(gameBoard.get(0, 0)).toBe(0);
        expect(gameBoard.get(1, 0)).toBe(0);
        gameBoard.placeShip('submarine', 'v', 1, 1);
        expect(gameBoard.get(1, 1)).toBe(1);
        expect(gameBoard.get(1, 2)).toBe(1);
        expect(gameBoard.get(1, 3)).toBe(1);
    });

    test('placeShip create correct type of ship', () => {
        gameBoard.placeShip('submarine', 'v', 1, 1);
        expect(gameBoard.getShip(0).getLength()).toBe(3);
    });

    test('places correct ship number on position', () => {
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
        gameBoard.placeShip('carrier', 'h', 6, 0);
        expect(gameBoard.get(6, 0)).toBe('e');
        expect(gameBoard.get(7, 0)).toBe('e');
        expect(gameBoard.get(8, 0)).toBe('e');
        expect(gameBoard.get(9, 0)).toBe('e');

        gameBoard.placeShip('carrier', 'v', 0, 6);
        expect(gameBoard.get(0, 6)).toBe('e');
        expect(gameBoard.get(0, 7)).toBe('e');
        expect(gameBoard.get(0, 8)).toBe('e');
        expect(gameBoard.get(0, 9)).toBe('e');
    });

    test('cannot place ship if overlaps with another ship', () => {
        gameBoard.placeShip('destroyer', 'h', 2, 2);
        gameBoard.placeShip('destroyer', 'v', 3, 2);
        expect(gameBoard.get(3, 2)).toBe(0);
        expect(gameBoard.get(3, 3)).toBe('e');
        expect(gameBoard.get(3, 4)).toBe('e');
    });

    test('records a miss if the square is empty', () => {
        gameBoard.receiveAttack(0, 0);
        expect(gameBoard.get(0, 0)).toBe('m');
    });

    test('if hit, records a hit on the correct position on board', () => {
        gameBoard.placeShip('patrol', 'h', 0, 0);
        gameBoard.receiveAttack(0, 0);
        expect(gameBoard.get(0, 0)).toBe('x');
    });

    test('if hit, calls the hit method of the correct ship', () => {
        gameBoard.placeShip('patrol', 'h', 0, 0);
        gameBoard.placeShip('patrol', 'v', 3, 3);
        gameBoard.receiveAttack(0, 0);
        expect(gameBoard.getShip(0).getNumberOfHits()).toBe(1);
        expect(gameBoard.getShip(1).getNumberOfHits()).toBe(0);
    });

    test('allSunk() returns true if all ships are sunk', () => {
        gameBoard.placeShip('patrol', 'h', 0, 0);
        gameBoard.placeShip('patrol', 'v', 3, 3);
        gameBoard.receiveAttack(0, 0);
        gameBoard.receiveAttack(1, 0);
        gameBoard.receiveAttack(3, 3);
        gameBoard.receiveAttack(3, 4);
        expect(gameBoard.allSunk()).toBe(true);
    });

    test('allSunk() returns false if not all ship are sunk', () => {
        gameBoard.placeShip('patrol', 'h', 0, 0);
        gameBoard.placeShip('patrol', 'v', 3, 3);
        gameBoard.receiveAttack(0, 0);
        gameBoard.receiveAttack(1, 0);
        gameBoard.receiveAttack(3, 3);
        expect(gameBoard.allSunk()).toBe(false);
    });
});
