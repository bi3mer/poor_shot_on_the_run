let Entity = class {
    constructor(x, y, configEntity) {
        this.x = x;
        this.y = y;
        this.type = configEntity.type;
        this.asciiChar = configEntity.ascii;
        this.color = configEntity.color;
    };

    move(direction) {
        this.x += direction.north;
        this.y += direction.east;
    };
}