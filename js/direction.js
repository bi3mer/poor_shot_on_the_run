let Direction = class {
    constructor(north, east) {
        this.north = north;
        this.east = east;
    }
};

const North = () => new Direction(1, 0);
const East = () => new Direction(0, 1);
const South = () => new Direction(-1, 0);
const West = () => new Direction(0, -1);