const PATROL = "P";
const SUBMARINE = "S";
const DESTROYER = "D";
const BATTLESHIP = "B";
const CARRIER = "C";

const shipLengths = {
    P: 2,
    S: 3,
    D: 3,
    B: 4,
    C: 5,
};

function create(type) {
    let numberOfHits = 0;
    const length = shipLengths[type];
    
    const getLength = () => length;

    const getNumberOfHits = () => numberOfHits;

    const isSunk = () => {
        return numberOfHits === length;
    };

    const hit = () => {
        numberOfHits++;
    };

    return {getLength, getNumberOfHits, isSunk, hit};
}

export {
    PATROL,
    SUBMARINE,
    DESTROYER,
    BATTLESHIP,
    CARRIER,
    create
};