
const Utility = {};
Utility.displayTextOnLine = (x, y, display, text, color) => {
  for(let i = 0; i < text.length; ++i) {
    display.draw(x + i, y, text[i], color);
  }
};