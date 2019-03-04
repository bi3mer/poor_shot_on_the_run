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
    }
};