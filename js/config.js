const config = {
    debug: true,
    displayTimeOut: 10000,
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
    }
};