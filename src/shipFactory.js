const PATROL_LENGTH = 2;
const SUBMARINE_LENGTH = 3;
const DESTROYER_LENGTH = 3;
const BATTLESHIP_LENGTH = 4;
const CARRIER_LENGTH = 5;

function shipFactory(length) {
    let numberOfHits = 0;
    
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

export {PATROL_LENGTH, SUBMARINE_LENGTH, DESTROYER_LENGTH, BATTLESHIP_LENGTH, CARRIER_LENGTH, shipFactory};