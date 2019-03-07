const Game = {};
Game.map = [];
Game.player = undefined;
Game.entities = [];
Game.trails = {};
Game.riverCount = Utility.range(config.map.minRiverCount, config.map.maxRiverCount);
Game.directions = [North(), East(), South(), West()]
Game.riversGenerated = 0;

Game.generationInterval = undefined;
Game.carvingInterval = undefined;

Game.startX = undefined; 
Game.startY = undefined;
Game.endX = undefined;
Game.endY = undefined;

Game.villages = [];

const constructColor = (r, g, b) => {
    return "rgb(" + r + "," + g + "," + b + ")";
};

const carve = (type) => {
    Game.carvingInterval = setInterval(() => {
        const maxIterations = 200;
        let iterationCount = 0;

        while(Game.startX != Game.endX && Game.startY != Game.endY) {
            let lowestCost = Utility.manhattanDistance(Game.startX + Game.directions[0].east, Game.startY + Game.directions[0].north, Game.endX, Game.endY);
            let bestIndex = 0;

            // find best cardinal direction
            for(let j = 1; j < Game.directions.length; ++j) {
                let newCost = Utility.manhattanDistance(Game.startX + Game.directions[j].east, Game.startY + Game.directions[j].north, Game.endX, Game.endY);

                if(newCost < lowestCost) {
                    bestIndex = j;
                    lowestCost = newCost;
                }
            }
            
            // fill in map position
            Game.startX += Game.directions[bestIndex].east;
            Game.startY += Game.directions[bestIndex].north;
            Game.map[Game.startY][Game.startX] = type;

            iterationCount += 1;
            if(iterationCount >= maxIterations) {
                return;
            }
        }
        
        console.log('ending interval');
        clearInterval(Game.carvingInterval);
        Game.carvingInterval = undefined;
        Game.riversGenerated += 1;
    }, 1)
}

const carveRoadsIntoMap = (w, h, callback) => {
    console.log(Game.villages);
    callback();
};

const buildVillages = (w, h, callback) => {
    const color = config.map.villageGround.color;
    Game.villagesGenerated = 0;
    Game.villageCount = Utility.range(config.map.minVillageCount, config.map.maxVillageCount);

    Game.generationInterval = setInterval(() => {
        console.log(Game.villagesGenerated);
        if(Game.villagesGenerated >= Game.villageCount) {
            console.log('hi world')
            clearInterval(Game.generationInterval);
            Game.generationInterval = null;
            callback();

            return;
        }

        let villageWidth = Utility.range(config.map.minVillageSize, config.map.maxVillageSize);
        let villageHeight = Utility.range(config.map.minVillageSize, config.map.maxVillageSize);

        let x = Utility.range(villageWidth, w - villageWidth - 1);
        let y = Utility.range(villageHeight, h - villageHeight - 1);

        x -= Math.floor(villageWidth / 2);
        y -= Math.floor(villageHeight / 2);

        Game.villages.push([x, y]);

        for(let j = 0; j < villageHeight; ++j) {
            for(let i = 0; i < villageHeight; ++i) {
                Game.map[y + j][x + i] = config.map.type.villageGround;
            }
        }

        ++Game.villagesGenerated;
    }, 1);
};

const carveRiversIntoMap = (w, h, callback) => {
    Game.generationInterval = setInterval(() => {
        // console.log(Game.riversGenerated >= Game.riverCount);
        if(Game.riversGenerated >= Game.riverCount) {
            clearInterval(Game.generationInterval);
            Game.generationInterval = undefined;
            callback();

            return;
        }

        if(Game.carvingInterval !== undefined) {
            // console.log('still running previous interval')
            return;
        }

        if(Math.random() > 0.5) {
            Game.startX = 0;
            Game.startY = Utility.range(0, h - 1);
        } else {
            Game.startX = Utility.range(0, w - 1);
            Game.startY = 0;
        }
        
        if(Math.random() > 0.5) {
            Game.endX = w - 1;
            Game.endY = Utility.range(0, h - 1);
        } else {
            Game.endX = Utility.range(0, w - 1);
            Game.endY = h - 1;
        }
        
        // @todo: fill in initial position with width
        Game.map[Game.startY][Game.startX] = config.map.type.water;

        // console.log('starting interval');
        carve(config.map.type.water)
    }, 1);
};

const initializeGameMapWithGround = (w, h) => {
    for(let y = 0; y < h; ++y) {
        Game.map.push([])

        for(let x = 0; x < w; ++x) {
            Game.map[y].push(config.map.type.ground);
        }
    }
}

Game.generateMap = () => {
    const w = config.map.width;
    const h = config.map.height;

    initializeGameMapWithGround(w, h);
    carveRiversIntoMap(w, h, () => {
        buildVillages(w, h, () => {
            carveRoadsIntoMap(w, h, () => {
                console.log("map generation finished")
            });
        });
    });
};

Game.drawPointMapPoint = (x, y, ascii, asciiColor, pointType, display) => {
    // @todo: draw map color and the player color instead of just map
    let color = null;
    if(pointType === config.map.type.water) {
        color = config.map.water.color;
    } else if(pointType === config.map.type.ground) {
        color = config.map.ground.color;
    } else if(pointType === config.map.type.villageGround) {
        color = config.map.ground.villageGround;
    } else {
        console.error('Unspported map type', pointType);
        color = "#00FF00";
    }

    if(asciiColor === null || asciiColor === undefined) {
        asciiColor = "";
    }

    display.draw(x, y, ascii, asciiColor, color);
};

Game.addEntity = (entity) => {
    entities.push(entity);
};

/**
 * This should only be called once at the start of the game. Aftewards, the entities 
 * handle drawing themselves and cleaning up their past self by calling 
 * Game.drawPointMapPoint without a character and with a chracter if they want to 
 * draw themselves in the game
 */
Game.drawMap = (display, w, h) => {
    for(let x = 0; x < w; ++x) {
        for(let y = 0; y < h; ++y) {
            Game.drawPointMapPoint(x, y, '', null, Game.map[y][x], display);
        }
    }
};

Game.generateMap();