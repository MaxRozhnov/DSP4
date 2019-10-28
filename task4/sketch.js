const logicalWidth = 30;
const logicalHeight = 30;
const scale = 50;
const border = false

var fr = 1;

var generatedMap;

const side = 7;

function setup() {
    const actualWidth = logicalWidth * scale;
    const actualHeight = logicalHeight * scale;
    generatedMap = randomizeMap();
    generatedMap = smoothOut(generatedMap);
    frameRate(fr);
    createCanvas(actualWidth, actualHeight);
}

function draw() {
    showNoiseMap(generatedMap, scale, false);
}

function showNoiseMap(noiseMap, scale, showBorder) {
    if (showBorder) {
        stroke(0);
        strokeWeight(1);    
    } else {
        strokeWeight(0);   
    }

    var y = 0;  
    noiseMap.forEach( row => {
        var x = 0;
        row.forEach (noiseValue => {
            fill(255 * noiseValue);
            rect(x * scale, y * scale, scale, scale);
            x++;
        });
        y++;
    });
}

function randomizeMap() {
    randomMap = [];

    for (var i = 0; i < logicalHeight; i++) {
        randomMap[i] = [];
    }


    for (var i = 0; i < logicalHeight; i++) {
        for (var j = 0; j < logicalWidth; j++) {
            randomMap[i][j] = random();
        }
    }
    return randomMap;
}

function smoothOut(mapToSmooth) {
    var smoothMap = [];
    for (var i = 0; i < logicalHeight; i++) {
        smoothMap[i] = [];
    }
    for (var i = 0; i < logicalHeight; i++) {
        for (var j = 0; j < logicalWidth; j++) {
            var window_offset = floor((side - 1) / 2);
            var i_from = i - window_offset < 0 ? 0 : i - window_offset;
            var i_to = i + window_offset < logicalHeight ? i + window_offset : logicalHeight - 1;
            var j_from = j - window_offset < 0 ? 0 : j - window_offset;
            var j_to = j + window_offset < logicalWidth ? j + window_offset : logicalWidth - 1;
            var sum = 0;
            var count = 0;
            for (var k = i_from; k <= i_to; k++) {
                for (var l = j_from; l <= j_to; l++) {
                    print("k = " + k);
                    print("l = " + l);

                    sum += mapToSmooth[k][l];
                    count++;
                }
            }
            smoothMap[i][j] = sum / count;
        }
    }
    return smoothMap;
}