function startGame() {
    init();
    document.getElementById('play-btn').disabled = true;
    document.getElementById('intro-outro-screens').style.display = 'none';
    document.getElementById('canvas-div').style.display = 'block';
    document.getElementById('play-btn').style.zIndex = '-1';
}

