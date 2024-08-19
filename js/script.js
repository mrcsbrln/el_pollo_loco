let isDead = false;

function startGame() {
    initLevel();
    init();
    document.getElementById('play-btn').disabled = true;
    document.getElementById('intro-outro-screens').style.display = 'none';
    document.getElementById('canvas-div').style.display = 'block';
    document.getElementById('play-btn').style.zIndex = '-1';
}

function gameOver() {
    if (isDead) {
        document.getElementById('intro-outro-screens').style.backgroundImage = "url('assets/img/9_intro_outro_screens/game_over/game over.png')";
        document.getElementById('intro-outro-screens').style.display = 'block';
        document.getElementById('canvas-div').style.display = 'none';
    };
}

setInterval(() => {
    gameOver();
}, 50);