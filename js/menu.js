'use strict';

const Menu = {};

Menu.draw = (display, width, height) => {
  let x = (width - (config.title.length / 2)) / 3;
  let y = 0.25 * height
  Utility.displayTextOnLine(x, y, display, config.title, config.menu.titleColor);

  x = (width - (config.title.length / 5)) / 3;
  y = 0.5 * height;
  const text = "Press Enter to Start";
  Utility.displayTextOnLine(x, y, display, text, config.menu.startColor);
};

Menu.handleInput = (e, updateStateCallback) => {
  console.log('menu still alive');
  if(e.key === 'Enter') {
    clearInterval(this.runningInterval);
    window.removeEventListener('keydown', this.runningEventListener)

    updateStateCallback();
  }
};