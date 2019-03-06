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
        frequency: 0.8,
        waterThreshold: 0.05,
        type: {
            water: 0,
            ground: 1,
            villageGround: 2,
            road: 3,
            villageRoad: 4
        },
        water: {
            char: '',
            color: {
                r: 0,
                g: 119,
                b: 190
            }
        },
        ground: {
            char: '',
            color: {
                r: 237, 
                g: 201, 
                b: 175
            }
        }
    }
};