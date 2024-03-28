let 
	puzzleBoard = document.querySelector(".soundtracks"),
	puzzlePieces = document.querySelectorAll(".simple_set img"),
	dropZones = document.querySelectorAll('.drop_zone'),
	
	draggedPiece,

    resetBtn = document.querySelector('#reset_btn');

const
    albumCovers = document.querySelectorAll("#album-art img"),
    theAudioEl = document.querySelector('#audioEl'),
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

function playSelectedTracks() {
    let selectedTracks = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(checkbox => checkbox.value);
  
    selectedTracks.forEach(track => {
      let audio = new Audio(track);
      audio.play();
    });
  }

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));
dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));
dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));

resetBtn.addEventListener("click",reset);
playButton.addEventListener("click",playSelectedTracks);