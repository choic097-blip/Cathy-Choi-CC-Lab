let scene = 1;
let inputBox, message = "";
let bubbles = [];
let bgBrightness = 255;
let autoIndex = 0;
let timer = 0;
let button;
let playerInputs = [];

let character1, character2, character3;
let scene1music, scene2music, scene1sfx, scene2sfx;
let customFont;
let audioStarted = false;

let autoSentences = [
  { text: "", correct: "I’m good" },
  { text: "", correct: "I’m fine" },
  { text: "", correct: "I’m OK" },
  { text: "", correct: "I'm normal" },
  { text: "", correct: "Say something normal" },
  { text: "", correct: "Say something not offensive" },
  { text: "", correct: "Say" },
];

function preload() {
  customFont = loadFont("assets/fonts/memomentKkukkkuk.ttf");

  character1 = loadImage("assets/images/character1.png");
  character2 = loadImage("assets/images/character2.png");
  character3 = loadImage("assets/images/character3.png");

  scene1music = loadSound("assets/sounds/scene1music.mp3");
  scene2music = loadSound("assets/sounds/scene2music.mp3");
  scene1sfx   = loadSound("assets/sounds/scene1sfx.mp3");
  scene2sfx   = loadSound("assets/sounds/scene2sfx.mp3");
}

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("sketch-container");

  textFont(customFont);
  textAlign(CENTER, CENTER);
  setupInput();
}

function draw() {
  background(bgBrightness);
  drawCharacter();

  fill(scene === 1 ? 0 : 255);

  if (scene === 1) sceneOne();
  if (scene === 2) sceneTwo();
  if (scene === 3) sceneThree();

  drawBubbles();
}

/* 🔊 AUDIO UNLOCK */
function mousePressed() {
  if (!audioStarted) {
    userStartAudio();
    scene1music.loop();
    audioStarted = true;
  }
}

/* SCENES */

function sceneOne() {
  textSize(24);
  text("Say anything about yourself.", width / 2, height / 2 - 220);
  if (bgBrightness <= 20) nextScene();
}

function sceneTwo() {
  textSize(20);
  text("What did you say?", width / 2, height / 2 - 220);

  if (frameCount - timer > 200 && autoIndex < autoSentences.length) {
    let data = autoSentences[autoIndex++];
    bubbles.push(new Bubble(data.text, width / 2, height * 0.55, true, data.correct, true));
    scene2sfx.play();
    timer = frameCount;
  }

  if (autoIndex >= autoSentences.length && frameCount - timer > 200) {
    nextScene();
  }
}

function sceneThree() {
  textSize(20);
  text("I don’t really have anything to say.", width / 2, height / 2);

  if (!button && frameCount - timer > 180) {
    button = createImg("assets/images/restartButton.png");
    button.parent("sketch-container");
    button.size(120, 50);
    button.position(width / 2 - 60, height / 2 + 40);
    button.mousePressed(resetGame);
  }
}

/* INPUT */

function setupInput() {
  inputBox = createInput("");
  inputBox.parent("sketch-container");

  // ✅ canvas 기준으로 위치 고정
  inputBox.position(width / 2 - 200, height - 70);
  inputBox.size(400, 40);
  inputBox.attribute("placeholder", "Type here and press Enter");
  inputBox.style("text-align", "center");

  // ✅ 이게 빠져 있었음 (핵심)
  inputBox.input(() => {
    message = inputBox.value();
  });
}

function keyPressed() {
  if (scene === 1 && keyCode === ENTER && message.trim() !== "") {
    bubbles.push(new Bubble(message, width / 2, height * 0.55));
    playerInputs.push(message);
    scene1sfx.play();
    bgBrightness -= 40;
    inputBox.value("");
    message = "";
  }
}

function nextScene() {
  scene++;
  timer = frameCount;

  if (scene === 2) {
    inputBox.remove();
    scene1music.stop();
    scene2music.loop();

    autoSentences.forEach((s, i) => {
      s.text = playerInputs[i] || random(playerInputs);
    });
  }

  if (scene === 3) {
    scene2music.stop();
  }
}

function resetGame() {
  scene = 1;
  bgBrightness = 255;
  bubbles = [];
  autoIndex = 0;
  playerInputs = [];

  if (button) button.remove();
  setupInput();
  scene1music.loop();
}

/* VISUALS */

function drawCharacter() {
  imageMode(CENTER);
  let img = scene === 1 ? character1 : scene === 2 ? character2 : character3;
  image(img, width / 2, height * 0.75);
}

function drawBubbles() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    if (bubbles[i].done) bubbles.splice(i, 1);
  }
}

class Bubble {
  constructor(text, x, y, censored=false, correct="", white=false) {
    this.text = text;
    this.correct = correct;
    this.x = x;
    this.y = y - random(40, 80);
    this.opacity = 255;
    this.timer = frameCount;
    this.censored = censored;
    this.white = white;
    this.corrected = false;
    this.done = false;
  }

  update() {
    this.y -= 0.2;
    this.opacity -= 1.2;
    if (this.opacity <= 0) this.done = true;
  }

  display() {
    push();
    textSize(20);
    fill(this.white ? 255 : 0, this.opacity);
    text(this.text, this.x, this.y);
    pop();

    if (this.censored && !this.corrected && frameCount - this.timer > 60) {
      this.text = this.correct;
      this.corrected = true;
    }
  }
}
