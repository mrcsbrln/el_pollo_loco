/**
 * Manages the state of keyboard inputs for the game.
 * Tracks the status of specific keys (LEFT, RIGHT, UP, DOWN, SPACE, D) to control game interactions.
 */
class Keyboard {
    /**
     * Indicates whether the LEFT arrow key is currently pressed.
     * @type {boolean}
     */
    LEFT = false;

    /**
     * Indicates whether the RIGHT arrow key is currently pressed.
     * @type {boolean}
     */
    RIGHT = false;

    /**
     * Indicates whether the UP arrow key is currently pressed.
     * @type {boolean}
     */
    UP = false;

    /**
     * Indicates whether the DOWN arrow key is currently pressed.
     * @type {boolean}
     */
    DOWN = false;

    /**
     * Indicates whether the SPACE bar is currently pressed.
     * @type {boolean}
     */
    SPACE = false;

    /**
     * Indicates whether the 'D' key is currently pressed.
     * @type {boolean}
     */
    D = false;
}