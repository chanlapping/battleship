import gameBoardFactory from "./gameBoardFactory";



test('places ship on correct position', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('patrol', 'h', 0, 0); // h: horizontal, v: vertical
    expect(gameBoard.content[0][0]).toBe(1);
    expect(gameBoard.content[1][0]).toBe(1);
});

test('places ship with correct direction', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('patrol', 'v', 0, 0);
    expect(gameBoard.content[0][0]).toBe(1);
    expect(gameBoard.content[0][1]).toBe(1);
});

test('cannot place ship if there is not enough space', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('carrier', 'h', 6, 0);
    expect(gameBoard.content[6][0]).toBe(0);
    expect(gameBoard.content[7][0]).toBe(0);
    expect(gameBoard.content[8][0]).toBe(0);
    expect(gameBoard.content[9][0]).toBe(0);
});

test('cannot place ship if there is not enough space, vertical', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('carrier', 'v', 0, 6);
    expect(gameBoard.content[0][6]).toBe(0);
    expect(gameBoard.content[0][7]).toBe(0);
    expect(gameBoard.content[0][8]).toBe(0);
    expect(gameBoard.content[0][9]).toBe(0);
});

test('cannot place ship if overlaps with another ship', () => {
    const gameBoard = gameBoardFactory();
    gameBoard.placeShip('destroyer', 'h', 2, 2);
    gameBoard.placeShip('destroyer', 'v', 3, 2);
    expect(gameBoard.content[3][3]).toBe(0);
    expect(gameBoard.content[3][4]).toBe(0);
});