import gameBoardFactory from "./gameBoardFactory";

test('places ship on correct position', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('patrol', 'h', 0, 0); // h: horizontal, v: vertical
    expect(gameBoard.content[0, 0]).toBe(1);
    expect(gameBoard.content[1, 0]).toBe(1);
});

test('places ship with correct direction', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('patrol', 'v', 0, 0);
    expect(gameBoard.content[0, 0]).toBe(1);
    expect(gameBoard.content[0, 1]).toBe(1);
});

