'use strict';

this.width = 100;
this.height = 100;

const buildScreenOptions = () => {
  return {
      width: 1,
      height: 1,
      spacing: 1.1,
      fontSize: 18,
      fontFamily: "metrickal, monospace"
  };
};

// https://github.com/ondras/sleeping-beauty/blob/master/app.js#L2661
const fitDisplay = () => {
  let node = display.getContainer();
  let parent = node.parentNode;

  let size = display.computeSize(parent.offsetWidth, parent.offsetHeight);
  size[0] += size[0] % 2 ? 2 : 1;
  size[1] += size[1] % 2 ? 2 : 1;
  let options = buildScreenOptions();
  options.width = size[0] - 2;
  options.height = size[1] - 2;
  display.setOptions(options);

  this.width = options.width;
  this.height = options.height;
};

if(config.debug) {
  ROT.RNG.setSeed(0);
} else  {
  ROT.RNG.setSeed(Date.now());
}

let display = new ROT.Display(buildScreenOptions());
document.body.appendChild(display.getContainer());

// auto fit the display after small time for loading etc.
setTimeout(() => {
  fitDisplay(display);
}, config.initialDisplayTimeout);

// auto fit the display throughout the game
setInterval(() => {
  fitDisplay(display);
}, config.displayTimeOut);

let entities = [];
let player = new Entity(10, 10, config.entities.player);

const initializeGame = () => {

};

const drawGame = () => {
  // draw environment
  // draw enemies
};

const handlePlayerInput = (e) => {
  // clear player at current location
  display.draw(player.x, player.y, '');

  // get input for update
  let move = undefined;
  if(e.key === 'a' || e.key === 'ArrowLeft') {
    move = West();
  } else if(e.key === 's' || e.key === 'ArrowDown') {
    move = North();
  } else if(e.key === 'd' || e.key === 'ArrowRight') {
    move = East();
  } else if(e.key === 'w' || e.key === 'ArrowUp') {
    move = South();
  }

  if(move !== undefined) {
    // @todo: check if location is valid via collision checks etc.
    player.move(move);
  }

  display.draw(player.x, player.y, player.asciiChar, player.color);  
};

const menuState = () => {
  console.log('entered menu state');

  this.runningInterval = setInterval(() => {
    display.clear();
    Menu.draw(display, this.width, this.height);
  }, config.displayTimeOut);

  this.runningEventListener = (e) => {
    Menu.handleInput(e, () => {
      updateState(config.states.preGame); 
    });
  };

  window.addEventListener('keydown', this.runningEventListener);
};

const preGameState = () => {
  console.log('pre game state entered');

  this.runningInterval = setInterval(() => {
    display.clear();
    Instructions.draw(display);
  }, config.displayTimeOut);
  
  this.runningEventListener = (e) => {
    Instructions.handleInput(e, () => {
      updateState(config.states.game);
    });
  };

  window.addEventListener('keydown', this.runningEventListener, true);
};

const gameState = () => {
  console.log('game state entered');
  clearInterval(this.runningInterval);
  window.removeEventListener('keydown', this.runningEventListener, true);
  display.clear();


  for(let x = 0; x < 10; ++x) {
    for( let y = 0; y < 10; ++y) {
      GameMap.drawPointMapPoint(x, y, '', config.map.type.water, display);
    }
  }
  
  // this is a turn based game and the handle player input is our loop
  // and will handle everything
  setTimeout(() => {
    display.draw(player.x, player.y, player.asciiChar, player.color);
    window.addEventListener('keydown', handlePlayerInput, true);
  }, config.initialDisplayTimeout);
}

const postGameState = () => {
  // rather than deal with resetting everything, just reload the page
  document.location.reload(true)
};

const updateState = (state) => {
  if(state === config.states.menu) {
    menuState();
  } else if(state === config.states.preGame) {
    preGameState();
  } else if(state === config.states.game) {
    gameState();
  } else if(state === config.states.postGame) {
    postGameState();
  } else {
    console.error('undefined state, going to post game state', state);
    postGameState();
  }
};

updateState(config.states.menu);