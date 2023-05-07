export default function shipFactory(type) {
    let numberOfHits = 0;
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

    const getLength = () => length;

    const getNumberOfHits = () => numberOfHits;

    const isSunk = () => {
        return numberOfHits == length;
    };

    const hit = () => {
        numberOfHits++;
    };

    return {getLength, getNumberOfHits, isSunk, hit};
}