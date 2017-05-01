import { Vector2 } from "three";
import throttle from "lodash/throttle";

const setupInteraction = (board, camera) => {
    let mouseDragTimer;
    let mousePressed = false;
    let dragging = false;

    let whiteTurn = true;
    let moveMode = false;
    let selected = null;

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
            if(!moveMode) {
                // select mode
                const piece = board.findPieceUnderMouse(mousePos, camera);
                if(piece && (whiteTurn && piece.player=="WHITE" || !whiteTurn && piece.player=="BLACK")) {
                    board.highlight(piece);
                    // board.markPossibleMoves(piece);
                    board.showPossibleMoves(piece);
                    selected = {
                        block: board.getBlock(piece.getPos()),
                        piece
                    };
                    moveMode = true;
                    console.log("movemode ON")
                    document.body.style.cursor = "default";
                    window.selected = selected;
                }
            } else {
                // select block
                const block = board.findBlockUnderMouse(mousePos, camera);
                if(block && board.isValidMove(selected, block)) {
                    board.move(selected, block).then(() => {
                        whiteTurn = !whiteTurn;
                        moveMode = false;
                        console.log("move complete; movemode OFF")
                        selected.piece.highlight(false);
                        board.unhighlightAllBlocks();
                        selected = null;
                    });
                    document.body.style.cursor = "default";
                }
            }
        }
    }, false);

    document.addEventListener("mousemove", throttle(ev => {
        if(mousePressed || dragging)
            return;
        const mousePos = new Vector2();
        mousePos.x = ev.clientX / window.innerWidth * 2 -1;
        mousePos.y = -(ev.clientY / window.innerHeight * 2 -1);
        if(!moveMode) {
            // select piece mode
            const piece = board.findPieceUnderMouse(mousePos, camera);
            if(piece) {
                document.body.style.cursor = "pointer";
            } else if(document.body.style.cursor=="pointer") {
                document.body.style.cursor = "default";
                // board.unhighlightAll();
                // board.unhighlightAllBlocks();
            }
        } else {
            const block = board.findBlockUnderMouse(mousePos, camera);
            if(block) {
                if(board.isValidMove(selected, block)) {
                    document.body.style.cursor = "pointer";
                } else {
                    document.body.style.cursor = "default";
                }
            } else {
                document.body.style.cursor = "default";
            }
        }
    }, 300));

    document.addEventListener("keyup", ev => {
        if(ev.keyCode===27) {
            board.unhighlightAll();
            board.unhighlightAllBlocks();
            moveMode = false;
            selected = null;
            document.body.style.cursor = "default";
            console.log("move canceled; movemode OFF");
        }
    }, false);
};

export default setupInteraction;
