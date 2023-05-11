import playerFactory from './playerFactory';
import gameBoardFactory from './gameBoardFactory';

let player;
let opponentBoard;

beforeEach(() => {
    player = playerFactory();
    opponentBoard = gameBoardFactory();
});

test("should call opponent's gameBoard receiveAttack method", () => {
    jest.spyOn(opponentBoard, 'receiveAttack');
    player.attack(opponentBoard, 0, 0);
    expect(opponentBoard.receiveAttack).toHaveBeenCalledWith(0, 0);
});

test('should attack a square with makeRandomPlay', () => {
    jest.spyOn(opponentBoard, 'receiveAttack');
    player.makeRandomPlay(opponentBoard);
    expect(opponentBoard.receiveAttack.mock.calls.length).toBe(1);
});

test('random play should not attack a square that is marked missed', () => {
    jest.spyOn(opponentBoard, 'receiveAttack');
    const randMock = jest.spyOn(player, 'getRandomPos');
    randMock.mockReturnValueOnce([0, 0]).mockReturnValueOnce([1, 1]);
    opponentBoard.receiveAttack(0, 0);
    player.makeRandomPlay(opponentBoard);
    
    expect(opponentBoard.get(1 ,1)).toBe('m');
});