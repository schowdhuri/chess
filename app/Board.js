import { Raycaster, Vector3 } from "three";

import Block from "./BoardBlock";
import Piece from "./Piece";
import animate from "./animatePiece";

class Board {
    constructor(scaleFactor) {
        this._block = [];
        this._pieces = [];
        this.scaleFactor = scaleFactor;
    }
    add(x) {
        if(x instanceof Block) {
            this._block.push(x);
        } else if(x instanceof Piece) {
            const block = this.getBlock(x.getPos());
            this._pieces.push(x);
            block.setPiece(x);
        }
    }
    unhighlightAll() {
        this._pieces.forEach(p => p.highlight(false));
    }
    highlight(piece) {
        this.unhighlightAll();
        this._pieces.forEach(p => {
            if(p.id === piece.id) {
                p.highlight(true);
            }
        });
    }
    findPieceUnderMouse(mousePos, camera) {
        const raycaster = new Raycaster();
        raycaster.setFromCamera(mousePos, camera);
        const intersected = raycaster.intersectObjects(this._pieces.map(p => p.object));
        if(intersected.length) {
            return this._pieces.find(p => p.id===intersected[0].object.uuid && !p.isCaptured);
        }
    }
    findBlockUnderMouse(mousePos, camera) {
        const raycaster = new Raycaster();
        raycaster.setFromCamera(mousePos, camera);
        const intersected = raycaster.intersectObjects(this._block.map(b => b.object));
        if(intersected.length) {
            const blockUnderMouse = this._block.find(b => b.id===intersected[0].object.uuid);
            return blockUnderMouse;
        }
    }
    getBlock() {
        const args = Array.prototype.slice.call(arguments);
        return this._block.find(b => b.isAt.apply(b, args));
    }
    getPiece(row, col) {
        return this._pieces.find(p => p.isAt({ row, col }));
    }
    unhighlightAllBlocks() {
        this._block.forEach(b => b.highlight(false));
    }
    markPossibleMoves(piece) {
        const possibleMoves = piece.getPossibleMoves(this);
        possibleMoves
            .filter(p => {
                return !this.getBlock(p).piece;
            })
            .forEach(p => {
                this.getBlock(p).highlight();
            });
    }
    showPossibleMoves(piece) {
        this.unhighlightAllBlocks();
        const possibleMoves = piece.getPossibleMoves(this);
        possibleMoves.forEach(p => {
            this.getBlock(p).highlight(true, p[2] && p[2].capture ? 2 : 1);
        });
    }
    isValidMove({ piece, block }, toBlock) {
        const possibleMoves = piece.getPossibleMoves(this);
        const dest = toBlock.getPos();
        return Boolean(possibleMoves.find(p => p[0]==dest.row && p[1]==dest.col));
    }
    move({ piece, block }, toBlock) {
        const rowDelta = toBlock.getPos().row - block.getPos().row;
        const colDelta = toBlock.getPos().col - block.getPos().col;
        
        const dest = [
            piece.object.position.x + colDelta * 2 * this.scaleFactor,
            piece.object.position.y,
            piece.object.position.z - rowDelta * 2 * this.scaleFactor
        ];
        return new Promise((fulfill, reject) => {
            console.log("MOVING: ", piece.object.position, " TO: ", dest);
            animate(piece, dest).then(() => {
                piece.setPos(toBlock.getPos());
                block.setPiece(null);
                toBlock.setPiece(piece);
                console.log("MOVED: ", piece.object.position);
                fulfill();
            });
            if(toBlock.piece && toBlock.piece.player != piece.player) {
                // capture
                toBlock.piece.isCaptured = true;
                if(piece.player=="WHITE") {
                    toBlock.piece.object.position.set(
                        -Math.floor(Math.random() * 10) - 12,
                        0,
                        Math.floor(Math.random() * 5) + 5
                    );
                } else {
                    toBlock.piece.object.position.set(
                        -Math.floor(Math.random() * 10) - 12,
                        0,
                        -(Math.floor(Math.random() * 5) + 5)
                    );
                }
            }            
        });
    }
}

export default Board;
