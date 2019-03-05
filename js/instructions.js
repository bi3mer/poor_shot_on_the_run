const Instructions = {};

Instructions.draw = (display) => {
  // kill menu drawing interval
  clearInterval(runningInterval);

  // kill event lsitener for menu
  window.removeEventListener('keydown', runningEventListener);
  
  display.clear();
  
  // display instructions
  let x = (width - (config.title.length / 2)) / 3;
  let y = 0.25 * height
  
  let text = '* W or up arrow to move up';
  Utility.displayTextOnLine(x, y, display, text, config.menu.titleColor);

  y += 1;
  text = '* A or left arrow to move left';
  Utility.displayTextOnLine(x, y, display, text, config.menu.titleColor);
  
  y += 1;
  text = '* S or down arrow to move down';
  Utility.displayTextOnLine(x, y, display, text, config.menu.titleColor);

  y += 1;
  text = '* D or right arrow to move right';
  Utility.displayTextOnLine(x, y, display, text, config.menu.titleColor);

  y += 2;
  text = 'Click on the map for info and potential actions'
  Utility.displayTextOnLine(x, y, display, text, config.menu.titleColor);

  y += 3;
  text = 'You have six bullets. If you get into a duel'
  Utility.displayTextOnLine(x, y, display, text, config.menu.titleColor);

  y += 1;
  text = 'you have a 50% of winning the duel but you '
  Utility.displayTextOnLine(x, y, display, text, config.menu.titleColor);

  y += 1;
  text = 'will have one less bullet and a 5% chance';
  Utility.displayTextOnLine(x, y, display, text, config.menu.titleColor);

  y += 1;
  text = 'increase in your dueling skills.';
  Utility.displayTextOnLine(x, y, display, text, config.menu.titleColor);

  y += 5;
  x += 10;

  text = 'Press enter to start the game partner'
  Utility.displayTextOnLine(x, y, display, text, config.menu.startColor);
};



Instructions.handleInput = (e, updateStateCallback) => {
  console.log('instructions still alive');
  if(e.key === 'Enter') {
    clearInterval(this.runningInterval);
    window.removeEventListener('keydown', this.runningEventListener)

    updateStateCallback();
  }
};