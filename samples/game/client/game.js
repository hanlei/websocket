// 
// Pashe programming lab! Wow! Cool! Vote for pashe!!!11
//


var w = 100;
var h = 60;
var cellsize = 10;
var canvas = document.getElementById("field");
var ctx = canvas.getContext('2d');

canvas.width = w * cellsize;
canvas.height = h * cellsize;
ctx.font = "12px Arial";

// dir:   0 - up, 1 - down, 2 - left, 3 - right

var paused = false;
var keys = { up: false, down: false, left: false, right: false, shift: false, fire: false, superfire: false };
var tanks = new Array(36);


var tankmodelsize = 3;
var tankmodel = new Array(4);
tankmodel[0] = [
    0, 1, 0,
    1, 1, 1,
    1, 0, 1];
tankmodel[1] = [
    1, 0, 1,
    1, 1, 1,
    0, 1, 0];
tankmodel[2] = [
    0, 1, 1,
    1, 1, 0,
    0, 1, 1 ];
tankmodel[3] = [
    1, 1, 0,
    0, 1, 1,
    1, 1, 0 ];

function applyKeys() {
    tankObj = {}

    if (keys.up)
        tankObj.dir = 0;
    else if (keys.down)
        tankObj.dir = 1;
    else if (keys.left)
        tankObj.dir = 2;
    else if (keys.right)
        tankObj.dir = 3;

    if (keys.up || keys.down || keys.left || keys.right) {
        ws.send(JSON.stringify(tankObj));
    }
}

//
// Drawing
//

function drawTank(tankObj, i) {
    if (tankObj.health > 0)
        drawHealth(cellsize * tankObj.x, cellsize * tankObj.y - 15, tankObj.health);

    ctx.fillStyle = i ? "#00bbbb" : "#3b5998";

    for (iy = 0; iy < tankmodelsize; iy++)
        for (ix = 0; ix < tankmodelsize; ix++) {
            if (1 == tankmodel[ tankObj.dir ][iy * tankmodelsize + ix]) {
                ctx.fillRect(cellsize * (tankObj.x + ix), cellsize * (tankObj.y + iy), cellsize - 1, cellsize - 1);
            }
        }

    ctx.fillText(tankObj.name, cellsize * tankObj.x, cellsize * (tankObj.y + 4));
}

function drawHealth(x, y, health) {
    ctx.fillStyle = "#a5f5a5";
    ctx.fillRect(x, y, health / 3, 5);

    ctx.fillStyle = "#000";
    ctx.font = "10px sans-serif";
    ctx.textBaseline = "bottom";
    ctx.fillText(health, x, y);
}

function draw() {
    ctx.clearRect(0, 0, w * cellsize, h * cellsize);

    for (i = 0; i < tanks.length; ++i)
        drawTank(tanks[i], i);
}

function mainLoop() {
    if (paused) {
        setTimeout(mainLoop, 1000 / 10);
        return;
    }

    applyKeys();
    setTimeout(mainLoop, 1000 / 10);
}

function keyDown(e) {
    switch (e.keyCode) {
        //default: break;

        // up:
        case 38:
        case 87:
            keys.up = true;
            break;
        // down:
        case 40:
        case 83:
            keys.down = true;
            break;
        // left:
        case 37:
        case 65:
            keys.left = true;
            break;
        // right:
        case 39:
        case 68:
            keys.right = true;
            break;
        // 'L'
        case 76:
            keys.shift = true;
            break;
    }
}

function keyUp(e) {
    switch (e.keyCode) {
        //default: break;

        // up:
        case 38:
        case 87:
            keys.up = false;
            break;
        // down:
        case 40:
        case 83:
            keys.down = false;
            break;
        // left:
        case 37:
        case 65:
            keys.left = false;
            break;
        // right:
        case 39:
        case 68:
            keys.right = false;
            break;

        // 'L'
        case 76:
            keys.shift = false;
            break;
    }
}

paused = false;
window.addEventListener("keydown", keyDown, false)
window.addEventListener("keyup", keyUp, false)
canvas.focus();
