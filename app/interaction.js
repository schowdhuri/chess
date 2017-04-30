import { Vector2 } from "three";
import throttle from "lodash/throttle";

const setupInteraction = (pieces, camera) => {
	let mouseDragTimer;
	let mousePressed = false;
	let dragging = false;

	document.addEventListener("mousedown", ev => {
	    mousePressed = true;
	    mouseDragTimer = setTimeout(() => {
	        if(mousePressed) {
	            dragging = true;
	        }
	    }, 150);
	}, false);

	document.addEventListener("mouseup", ev => {
	    mousePressed = false;
	    clearTimeout(mouseDragTimer);
	    if(dragging) {
	        dragging = false;
	    } else {
	        const mousePos = new Vector2();
	        mousePos.x = ev.clientX / window.innerWidth * 2 -1;
	        mousePos.y = -(ev.clientY / window.innerHeight * 2 -1);
	        const clickedPiece = pieces.findPieceUnderMouse(mousePos, camera);
	    }
	}, false);

	document.addEventListener("mousemove", throttle(ev => {
		if(mousePressed || dragging)
			return;
	    const mousePos = new Vector2();
	    mousePos.x = ev.clientX / window.innerWidth * 2 -1;
	    mousePos.y = -(ev.clientY / window.innerHeight * 2 -1);
	    const piece = pieces.findPieceUnderMouse(mousePos, camera);
	    if(piece) {
	        document.body.style.cursor = "pointer";
	        pieces.highlight(piece);
	    } else if(document.body.style.cursor=="pointer") {
	        document.body.style.cursor = "default";
	        pieces.unhighlightAll();
	    }
	}, 300));
};

export default setupInteraction;
