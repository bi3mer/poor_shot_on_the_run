this.noise = new ROT.Noise.Simplex();

const GameMap = {};

const constructColor = (r, g, b) => {
    return "rgb(" + r + "," + g + "," + b + ")";
};

GameMap.getPointType = (x, y) => {
    const value = noise.get(config.map.frequency * x, config.map.frequency * y);

    if( value <= config.map.waterThreshold) {
        return config.map.type.water;
    } else {
        return config.map.type.ground;
    }
};

GameMap.drawPointMapPoint = (x, y, pointCharacter, pointType, display) => {
    let color = "rgb(0,0,0)";
    if(pointType === config.map.type.water) {
        color = constructColor(config.map.water.color.r, config.map.water.color.g, config.map.water.color.b);
    } else if(pointType === config.map.type.ground) {
        color = constructColor(config.map.ground.color.r, config.map.ground.color.g, config.map.ground.color.b);
    } else {
        console.error('Unspported map type', pointType);
        color = constructColor(0, 255, 0);
    }

    display.draw(x, y, pointCharacter, "", color);
};