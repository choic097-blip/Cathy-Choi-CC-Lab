let font;
let strips = []; 

let msg = "Wind";
let fontSize = 180;

function preload() {
  // [수정] 한 단계 나가서(../) fonts 폴더 내부의 폰트를 가져옵니다.
  font = loadFont('../fonts/Kim-Regular.ttf'); 
}

function setup() {
  // [수정] 캔버스 객체를 변수에 담아야 parent()를 안정적으로 쓸 수 있습니다.
  let cnv = createCanvas(600, 600);
  
  // HTML의 <div id="sketch-holder"> 안으로 캔버스를 강제 이동시킵니다.
  cnv.parent('sketch-holder');

  let points = font.textToPoints(msg, 100, 350, fontSize, {
    sampleFactor: 0.15,
    simplifyThreshold: 0
  });

  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let len = random(15, 55); 
    let strip = new Strip(p.x, p.y, len);
    strips.push(strip);
  }
}

function draw() {
  background(255); 
  
  let mouseVel = createVector(mouseX - pmouseX, mouseY - pmouseY);
  
  for (let i = 0; i < strips.length; i++) {
    let s = strips[i];
    s.update(mouseVel);
    s.show();
  }
}

class Strip {
  constructor(x, y, h) {
    this.home = createVector(x, y); 
    this.pos = createVector(x, y);  
    this.vel = createVector(0, 0);  
    this.acc = createVector(0, 0);  
    this.h = h; 
    this.noiseOffset = random(1000); 
  }

  update(mouseVel) {
    let n = noise(this.pos.x * 0.01, this.pos.y * 0.01, frameCount * 0.01);
    let windAngle = map(n, 0, 1, -PI, PI);
    let naturalWind = p5.Vector.fromAngle(windAngle);
    naturalWind.mult(0.02); 
    this.applyForce(naturalWind);

    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (d < 120 && mouseVel.mag() > 0) {
      let force = mouseVel.copy();
      force.mult(0.05); 
      this.applyForce(force);
    }

    let desired = p5.Vector.sub(this.home, this.pos);
    desired.mult(0.001); 
    this.applyForce(desired);

    this.vel.add(this.acc);
    this.vel.mult(0.95); 
    this.pos.add(this.vel);
    
    this.acc.mult(0); 
  }

  applyForce(f) {
    this.acc.add(f);
  }

  show() {
    stroke(0, 100, 150, 150); 
    strokeWeight(0.9);
    line(this.pos.x, this.pos.y - this.h/2, this.pos.x, this.pos.y + this.h/2);
  }
}