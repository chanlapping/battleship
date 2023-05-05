import shipFactory from "./shipFactory";

export default function gameBoardFactory() {
    const content = [];
    for (let i = 0; i < 10; i++) {
        const row = new Array(10);
        row.fill(0);
        content.push(row);
    }

    const placeShip = (shipType, direction, x, y) => {
        const ship = shipFactory(shipType);

        if (direction == 'h') {
            for (let i = 0; i < ship.length; i++) {
                content[x + i, y] = 1;
            }
        } else {
            for (let i = 0; i < ship.length; i++) {
                content[x, y + i] = 1;
            }
        }

    }

    return { content, placeShip };
}