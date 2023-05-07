import shipFactory from "./shipFactory";

test('new ship is not sunk', () => {
    const patrol = shipFactory('patrol');
    expect(patrol.isSunk()).toBe(false);
});

test('when hit enough times the ship is sunk', () => {
    const submarine = shipFactory('submarine');
    submarine.hit();
    submarine.hit();
    submarine.hit();
    expect(submarine.isSunk()).toBe(true);
});

test('when hit not enough times the ship is not sunk', () => {
    const submarine = shipFactory('submarine');
    submarine.hit();
    submarine.hit();
    expect(submarine.isSunk()).toBe(false);
    expect(submarine.getNumberOfHits()).toBe(2);
});