let maxSymbolSize = 26;
const symbolChains = [];
const positions = [];
var canvas;

function setup() {
  //Setup a new canvas.
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  textSize(maxSymbolSize);

  //Create a list of positions based on the symbol size.
  var x = 0;
  for (var i = 0; i <= 8; i++) {
    var symbolChain = new SymbolChain(x, random(-1000, -100));
    symbolChains.push(symbolChain);
    x += maxSymbolSize;
  }
}

//Draws the effect.
function draw() {
  background(0, 0, 0, 100);

  for (var i = 0; i < symbolChains.length; i++) {
    symbolChains[i].render();
    symbolChains[i].rain();
  }
}

//Resizes the canvas if the window is resized.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//Symbol Particle
class SymbolParticle {
  constructor(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.value = "";
    this.speed = speed;
    this.framesUntilSwitch = round(random(1, 3));
    this.setToRandomSymbol();
  }

  //Renders the particle to the screen.
  render(x, y) {
    fill(0, 255, 70);
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
      this.framesUntilSwitch = round(random(5, 20));
    }
  }
}

//Chain of SymbolParticles
class SymbolChain {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(4, 6);
    this.symbols = [];
    this.totalSymbols = round(random(14, 26));
    this.chainHeight = 0;
    this.generateSymbols(this.x, this.y);
  }

  //Render all symbols in the chain.
  render() {
    this.symbols.forEach((p, index) => {
      p.render(this.x, this.y + maxSymbolSize * index);
    });
  }

  //Generate a chain of symbols.
  generateSymbols(x, y) {
    for (var i = 0; i <= this.totalSymbols; i++) {
      var sym = new SymbolParticle(x, y, this.speed, this.first);
      this.symbols.push(sym);
      y -= maxSymbolSize;
      this.chainHeight += maxSymbolSize;
    }
  }

  //Make the chain of symbols rain down.
  rain() {
    if (this.y > height + this.chainHeight) {
      this.y = 0 - this.chainHeight;
      //TODO: Randomize X value
    } else {
      this.y += this.speed;
    }
  }
}
