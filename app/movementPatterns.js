export const pawnWhite = (pos, initPosition) => {
    const firstMove = pos[0]==initPosition[0] && pos[1]==initPosition[1];
    if(firstMove) {
        return [
            [pos[0] + 1, pos[1]],
            [pos[0] + 2, pos[1]]
        ];
    } else {
        return [
            [pos[0] + 1, pos[1]]
        ];
    }
};

export const pawnBlack = (pos, initPosition) => {
    const firstMove = pos[0]==initPosition[0] && pos[1]==initPosition[1];
    if(firstMove) {
        return [
            [pos[0] - 1, pos[1]],
            [pos[0] - 2, pos[1]]
        ];
    } else {
        return [
            [pos[0] - 1, pos[1]]
        ];
    }
};

export const rook = (pos) => {
    const possibleMoves = [];
    for(let r=0; r<=7; r++) {
        if(r!=pos[0])
            possibleMoves.push([ r, pos[1] ]);
    }
    for(let c=0; c<=7; c++) {
        if(c!=pos[1])
            possibleMoves.push([ pos[0], c ]);
    }
    return possibleMoves;
};

const patterns = {
    "PAWN": {
        "WHITE": pawnWhite,
        "BLACK": pawnBlack
    },
    "ROOK": rook
};

export default patterns;
