import { experiments } from "webpack";
import * as gameBoardFactory from "./gameBoardFactory";
import * as shipFactory from "./shipFactory";

describe('gameBoard', () => {
    let gameBoard;
    beforeEach(() => gameBoard = gameBoardFactory.create());

    test('places ship on correct position', () => {
        gameBoard.placeHorizontalShip(shipFactory.PATROL, 0, 0);
        expect(gameBoard.get(0, 0)).not.toBe(gameBoardFactory.EMPTY);
        expect(gameBoard.get(1, 0)).not.toBe(gameBoardFactory.EMPTY);

        gameBoard.placeVerticalShip(shipFactory.SUBMARINE, 1, 1);
        expect(gameBoard.get(1, 1)).not.toBe(gameBoardFactory.EMPTY);
        expect(gameBoard.get(1, 2)).not.toBe(gameBoardFactory.EMPTY);
        expect(gameBoard.get(1, 3)).not.toBe(gameBoardFactory.EMPTY);
    });

    test('cannot place ship if there is not enough space', () => {
        gameBoard.placeHorizontalShip(shipFactory.CARRIER, 6, 0);
        expect(gameBoard.get(6, 0)).toBe(gameBoardFactory.EMPTY);
        expect(gameBoard.get(7, 0)).toBe(gameBoardFactory.EMPTY);
        expect(gameBoard.get(8, 0)).toBe(gameBoardFactory.EMPTY);
        expect(gameBoard.get(9, 0)).toBe(gameBoardFactory.EMPTY);

        gameBoard.placeVerticalShip(shipFactory.CARRIER, 0, 6);
        expect(gameBoard.get(0, 6)).toBe(gameBoardFactory.EMPTY);
        expect(gameBoard.get(0, 7)).toBe(gameBoardFactory.EMPTY);
        expect(gameBoard.get(0, 8)).toBe(gameBoardFactory.EMPTY);
        expect(gameBoard.get(0, 9)).toBe(gameBoardFactory.EMPTY);
    });

    test('cannot place ship if overlaps with another ship', () => {
        gameBoard.placeHorizontalShip(shipFactory.DESTROYER, 2, 2);
        gameBoard.placeVerticalShip(shipFactory.SUBMARINE, 3, 2);
        expect(gameBoard.get(3, 2)).not.toBe(gameBoardFactory.EMPTY);
        expect(gameBoard.get(3, 3)).toBe(gameBoardFactory.EMPTY);
        expect(gameBoard.get(3, 4)).toBe(gameBoardFactory.EMPTY);
    });

    test('records a miss if the square is empty', () => {
        gameBoard.receiveAttack(0, 0);
        expect(gameBoard.get(0, 0)).toBe(gameBoardFactory.MISSED);
    });

    test('if hit, records a hit on the correct position on board', () => {
        gameBoard.placeHorizontalShip(shipFactory.PATROL, 0, 0);
        gameBoard.receiveAttack(0, 0);
        expect(gameBoard.get(0, 0)).toBe(gameBoardFactory.HIT);
    });

    test('if hit, calls the hit method of the correct ship', () => {
        gameBoard.placeHorizontalShip(shipFactory.PATROL, 0, 0);
        const shipID = gameBoard.get(0, 0);
        gameBoard.receiveAttack(0, 0);
        expect(gameBoard.getShip(shipID).getNumberOfHits()).toBe(1);
    });

    test('allSunk() returns true if all ships are sunk', () => {
        gameBoard.placeHorizontalShip(shipFactory.PATROL, 0, 0);
        gameBoard.placeVerticalShip(shipFactory.PATROL, 3, 3);
        gameBoard.receiveAttack(0, 0);
        gameBoard.receiveAttack(1, 0);
        gameBoard.receiveAttack(3, 3);
        gameBoard.receiveAttack(3, 4);
        expect(gameBoard.allSunk()).toBe(true);
    });

    test('allSunk() returns false if not all ship are sunk', () => {
        gameBoard.placeHorizontalShip(shipFactory.PATROL, 0, 0);
        gameBoard.placeVerticalShip(shipFactory.PATROL, 3, 3);
        gameBoard.receiveAttack(0, 0);
        gameBoard.receiveAttack(1, 0);
        gameBoard.receiveAttack(3, 3);
        expect(gameBoard.allSunk()).toBe(false);
    });
});
