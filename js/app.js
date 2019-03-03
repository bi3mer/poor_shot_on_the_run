'use strict';

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
}

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
const player = new Entity(0, 0, config.entities.player);

const drawMenu = () => {

};

const initializeGame = () => {
  
};

const drawGame = () => {
  // draw environment
  display.draw(player.x, player.y, player.asciiChar, player.color)
  // draw enemies
};

const handlePlayerInput = () => {
  alert('hi');
};

// this sets off our game loop

window.addEventListener('keydown', handlePlayerInput);