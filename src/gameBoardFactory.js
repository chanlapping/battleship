import * as shipFactory from "./shipFactory";

export const BOARD_SIZE = 10;
export const EMPTY = "e";
export const HIT = "x";
export const MISSED = "m";

export const HORIZONTAL = "h";
export const VERTICAL = "v";

export function create() {
    const content = [];
    const ships = {};
    let shipID = 0;
    
    for (let i = 0; i < BOARD_SIZE; i++) {
        const row = new Array(BOARD_SIZE);
        row.fill(EMPTY);
        content.push(row);
    }

    // ships[shipFactory.PATROL] = shipFactory.create(shipFactory.PATROL);
    // ships[shipFactory.SUBMARINE] = shipFactory.create(shipFactory.SUBMARINE);
    // ships[shipFactory.DESTROYER] = shipFactory.create(shipFactory.DESTROYER);
    // ships[shipFactory.BATTLESHIP] = shipFactory.create(shipFactory.BATTLESHIP);
    // ships[shipFactory.CARRIER] = shipFactory.create(shipFactory.CARRIER);

    const getShipID = () => {
        return shipID++;
    }

    const placeHorizontalShip = (type, x, y) => {
        const ship = shipFactory.create(type);

        if (hasEnoughHorizontalSpace(ship, x, y)) {
            const id = getShipID();
            ships[id] = ship;
            for (let i = 0; i < ship.getLength(); i++) {
                content[x + i][y] = id;
            }
        } 
    }

    const hasEnoughHorizontalSpace = (ship, x, y) => {
        if (x + ship.getLength() > BOARD_SIZE) {
            return false;
        }
        for (let i = 0; i < ship.getLength(); i++) {
            if (content[x + i][y] != EMPTY) {
                return false;
            }
        }
        return true;
    }

    const placeVerticalShip = (type, x, y) => {
        const ship = shipFactory.create(type);

        if (hasEnoughVerticalSpace(ship, x, y)) {
            const id = getShipID();
            ships[id] = ship;
            for (let i = 0; i < ship.getLength(); i++) {
                content[x][y + i] = id;
            }
        }
    }

    const hasEnoughVerticalSpace = (ship, x, y) => {
        if (y + ship.getLength() > BOARD_SIZE) {
            return false;
        }
        for (let i = 0; i < ship.getLength(); i++) {
            if (content[x][y + i] != EMPTY) {
                return false;
            }
        }
        return true;
    }

    const get = (x, y) => content[x][y];

    const getShip = (id) => ships[id];

    const receiveAttack = (x, y) => {
        if (content[x][y] == EMPTY) {
            content[x][y] = MISSED;
            return;
        }

        if (content[x][y] == MISSED || content[x][y] == HIT) {
            return;
        }
        
        const ship = ships[content[x][y]];
        content[x][y] = HIT;
        ship.hit();
    }

    const allSunk = () => {
        for (const id in ships) {
            if (!ships[id].isSunk()) {
                return false;
            }
        }
        return true;
    }

    return { get, getShip, placeHorizontalShip, placeVerticalShip, receiveAttack, allSunk };
}