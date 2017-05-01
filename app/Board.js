import { Raycaster } from "three";

import Block from "./BoardBlock";
import Piece from "./Piece";

class Board {
    constructor() {
        this._block = [];
        this._pieces = [];
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
            const pieceUnderMouse = this._pieces.find(p => p.id===intersected[0].object.uuid);
            return pieceUnderMouse;
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
    showPossibleMoves(piece) {
        this.unhighlightAllBlocks();
        const possibleMoves = piece.getPossibleMoves();
        possibleMoves.forEach(pos => {
            this.getBlock(pos).highlight();
        });
    }
    move({ piece, block }, toBlock) {
        const toX = toBlock.object.position.x;
        const toY = toBlock.object.position.y;
        const toZ = toBlock.object.position.z;
        block.setPiece(null);
        return new Promise((fulfill, reject) => {
            piece.object.position.set(toX, toY, toZ);
            toBlock.setPiece(piece);
            // block.getPos().row
            // block.getPos().col
            fulfill();
        });
    }
}

export default Board;
