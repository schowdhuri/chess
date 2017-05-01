import patterns from "./movementPatterns";

class Piece {
    constructor(p) {
        this.id = p.object.uuid;
        this.object = p.object;
        this.player = p.player;
        this.name = p.name;
        this.position = p.position;
        this.initPosition = this.position;
        this.movementPattern = patterns[this.name];
        
    }
    getPos() {
        return {
            row: this.position[0],
            col: this.position[1]
        };
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
    highlight(on=true) {
        if(on) {
            const color = this.player=="WHITE" ? 0x004400 : 0x009900;
            this.object.material.emissive.setHex(color);
        } else {
            this.object.material.emissive.setHex(0);
        }
    }
    getPossibleMoves() {
        if(this.movementPattern) {
            return this.movementPattern(this.position, this.initPosition);
        }
        return [];
    }
}

export default Piece;
