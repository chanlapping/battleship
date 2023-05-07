import shipFactory from "./shipFactory";

export default function gameBoardFactory() {
    const content = [];
    const ships = [];

    for (let i = 0; i < 10; i++) {
        const row = new Array(10);
        row.fill('e');
        content.push(row);
    }

    const placeShip = (shipType, direction, x, y) => {
        const ship = shipFactory(shipType);

        if (direction == 'h') {
            if (x + ship.getLength() > 9) {
                return;
            }
            for (let i = 0; i < ship.getLength(); i++) {
                if (content[x + i][y] != 'e') {
                    return;
                }
            }
            ships.push(ship);
            const shipId = ships.length - 1;
            for (let i = 0; i < ship.getLength(); i++) {
                content[x + i][y] = shipId;
            }
        } else {
            if (y + ship.getLength() > 9) {
                return;
            }
            for (let i = 0; i < ship.getLength(); i++) {
                if (content[x][y + i] != 'e') {
                    return;
                }
            }
            ships.push(ship);
            const shipId = ships.length - 1;
            for (let i = 0; i < ship.getLength(); i++) {
                content[x][y + i] = shipId;
            }
        }
    }

    const get = (x, y) => content[x][y];

    const getShip = (index) => ships[index];

    const receiveAttack = (x, y) => {
        if (content[x][y] == 'e') {
            content[x][y] = 'm';
            return;
        }
        
        const ship = ships[content[x][y]];
        content[x][y] = 'x';
        ship.hit();
    }

    const allSunk = () => {
        return ships.every(ship => ship.isSunk());
    }

    return { get, getShip, placeShip, receiveAttack, allSunk };
}