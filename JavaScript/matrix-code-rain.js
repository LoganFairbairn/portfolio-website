var canvas;
let canvasHeight = 0;
let canvasWidth = 0;
const maxSymbolSize = 22;
const minSymbolSize = 10;
const maxSymbolLength = 26;
const maxSymbolChains = 24;
const symbolChains = [];
let chainPositions = [];
let filledPositions = [];

function setup() {
  calculateCanvasSize();
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  textSize(maxSymbolSize);

  //Calculate symbol chain positions and then create them at a selected position.
  calculateChainPositions();
  createSymbolChains();
}

//Draws the effect.
function draw() {
  background(20);

  for (var i = 0; i < symbolChains.length; i++) {
    symbolChains[i].render();
    symbolChains[i].rain();
  }
}

//Resizes the canvas if the window is resized.
function windowResized() {
  calculateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  calculateChainPositions();
}

function calculateCanvasSize() {
  canvasWidth = window.innerWidth;

  canvasHeight = 0;

  var sections = document.getElementsByClassName("main-section");
  console.log("Number of sections: " + sections.length.toString());
  for (let i = 0; i < sections.length; i++) {
    canvasHeight += sections[i].scrollHeight;
  }

  console.log(canvasHeight);
}

//Symbol Particle
class SymbolParticle {
  constructor(x, y, speed, size, first) {
    this.x = x;
    this.y = y;
    this.value = "";
    this.speed = speed;
    this.size = size;
    this.first = first;
    this.framesUntilSwitch = round(random(1, 3));
    this.setToRandomSymbol();
  }

  //Renders the particle to the screen.
  render(x, y) {
    let colorVariation = round(1 - this.size / maxSymbolSize) * 100 * 1;

    let r = 221;
    let g = 141;
    let b = 70;
    if (this.first == true) {
      r = 43;
      g = 219;
      b = 253;
    }

    r -= colorVariation;
    b -= colorVariation;
    g -= colorVariation;

    fill(r, g, b);

    text(this.value, x, y);
    this.switchDelay();
  }

  //Sets the particle to a random symbol.
  setToRandomSymbol() {
    this.value = String.fromCharCode(0x30a0 + round(random(0, 96)));
  }

  //Switch Delay.
  switchDelay() {
    this.framesUntilSwitch--;

    if (this.framesUntilSwitch == 0) {
      this.setToRandomSymbol();
      this.framesUntilSwitch = round(random(12, 40));
    }
  }
}

//Chain of SymbolParticles
class SymbolChain {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(2, 4);
    this.size = round(random(minSymbolSize, maxSymbolSize));
    this.symbols = [];
    this.totalSymbols = round(random(14, maxSymbolLength));
    this.chainHeight = 0;
    this.generateSymbols(this.x, this.y);
  }

  //Render all symbols in the chain.
  render() {
    textSize(this.size);
    this.symbols.forEach((p, index) => {
      p.render(this.x, this.y + maxSymbolSize * index);
    });
  }

  //Generate a chain of symbols.
  generateSymbols(x, y) {
    let first = false;

    for (var i = 0; i <= this.totalSymbols; i++) {
      if (i == this.totalSymbols) {
        first = true;
      }
      var sym = new SymbolParticle(x, y, this.speed, this.size, first);
      this.symbols.push(sym);
      y -= maxSymbolSize;
      this.chainHeight += maxSymbolSize;
    }
  }

  //Make the chain of symbols rain down.
  rain() {
    if (this.y > height + this.chainHeight) {
      this.x = chainPositions[floor(random(0, chainPositions.length))];
      this.y = 0 - this.chainHeight;
      this.size = round(random(minSymbolSize, maxSymbolSize));
    } else {
      this.y += this.speed;
    }
  }
}

//Calculates and sets the available symbol chain positions.
function calculateChainPositions() {
  while (chainPositions.length > 0) {
    chainPositions.pop();
  }

  var x = 0;
  for (let i = 0; i < width / maxSymbolSize; i++) {
    chainPositions.push(x);
    x += maxSymbolSize;
  }
}

//Creates symbol chains.
function createSymbolChains() {
  var x = 0;
  for (let i = 0; i < maxSymbolChains; i++) {
    //Select a position.
    x = chainPositions[floor(random(0, chainPositions.length))];

    //Create the chain at that position.
    var symbolChain = new SymbolChain(
      x,
      random(-1 * window.innerHeight * 5, -400)
    );
    symbolChains.push(symbolChain);
  }
}
