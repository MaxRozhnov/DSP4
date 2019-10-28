const width = 1200;
const height = 600;
const yStep = 0.05;
const scale = 10;
const xMultiplier = 1 / scale;
const PI = 3.141592
var colors = [];
var phaseSlider;
var frequencySlider;
var amplitudeSlider;
var prev;

var amplitude = 8;
var frequency = 4;
var phase = 2;


const N = 1024;
const mMax = N * 2

const maxSaw = 332;
const minSaw = -332;

const maxSquare = 167;
const minSquare = -167;

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

function showGraph() {
  randomSeed(N);
  for (let x = -width / 2; x <= width /2; x += yStep) {
    let y = amplitudeModulation(squareFunc, triangularFunc, x);
    if (prev && int(dist(prev.x, prev.y, x, y)) < width - 20) {
      line(prev.x + width / 2, prev.y + height / 2, x + width / 2, y  + height / 2);
      prev = {x: x, y: y}
    } else {
      point(x + width / 2, y  + height / 2, 2);
      prev = {x: x, y: y}
    }
    
  }
}

function sinFunc(x, amp = 180, freq = 10, ph = 0) {
  return amp * sin((freq * x / N) + ph);
}

function triangularFunc(x, amp = 180, freq = 10, ph = 0, k = 100) {
  var total = 0;
  var startingAmplitude = amp;
  var startingFrequency = freq;
  var phaseShift = 1
  for(var i = 1; i <= k; i += 2) {
    phaseShift = 3 - phaseShift;
    total += sinFunc(x, startingAmplitude / (i * i), startingFrequency * i, phaseShift * PI + ph);
  }
  return total;
}

function noiseFunc(x, amp = 180) {
  return(random(-amp,amp));
}

function squareFunc(x, amp = 180, freq = 10, ph = 0, k = 100) {
  var total = 0;
  freq *= 10;
  var startingAmplitude = amp;
  var startingFrequency = freq;
  for(var i = 1; i <= k; i += 2) {
    total += sinFunc(x, startingAmplitude / i, startingFrequency * i, ph);
  }
  total = map(total, minSquare, maxSquare, 0, amp);
  return total;
}

function sawtoothFunc(x, amp = 180, freq = 10, ph = 0, k = 100) {
  var total = 0;
  var startingAmplitude = amp;
  var startingFrequency = freq;
  var phaseShift = 2
  for(var i = 1; i <= k; i ++) {
    phaseShift = 3 - phaseShift;
    total += sinFunc(x, startingAmplitude / i, startingFrequency * i, phaseShift * PI + ph);
  }
  total = map(total, minSaw, maxSaw, 0, amp);
  return total;
}

//Functions - An array of functions to form plyharmonic signal from. 
//Pass any combination of five of the above functions
//e.g. let y = polyFrom([sawtooth, squareFunc], x);

function polyFrom(functions, x) {
  var results = [];
  functions.forEach(func => {
    results.push(func(x));
  });
  sum = results.reduce(function(a, b) { return a + b; });
  return sum / results.length;
}

function amplitudeModulation(carrierWave, modulatingWave, x) {
  return carrierWave(x, modulatingWave(x));
}

function frequencyModulation(carrierWave, modulatingWave, x, amp) {
  freq = map(modulatingWave(x, amp), 0, amp, 2, 10);
  return carrierWave(x, amp, freq);
}