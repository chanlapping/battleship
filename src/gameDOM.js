

export function displayBoard(board, container, mode) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const content = board.get(x, y);
            if (content == 'm') {
                container.innerHTML += `<div class="square missed"></div>`;
            } else if (content == 'x') {
                container.innerHTML += `<div class="square hit"></div>`;
            } else if (mode == 'player' && content != 'e') {
                container.innerHTML += `<div class="square ship"></div>`;
            } else {
                container.innerHTML += `<div class="square"></div>`;
            }
            
        }
    }
}