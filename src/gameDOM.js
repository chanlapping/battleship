import * as game from './game';

export function displayBoard(board, container, mode) {
    

    container.innerHTML = '';
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const content = board.get(x, y);
            const square = document.createElement('div');
            square.classList.add('square');
            if (content == 'm') {
                square.classList.add('missed');
            } else if (content == 'x') {
                square.classList.add('hit');
            } else if (content != 'e') {
                square.classList.add('ship');
            }
            container.appendChild(square);
            if (mode == 'computer') {
                square.addEventListener('click', () => {
                    if (!game.gameInProgress) {
                        return;
                    }
                    if (content == 'x' || content == 'm') {
                        return;
                    }
                    board.receiveAttack(x, y);
                    displayBoard(board, container, mode);
                    game.playTurn();
                });
            }

        }
    }
}