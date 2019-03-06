const Game = {};
Game.map = [];
Game.player = undefined;
Game.entities = [];
Game.trails = {};
Game.riverCount = Utility.range(config.map.minRiverCount, config.map.maxRiverCount);
Game.directions = [North(), East(), South(), West()]
Game.riversGenerated = 0;
Game.riverGenerationInterval = undefined;
Game.riverCarvingInterval = undefined;

Game.startX = undefined; 
Game.startY = undefined;
Game.endX = undefined;
Game.endY = undefined;

const constructColor = (r, g, b) => {
    return "rgb(" + r + "," + g + "," + b + ")";
};

const carveVillagesAndRoadsIntoMap = (w, h) => {
    console.log('hi')
};

const carveRiversIntoMap = (w, h) => {
    Game.riverGenerationInterval = setInterval(() => {
        // console.log(Game.riversGenerated >= Game.riverCount);
        if(Game.riversGenerated >= Game.riverCount) {
            clearInterval(Game.riverGenerationInterval);
            Game.riverGenerationInterval = undefined;
            carveVillagesAndRoadsIntoMap(w, h);
            return;
        }

        if(Game.riverCarvingInterval !== undefined) {
            // console.log('still running previous interval')
            return;
        }

        // const min = config.map.minRiverWidth;
        // const max = config.map.maxRiverWidth;

        // @todo: use this
        // const riverWidth = Utility.range(min, max)

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
        Game.riverCarvingInterval = setInterval(() => {
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
                // console.log(Game.startX, Game.startY);
                if(Game.map[Game.startY] === undefined) {
                    console.error(Game.startY);
                }
                if(Game.map[Game.startY] === undefined) {
                    console.log(Game.startX);
                    console.log(Game.map[Game.startY])
                }
                Game.map[Game.startY][Game.startX] = config.map.type.water;

                iterationCount += 1;
                if(iterationCount >= maxIterations) {
                    return;
                }
            }
            
            console.log('ending interval');
            clearInterval(Game.riverCarvingInterval);
            Game.riverCarvingInterval = undefined;
            Game.riversGenerated += 1;
        }, 1)
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
    carveRiversIntoMap(w, h);
};

Game.drawPointMapPoint = (x, y, pointCharacter, pointType, display) => {
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

Game.addEntity = (entity) => {
    entities.push(entity);
};

Game.drawMap = (display, w, h) => {
    // update these values based on the players position so they are the center of the screen
    for(let x = 0; x < w; ++x) {
        for(let y = 0; y < h; ++y) {
            // @todo: need  a smart way to handle this part
            Game.drawPointMapPoint(x, y, '', Game.map[y][x], display);
        }
    }
};

Game.generateMap();