import { experiments } from "webpack";
import { shipFactory, PATROL, SUBMARINE, DESTROYER, BATTLESHIP, CARRIER, PATROL_LENGTH, SUBMARINE_LENGTH, DESTROYER_LENGTH, BATTLESHIP_LENGTH, CARRIER_LENGTH } from "./shipFactory";

describe('shipFactory', () => {

    const patrol = shipFactory(PATROL_LENGTH);
    const submarine = shipFactory(SUBMARINE_LENGTH);
    const destroyer = shipFactory(DESTROYER_LENGTH);
    const battleship = shipFactory(BATTLESHIP_LENGTH);
    const carrier = shipFactory(CARRIER_LENGTH);

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





