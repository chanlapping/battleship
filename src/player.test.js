import playerFactory from './playerFactory';
import gameBoardFactory from './gameBoardFactory';

describe('Player', () => {
    let player;
    let opponentBoard;

    beforeEach(() => {
        player = playerFactory();
        opponentBoard = gameBoardFactory();
    });

    test('player can attack specific position on opponent board', () => {
        player.attack(opponentBoard, 0, 0);
        expect(opponentBoard.get(0, 0)).toBe('m');
    });

    test('randomPlay() attacks a square on opponent board', () => {
        const receiveAttackMock = jest.spyOn(opponentBoard, 'receiveAttack');
        player.makeRandomPlay(opponentBoard);
        expect(receiveAttackMock).toHaveBeenCalledTimes(1);

        const x = receiveAttackMock.mock.calls[0][0];
        const y = receiveAttackMock.mock.calls[0][1];
        const validCoor = x >= 0 && x < 10 && y >= 0 && y < 10;
        expect(validCoor).toBe(true);
    });

    test('randomPlay() will not attack the same square twice', () => {
        const receiveAttackMock = jest.spyOn(opponentBoard, 'receiveAttack');
        player.makeRandomPlay(opponentBoard);
        player.makeRandomPlay(opponentBoard);
        const repeatedAttack = (receiveAttackMock.mock.calls[0][0] == receiveAttackMock.mock.calls[1][0]) && (receiveAttackMock.mock.calls[0][1] == receiveAttackMock.mock.calls[1][1]);
        expect(repeatedAttack).toBe(false);
    });
});