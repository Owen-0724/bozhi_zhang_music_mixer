let puzzleBoard = document.querySelector(".soundtracks"),
    puzzlePieces = document.querySelectorAll(".simple_set img"),
    dropZone = document.querySelectorAll('.drop_zone'),
    draggedPiece,
    audioElements = [],
    resetBtn = document.querySelector('#reset_btn'),
    loopBtn = document.querySelector('#loop_btn'),
    isLooping = false; // Track loop state

const playButton = document.querySelector('#play_btn'),
    pauseButton = document.querySelector('#pause_btn'),
    restartButton = document.querySelector('#restart_btn'),
    volSlider = document.querySelector('#volume_control');

const originalParents = {};

puzzlePieces.forEach(piece => {
    originalParents[piece.id] = piece.parentElement;
});

function reset() {
    puzzlePieces.forEach(piece => {
        originalParents[piece.id].appendChild(piece);
    });
    pauseAudio();
}

function handleStartDrag() { 
    console.log('started dragging this piece:', this);
    draggedPiece = this;
}

function handleDragOver(e) { 
    e.preventDefault();
    console.log('dragged over me'); 
}

function handleDrop(e) { 
    e.preventDefault();
    console.log('dropped something on me');
    
    if (this.childElementCount === 0) {
        this.appendChild(draggedPiece);
    } else {
        
    }
}

function playAllTracks() {
    dropZone.forEach(zone => {
        const audioElementsInZone = Array.from(zone.querySelectorAll('img'));
        audioElementsInZone.forEach(audio => {
            let audioFile = audio.getAttribute('data-audio');
            if (audioFile) {
                let audioEl = new Audio(audioFile);
                if (isLooping) {
                    audioEl.loop = true; // Set loop property
                }
                audioEl.play();
                audioElements.push(audioEl);
            }
        });
    });
}

function restartAudio() { 
    audioElements.forEach(audioEl => {
        audioEl.pause(); 
        audioEl.currentTime = 0; 
        audioEl.play(); 
    });
}

function pauseAudio() { 
    audioElements.forEach(audioEl => {
        audioEl.pause(); 
    });
}

function setVolume() {
    audioElements.forEach(audioEl => {
        audioEl.volume = (volSlider.value/100); 
    });
}

function toggleLoop() {
    isLooping = !isLooping; // Toggle loop state
    audioElements.forEach(audioEl => {
        audioEl.loop = isLooping; // Set loop property for all audio elements
    });
}

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));
dropZone.forEach(zone => zone.addEventListener("dragover", handleDragOver));
dropZone.forEach(zone => zone.addEventListener("drop", handleDrop));
resetBtn.addEventListener("click", reset);
playButton.addEventListener("click", playAllTracks);
restartButton.addEventListener('click', restartAudio);
pauseButton.addEventListener('click', pauseAudio);
volSlider.addEventListener('change', setVolume);
loopBtn.addEventListener('click', toggleLoop);
