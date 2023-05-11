import gameBoardFactory from "./gameBoardFactory";

export default function playerFactory() {

    const attack = (board, x, y) => {
        board.receiveAttack(x, y);
    };

    const makeRandomPlay = (board) => {
        let pos;
        do {
            pos = getRandomPos();
        } while (board.get(pos[0], pos[1]) == 'x' || board.get(pos[0], pos[1]) == 'm');
        attack(board, pos[0], pos[1]);
    };

    const getRandomPos = () => {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        
        return [x, y];
    }

    return {attack, makeRandomPlay, getRandomPos};

}