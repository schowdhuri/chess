class BoardBlock {
    constructor(b) {
        this.object = b.object;
        this.color = b.color;
        this.position = b.position
        this.isOccupied = false;
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
    	this.piece = piece;
    	this.isOccupied = true;
    }
}

export default BoardBlock;
