'use strict';

let MenuInputCallBack = undefined;

let Menu = class {
  draw(width, height){
    // draw thte title
    let x = (width - (config.title.length / 2)) / 3;
    let y = 0.25 * height
    for(let i = 0; i < config.title.length; ++i) {
      display.draw(x, y, config.title[i], config.menu.titleColor);
      ++x;
    }

    // draw start with asterisk
    x = (width - (config.title.length / 5)) / 3;
    y = 0.5 * height;
    const text = "Press Enter to Start";
    for(let i = 0; i < text.length; ++i) {
      display.draw(x, y, text[i], config.menu.startColor);
      ++x;
    }
  };

  handleInput(e) {
    if(e.key === 'Enter') {
      MenuInputCallBack();
    }
  };
};