import { Raycaster } from "three";

class Pieces {
    constructor() {
        this._pieces = [];
    }
    add(p) {
        this._pieces.push({
            object: p.object,
            player: p.player,
            name: p.name
        });
    }
    unhighlightAll() {
        this._pieces.forEach(p => p.object.material.emissive.setHex(0x000000));
    }
    highlight(piece) {
        this.unhighlightAll();
        this._pieces.forEach(p => {
            if(p.object.uuid === piece.object.uuid) {
                const color = piece.player=="WHITE" ? 0x004400 : 0x009900;
                p.object.material.emissive.setHex(color);
            }
        });
    }
    findPieceUnderMouse(mousePos, camera) {
        const raycaster = new Raycaster();
        raycaster.setFromCamera(mousePos, camera);
        const intersected = raycaster.intersectObjects(this._pieces.map(p => p.object));
        if(intersected.length) {
            const pieceUnderMouse = this._pieces.find(p => p.object.uuid===intersected[0].object.uuid);
            return pieceUnderMouse;
        }
    };
}

export default Pieces;
