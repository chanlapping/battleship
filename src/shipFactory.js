function shipFactory(type) {
    let hits = 0;
    let length = 0;
    if (type == 'carrier') {
        length = 5;
    } else if (type == 'battleship') {
        length = 4;
    } else if (type == 'destroyer') {
        length = 3;
    } else if (type == 'submarine') {
        length = 3;
    } else if (type == 'patrol') {
        length = 2;
    }

    const isSunk = () => {
        return hits == length;
    }

    const hit = () => {
        hits++;
    }

    return {isSunk, hit, length};
}

module.exports = shipFactory;