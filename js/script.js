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
        console.log('isMuted:', isMuted);
        muteUnmuteSounds();
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
        }, 1000)
    };
}

function toggleMute() {
    isMuted = !isMuted;
}

function muteUnmuteSounds() {
    soundTrack.muted = isMuted;
    gameOverSound.muted = isMuted;
    winLevelSound.muted = isMuted;
    world.level.bottles.forEach(bottle => {
        bottle.bottle_collected_sound.muted = isMuted;
    });
    world.level.coins.forEach(coin => {
        coin.coin_collected_sound.muted = isMuted;
    });
    world.level.enemies.forEach(enemy => {
        if (enemy instanceof Chicken || enemy instanceof Chick) {
            enemy.chicken_hurt_sound.muted = isMuted;
        }
        else if (enemy instanceof Endboss) {
            enemy.endboss_hurt_sound.muted = isMuted;
        }
    })
    world.character.walking_sound.muted = isMuted;
    world.character.jumping_sound.muted = isMuted;
    world.character.snoring_sound.muted = isMuted;
    world.character.hurt_sounds.forEach(sound => {
        sound.muted = isMuted;
    });

    const imgElement = document.querySelector('#btn-mute img');
    if (isMuted) {
        imgElement.setAttribute("src", "assets/img/volume-xmark-solid.svg");
    } 
    if (!isMuted) {
        imgElement.setAttribute("src", "assets/img/volume-off-solid.svg");
    }
}