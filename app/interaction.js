import { Vector2 } from "three";
import throttle from "lodash/throttle";

const setupInteraction = (board, camera) => {
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
            const clickedPiece = board.findPieceUnderMouse(mousePos, camera);
        }
    }, false);

    document.addEventListener("mousemove", throttle(ev => {
        if(mousePressed || dragging)
            return;
        const mousePos = new Vector2();
        mousePos.x = ev.clientX / window.innerWidth * 2 -1;
        mousePos.y = -(ev.clientY / window.innerHeight * 2 -1);
        const piece = board.findPieceUnderMouse(mousePos, camera);
        if(piece) {
            document.body.style.cursor = "pointer";
            board.highlight(piece);
            board.showPossibleMoves(piece);
        } else if(document.body.style.cursor=="pointer") {
            document.body.style.cursor = "default";
            board.unhighlightAll();
            board.unhighlightAllBlocks();
        }
    }, 300));
};

export default setupInteraction;
