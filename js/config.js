const config = {
    debug: true,
    title: 'A Poor Shot on the Run',
    displayTimeOut: 1000,
    initialDisplayTimeout: 1000,
    states: {
        menu: 0,
        preGame: 1,
        game: 2,
        postGame: 3
    },
    entities: {
        player: {
            type: 0,
            ascii: '@',
            color: '#ff0'
        }
    },
    entityTypes: {
        person: 0,
        horse: 1,
        predator: 2,
        prey: 3
    },
    menu: {
        titleColor: "#f64B00",
        startColor: "#FF0000"
    }, 
    map: {
        width: 2000,
        height: 2000,
        minRiverCount: 2,
        maxRiverCount: 5,
        minRiverWidth: 2,
        maxRiverWidth: 4,
        minVillageCount: 5,
        maxVillageCount: 8,
        minVillageSize: 30,
        maxVillageSize: 60,
        type: {
            water: 0,
            ground: 1,
            villageGround: 2,
            road: 3,
            villageRoad: 4
        },
        water: {
            char: '',
            color: "#0077be"
        },
        ground: {
            char: '',
            color: "#8c3b0c"
        },
        villageGround: {
            char: '',
            color: '#9b5801'
        },
    }
};