let 
	puzzleBoard = document.querySelector(".soundtracks"),
	puzzlePieces = document.querySelectorAll(".simple_set img"),
	dropZone = document.querySelectorAll('.drop_zone'),
	
	draggedPiece,

    resetBtn = document.querySelector('#reset_btn');

const
    playButton = document.querySelector('#play_btn'),
    pauseButton = document.querySelector('#pause_btn'),
    rewindButton = document.querySelector('#restart_btn'),
    volSlider = document.querySelector('#volume_control');

const originalParents = {};

puzzlePieces.forEach(piece => {
    originalParents[piece.id] = piece.parentElement;
});

function reset() {
    puzzlePieces.forEach(piece => {
        originalParents[piece.id].appendChild(piece);
    });

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
		
	};
}

function playAllTracks() {
    dropZone.forEach(zone => {
        const audioElements = Array.from(zone.querySelectorAll('img'));
        audioElements.forEach(audio => {
            let audioFile = audio.getAttribute('data-audio');
            if (audioFile) {
                let audioEl = new Audio(audioFile);
                audioEl.play();
            }
        });
    });
};
puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));
dropZone.forEach(zone => zone.addEventListener("dragover", handleDragOver));
dropZone.forEach(zone => zone.addEventListener("drop", handleDrop));

resetBtn.addEventListener("click",reset);
playButton.addEventListener("click",playAllTracks);