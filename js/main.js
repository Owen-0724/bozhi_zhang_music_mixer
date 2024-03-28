let 
	
	puzzleBoard = document.querySelector(".soundtracks"),
	puzzlePieces = document.querySelectorAll(".simple_set img"),
	dropZones = document.querySelectorAll('.drop_zone'),
	
	draggedPiece,

    resetBtn = document.querySelector('.reset_btn');

const originalParents = {};

// Initialize originalParents object with the original parent of each puzzle piece
puzzlePieces.forEach(piece => {
    originalParents[piece.id] = piece.parentElement;
});

function reset() {
    // Move each puzzle piece back to its original parent
    puzzlePieces.forEach(piece => {
        originalParents[piece.id].appendChild(piece);
    });

}
function handleStartDrag() { 
	console.log('started dragging this piece:', this);
	// store a reference to the puzzle piece image that we're dragging
	// so we can use it later and move it to a drop zone
	draggedPiece = this;
}

function handleDragOver(e) { 
	e.preventDefault(); // e is shorthand for event
	// this overrides the default dragover behaviour
	console.log('dragged over me'); 
}

function handleDrop(e) { 
	e.preventDefault();
	console.log('dropped something on me');
	// bug fix #1 should go here, and it's at most 3 lines of JS code

	// this line is going to move the dragged piece from the left side of the board
	// into whatever drop zone we choose. appendChild means "add element to the container"
	this.appendChild(draggedPiece);
}



// step 2
// event handling always goes at the bottom => 
// how do we want users to interact with our app

// 1 to 1 event handling
//theButton.addEventListener("click", changeBGImage);

// 1 to many event handling

// add the drag event handling to the puzzle pieces
puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

// add the dragover AND the drop event handling to the drop zones
dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));

// add the drop event handling
dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));

resetBtn.addEventListener("click",reset);