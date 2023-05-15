import * as game from "./game";
import playerFactory from "./playerFactory";
import gameBoardFactory from "./gameBoardFactory";



describe('game', () => {
    game.newGame();
    const player = playerFactory();

    test('new game should create 2 players', () => {
        expect(JSON.stringify(game.player)).toBe(JSON.stringify(player));
        expect(JSON.stringify(game.computer)).toBe(JSON.stringify(player));
    });

    const gameBoard = gameBoardFactory();

    test('new game should create 2 gameBoards', () => {
        expect(JSON.stringify(game.playerBoard)).toBe(JSON.stringify(gameBoard));
        expect(JSON.stringify(game.computerBoard)).toBe(JSON.stringify(gameBoard));
    });

    
});