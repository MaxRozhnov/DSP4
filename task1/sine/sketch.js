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

//Variant specific (4)

var amplitude = 8;
var frequency = 4;
var phase = 2;

const phases = [PI / 6,
                PI / 3,
                2 * PI / 3,
                PI / 4,
                0];

const polyharmonicFrequencies = [1,2,3,4,5];
const polyharmonicAmplitudes = [6,6,6,6,6];
const polyharmonicPhases = [1,2,3,4,5];

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


  // for (var i = 0; i < phases.length; i++) {
  //   //phase = frameCount / 10 * phases[i];
  //   phase = phases[i];
  //   stroke(colorFor(i));
  //   showGraph();
  // }

  phase = phaseSlider.value() / 100;
  frequency = frequencySlider.value();
  amplitude = amplitudeSlider.value() / 8


   // stroke(255,0,0);
   // showGraph();

  stroke(255,255,0);
  showGraph();
  //showHarmonicGraph2()


}

function harmonic(x) {
  return amplitude * sin((2 * PI * frequency * x / N) + phase) * scale + height / 2 ;
}

function polyharmonicSingleFunction(x, amp, freq, ph) {
  return amp * sin((2 * PI * freq * x / N) + ph + phase);
}

function polyharmonic(x) {
  var result = 0;
  for (let i = 0; i < 4; i++) {
    result += polyharmonicSingleFunction(x, polyharmonicAmplitudes[i], polyharmonicFrequencies[i], polyharmonicPhases[i]);
  }
  return result * scale + height / 2 ;
}

function harmonic2(x) {
  return sin((2 * PI * x) / N) * scale + height / 2 ;
}

function showGraph() {
  for (let x = -width / 2; x <= width /2; x += yStep) {
    let y = harmonic(x);

    point(x + width / 2, y, 2);
  }
}

function showPolyharmonicGraph() {
  for (let x = -width / 2; x <= width /2; x += yStep) {
    let y = polyharmonic(x);
    point(x + width / 2, y, 2);
  }
}

function showHarmonicGraph2() {


}

function colorFor(x) {
  if (!colors[x]) {
    colors[x] = color(random(), random(255), random(255));
  }
  return colors[x];
}
