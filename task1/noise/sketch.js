const width = 1200;
const height = 600;
const yStep = 0.05;
// const yStep = 10;
const scale = 10;
const xMultiplier = 1 / scale;
const PI = 3.141592
var colors = [];
var phaseSlider;
var frequencySlider;
var amplitudeSlider;
var prev;
//Variant specific (4)

var amplitude = 8;
var frequency = 4;
var phase = 2;


const N = 1024;
const mMax = N * 2

function setup() {
  createP('Phase');
  phaseSlider = createSlider(0,628,50);
  createP('Frequency');
  frequencySlider = createSlider(0,25,1);
  createP('Amplitude');
  amplitudeSlider = createSlider(0,240,8);

  createCanvas(width, height);

}

function draw() {
  background(0);
  stroke(255);
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);


  phase = phaseSlider.value() / 100;
  frequency = frequencySlider.value();
  amplitude = amplitudeSlider.value() / 8

  stroke(255,255,0);
  strokeWeight(2);
  fill(255,255,0);
  showGraph();
}

function polyharmonicSingleFunction(x, amp, freq, ph) {
  return amp * sin((freq * x / N) + ph);
}

function showGraph() {
  randomSeed(N);
  for (let x = -width / 2; x <= width /2; x += yStep) {
    let y = noiseFunc(x);
    if (prev && int(dist(prev.x, prev.y, x, y)) < width) {
      line(prev.x + width / 2, prev.y + height / 2, x + width / 2, y  + height / 2);
      prev = {x: x, y: y}
    } else {
      point(x + width / 2, y  + height / 2, 2);
      prev = {x: x, y: y}
    }
    
  }
}

function triangular(x, k) {
  var total = 0;
  var startingAmplitude = 180;
  var startingFrequency = 10;
  var phaseShift = 1
  for(var i = 1; i <= k; i += 2) {
    phaseShift = 3 - phaseShift;
    total += polyharmonicSingleFunction(x, startingAmplitude / (i * i), startingFrequency * i, phaseShift * PI);
  }
  return total;
}

function noiseFunc(x) {
  return(random(-180,180));
}

