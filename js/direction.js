let Direction = class {
    constructor(north, east) {
        this.north = north;
        this.east = east;
    }
};

const North = () => new Direction(0, 1);
const East = () => new Direction(1, 0);
const South = () => new Direction(0, -1);
const West = () => new Direction(-1, 0);