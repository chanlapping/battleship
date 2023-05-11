import gameBoardFactory from "./gameBoardFactory";

export default function playerFactory() {

    const attack = (board, x, y) => {
        board.receiveAttack(x, y);
    };

    const makeRandomPlay = (board) => {
        let x;
        let y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (board.get(x, y) == 'x' || board.get(x, y) == 'm');
        attack(board, x, y);
    };

    return {attack, makeRandomPlay};

}