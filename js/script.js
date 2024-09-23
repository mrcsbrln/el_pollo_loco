const soundTrack = new Audio('assets/audio/el-pollo-loco.mp3');
const gameOverSound = new Audio('assets/audio/game-over.mp3');
const winLevelSound = new Audio('assets/audio/win-level.mp3');
let isMuted = false;
soundTrack.volume = 0.15;
soundTrack.loop = true;
gameOverSound.volume = 0.2;
winLevelSound.volume = 0.3;
gameOverSoundPlayed = false;


function startGame() {
    initLevel();
    init();
    document.getElementById('play-btn').disabled = true;
    document.getElementById('intro-outro-screens').style.display = 'none';
    document.getElementById('canvas-div').style.display = 'block';
    document.getElementById('play-btn').style.zIndex = '-1';
    gameOverSound.pause();
    winLevelSound.pause();
    soundTrack.play();
    setInterval(() => {
        gameOver();
    }, 50);
}

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
        },1000)
    };
}

function toggleMute() {
    isMuted = !isMuted;
    soundTrack.muted = isMuted;
    const imgElement = document.querySelector('#btn-mute img');
    console.log(isMuted);
    if (isMuted) {
        imgElement.setAttribute("src", "assets/img/volume-xmark-solid.svg");
    } 
    if (!isMuted) {
        imgElement.setAttribute("src", "assets/img/volume-off-solid.svg");
    }
}