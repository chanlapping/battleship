import { experiments } from "webpack";
import * as shipFactory from "./shipFactory";

describe('shipFactory', () => {

    const patrol = shipFactory.create(shipFactory.PATROL);
    const submarine = shipFactory.create(shipFactory.SUBMARINE);
    const destroyer = shipFactory.create(shipFactory.DESTROYER);
    const battleship = shipFactory.create(shipFactory.BATTLESHIP);
    const carrier = shipFactory.create(shipFactory.CARRIER);

    test('new ship has 0 hit', () => {
        expect(submarine.getNumberOfHits()).toBe(0);
    });

    test('new ships have correct lengths', () => {
        expect(patrol.getLength()).toBe(2);
        expect(submarine.getLength()).toBe(3);
        expect(destroyer.getLength()).toBe(3);
        expect(battleship.getLength()).toBe(4);
        expect(carrier.getLength()).toBe(5);
    });

    test('new ship is not sunk', () => {
        expect(patrol.isSunk()).toBe(false);
    });

    test('hit function increases number of hit by 1', () => {
        patrol.hit();
        expect(patrol.getNumberOfHits()).toBe(1);
    });

    test('when hit enough times the ship is sunk', () => {
        submarine.hit();
        submarine.hit();
        submarine.hit();
        expect(submarine.isSunk()).toBe(true);
    });

    test('when hit not enough times the ship is not sunk', () => {
        destroyer.hit();
        expect(destroyer.isSunk()).toBe(false);
    });
});





