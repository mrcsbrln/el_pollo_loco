/**
 * The HTML canvas element where the game is rendered.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The main game world instance.
 * @type {World}
 */
let world;

/**
 * An instance of the Keyboard class to track user input.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * An array to store interval IDs for later clearing.
 * @type {number[]}
 */
let intervalIds = [];

/**
 * Initializes the game by setting up the canvas and world.
 * 
 * This function performs the following actions:
 * - Retrieves the canvas element from the DOM.
 * - Creates a new World instance with the canvas and keyboard input.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Sets up a stoppable interval by storing its ID.
 * 
 * @param {Function} fn - The function to execute at each interval.
 * @param {number} time - The time in milliseconds between each execution.
 * @returns {void}
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Stops all intervals that have been set up via `setStoppableInterval`.
 * 
 * This function iterates through the `intervalIds` array and clears each interval,
 * effectively stopping any recurring processes that were previously started.
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
}

/**
 * Handles the keydown event to update the keyboard state.
 * 
 * @param {KeyboardEvent} event - The keyboard event triggered by user input.
 */
window.addEventListener('keydown', event => {
    switch (event.key) {
        case "ArrowRight":
            keyboard.RIGHT = true;
            break;
        case "ArrowLeft":
            keyboard.LEFT = true;
            break;
        case "ArrowUp":
            keyboard.UP = true;
            break;
        case "ArrowDown":
            keyboard.DOWN = true;
            break;
        case ' ':
            keyboard.SPACE = true;
            break;
        case 'd':
            keyboard.D = true;
            break;
        default:
            break;
    }
});

/**
 * Handles the keyup event to update the keyboard state.
 * 
 * @param {KeyboardEvent} event - The keyboard event triggered by user input.
 */
window.addEventListener('keyup', event => {
    switch (event.key) {
        case "ArrowRight":
            keyboard.RIGHT = false;
            break;
        case "ArrowLeft":
            keyboard.LEFT = false;
            break;
        case "ArrowUp":
            keyboard.UP = false;
            break;
        case "ArrowDown":
            keyboard.DOWN = false;
            break;
        case ' ':
            keyboard.SPACE = false;
            break;
        case 'd':
            keyboard.D = false;
            break;
        default:
            break;
    }
});

/**
 * Adds touch event listeners to the left movement button.
 * 
 * These listeners handle the touchstart and touchend events to simulate
 * pressing and releasing the left arrow key.
 */
document.getElementById('btn-left').addEventListener('touchstart', e => {
    e.preventDefault();
    keyboard.LEFT = true;
});

document.getElementById('btn-left').addEventListener('touchend', e => {
    e.preventDefault();
    keyboard.LEFT = false;
});

/**
 * Adds touch event listeners to the right movement button.
 * 
 * These listeners handle the touchstart and touchend events to simulate
 * pressing and releasing the right arrow key.
 */
document.getElementById('btn-right').addEventListener('touchstart', e => {
    e.preventDefault();
    keyboard.RIGHT = true;
});

document.getElementById('btn-right').addEventListener('touchend', e => {
    e.preventDefault();
    keyboard.RIGHT = false;
});

/**
 * Adds touch event listeners to the jump button.
 * 
 * These listeners handle the touchstart and touchend events to simulate
 * pressing and releasing the spacebar key for jumping.
 */
document.getElementById('btn-jump').addEventListener('touchstart', e => {
    e.preventDefault();
    keyboard.SPACE = true;
});

document.getElementById('btn-jump').addEventListener('touchend', e => {
    e.preventDefault();
    keyboard.SPACE = false;
});

/**
 * Adds touch event listeners to the throw button.
 * 
 * These listeners handle the touchstart and touchend events to simulate
 * pressing and releasing the 'D' key for throwing actions.
 */
document.getElementById('btn-throw').addEventListener('touchstart', e => {
    e.preventDefault();
    keyboard.D = true;
});

document.getElementById('btn-throw').addEventListener('touchend', e => {
    e.preventDefault();
    keyboard.D = false;
});