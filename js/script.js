/**
 * Audio object for the main soundtrack.
 * @type {HTMLAudioElement}
 */
const soundTrack = new Audio('assets/audio/el-pollo-loco.mp3');

/**
 * Audio object for the game over sound effect.
 * @type {HTMLAudioElement}
 */
const gameOverSound = new Audio('assets/audio/game-over.mp3');

/**
 * Audio object for the level completion sound effect.
 * @type {HTMLAudioElement}
 */
const winLevelSound = new Audio('assets/audio/win-level.mp3');

/**
 * Flag indicating whether all sounds are muted.
 * @type {boolean}
 */
let isMuted = false;

/**
 * Indicates whether the game over sound has been played to prevent repetition.
 * @type {boolean}
 */
let gameOverSoundPlayed = false;

// Configure audio settings
soundTrack.volume = 0.15;
soundTrack.loop = true;
gameOverSound.volume = 0.2;
winLevelSound.volume = 0.3;

/**
 * Initializes and starts the game.
 * 
 * This function performs the following actions:
 * - Initializes the game level and other necessary components.
 * - Resets the current time of all audio tracks.
 * - Plays the main soundtrack.
 * - Pauses game over and win level sounds.
 * - Disables the play button and adjusts UI elements to show the game canvas.
 * - Sets up a recurring interval to check for game over conditions and manage sound muting.
 */
function startGame() {
    initLevel();
    init();
    soundTrack.currentTime = 0;
    gameOverSound.currentTime = 0;
    winLevelSound.currentTime = 0;
    soundTrack.play();
    gameOverSound.pause();
    winLevelSound.pause();
    document.getElementById('play-btn').disabled = true;
    document.getElementById('intro-outro-screens').style.display = 'none';
    document.getElementById('canvas-div').style.display = 'block';
    document.getElementById('play-btn').style.zIndex = '-1';
    setInterval(() => {
        gameOver();
        muteUnmuteSounds();
    }, 50);
}

/**
 * Checks for game over conditions and handles the game termination process.
 * 
 * This function performs the following actions:
 * - Checks if the character is dead or the last enemy is defeated.
 * - If a game over condition is met, it stops the game after a short delay.
 * - Displays the appropriate game over or win screen.
 * - Plays the corresponding sound effect.
 * - Resets UI elements to allow restarting the game.
 * - Pauses the main soundtrack.
 */
function gameOver() {
    if (world.character.isDead() || world.level.enemies[world.level.enemies.length -1].isDead()) {
        setTimeout(() => {
            stopGame();
            if (world.character.isDead() && !gameOverSoundPlayed) {
                document.getElementById('intro-outro-screens').style.backgroundImage = "url('assets/img/9_intro_outro_screens/game_over/game over.png')";
                gameOverSound.play();
                gameOverSoundPlayed = true;
            }
            if (world.level.enemies[world.level.enemies.length -1].isDead()) {
                document.getElementById('intro-outro-screens').style.backgroundImage = "url('assets/img/9_intro_outro_screens/win/won_2.png')";
                winLevelSound.play();
            }
            document.getElementById('intro-outro-screens').style.display = 'flex';
            document.getElementById('canvas-div').style.display = 'none';
            document.getElementById('play-btn').disabled = false;
            document.getElementById('play-btn').style.zIndex = '2';
            soundTrack.pause();
        }, 1000)
    };
}

/**
 * Toggles the mute state for all game sounds.
 * 
 * This function inverts the current mute state (`isMuted`) and subsequently updates
 * the mute status of all relevant audio elements by calling `muteUnmuteSounds()`.
 */
function toggleMute() {
    isMuted = !isMuted;
}

/**
 * Mutes or unmutes all game-related sounds based on the current mute state.
 * 
 * This function performs the following actions:
 * - Sets the `muted` property of all audio elements to match the `isMuted` flag.
 * - Iterates through various game entities (bottles, coins, enemies, character) to mute/unmute their associated sounds.
 * - Updates the mute button icon to reflect the current sound state.
 */
function muteUnmuteSounds() {
    soundTrack.muted = isMuted;
    gameOverSound.muted = isMuted;
    winLevelSound.muted = isMuted;
    
    // Mute/unmute bottle collection sounds
    world.level.bottles.forEach(bottle => {
        bottle.bottle_collected_sound.muted = isMuted;
    });
    
    // Mute/unmute coin collection sounds
    world.level.coins.forEach(coin => {
        coin.coin_collected_sound.muted = isMuted;
    });
    
    // Mute/unmute enemy sounds
    world.level.enemies.forEach(enemy => {
        if (enemy instanceof Chicken || enemy instanceof Chick) {
            enemy.chicken_hurt_sound.muted = isMuted;
        }
        else if (enemy instanceof Endboss) {
            enemy.endboss_hurt_sound.muted = isMuted;
        }
    });

    // Mute/unmute character sounds
    world.character.walking_sound.muted = isMuted;
    world.character.jumping_sound.muted = isMuted;
    world.character.snoring_sound.muted = isMuted;
    world.character.hurt_sounds.forEach(sound => {
        sound.muted = isMuted;
    });

    // Update the mute button icon
    const imgElement = document.querySelector('#btn-mute img');
    if (isMuted) {
        imgElement.setAttribute("src", "assets/img/volume-xmark-solid.svg");
    } 
    else {
        imgElement.setAttribute("src", "assets/img/volume-off-solid.svg");
    }
}