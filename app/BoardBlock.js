class Block {
    constructor(b) {
        this.id = b.object.uuid;
        this.object = b.object;
        this.color = b.color;
        this.position = b.position
        this.piece = null;
    }
    getPos() {
        return {
            row: this.position[0],
            col: this.position[1]
        }
    }
    isAt() {
        const args = Array.prototype.slice.call(arguments);
        if(args[0] instanceof Array) {
            return this.position[0]==args[0][0] && this.position[1]==args[0][1];
        } else if(args[0] && args[0].row!==undefined && args[0].col!==undefined) {
            return this.position[0]==args[0].row && this.position[1]==args[0].col;
        } else {
            return this.position[0]==args[0] && this.position[1]==args[1];
        }
    }
    setPiece(piece) {
        if(piece) {
            this.piece = piece;
        } else {
            this.piece = null;
        }
    }
    highlight(on=true) {
        if(on) {
            const hcolor = this.color=="WHITE" ? 0x004400 : 0x009900;
            this.object.material.emissive.setHex(hcolor);
        } else {
            this.object.material.emissive.setHex(0);
        }
    }
}

export default Block;
