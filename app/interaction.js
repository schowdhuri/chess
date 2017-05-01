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
                if(whiteTurn && piece.player=="WHITE" || !whiteTurn && piece.player=="BLACK") {
                    board.highlight(piece);
                    board.showPossibleMoves(piece);
                    selected = {
                        block: board.getBlock(piece.getPos()),
                        piece
                    };
                    moveMode = true;
                    console.log("movemode ON")
                    document.body.style.cursor = "default";
                }
            } else {
                // select block
                const block = board.findBlockUnderMouse(mousePos, camera);
                // TODO validity checks
                console.log("MOVING ", selected, " to ", block);
                board.move(selected, block).then(() => {
                    selected = null;
                    whiteTurn = !whiteTurn;
                    moveMode = false;
                    console.log("movemode OFF")
                    board.unhighlightAllBlocks();
                });
                document.body.style.cursor = "default";

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
                document.body.style.cursor = "pointer";
            } else if(document.body.style.cursor=="pointer") {
                document.body.style.cursor = "default";
            }
        }
    }, 300));
};

export default setupInteraction;
