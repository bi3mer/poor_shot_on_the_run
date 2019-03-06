
const Utility = {};
Utility.displayTextOnLine = (x, y, display, text, color) => {
  for(let i = 0; i < text.length; ++i) {
    display.draw(x + i, y, text[i], color);
  }
};

Utility.range = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;;
};

Utility.manhattanDistance = (x1, y1, x2, y2) => {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};