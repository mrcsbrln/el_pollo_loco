let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', event => {
    if (event.key === "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    } 
    if (event.key === 'ArrowUP') {
        keyboard.UP = true;
    } 
    if (event.key === 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (event.key === ' ') {
        keyboard.SPACE = true;
    }
    if (event.key === 'd') {
        keyboard.D = true;
    }  
})

window.addEventListener('keyup', event => {
    if (event.key === "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = false;
    } 
    if (event.key === 'ArrowUP') {
        keyboard.UP = false;
    } 
    if (event.key === 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (event.key === ' ') {
        keyboard.SPACE = false;
    }
    if (event.key === 'd') {
        keyboard.D = false;
    }  
})

document.getElementById('btn-left').addEventListener('touchstart', e => {
    e.preventDefault();
    keyboard.LEFT = true;
});

document.getElementById('btn-left').addEventListener('touchend', e => {
    e.preventDefault();
    keyboard.LEFT = false;
});

document.getElementById('btn-right').addEventListener('touchstart', e => {
    e.preventDefault();
    keyboard.RIGHT = true;
});

document.getElementById('btn-right').addEventListener('touchend', e => {
    e.preventDefault();
    keyboard.RIGHT = false;
});

document.getElementById('btn-jump').addEventListener('touchstart', e => {
    e.preventDefault();
    keyboard.SPACE = true;
});

document.getElementById('btn-jump').addEventListener('touchend', e => {
    e.preventDefault();
    keyboard.SPACE = false;
});

document.getElementById('btn-throw').addEventListener('touchstart', e => {
    e.preventDefault();
    keyboard.D = true;
});

document.getElementById('btn-throw').addEventListener('touchend', e => {
    e.preventDefault();
    keyboard.D = false;
});