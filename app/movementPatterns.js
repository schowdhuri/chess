const pawn = (pos, initPosition) => {
    const firstMove = pos[0]==initPosition[0] && pos[1]==initPosition[1];
    if(initPosition[0]==1) { // white
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
    } else { // black
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
    }
};

const rook = (pos) => {
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

const knight = pos => {
    const r= pos[0];
    const c = pos[1];
    const possibleMoves = [
        [ r+2, c+1 ],
        [ r+1, c+2 ],
        [ r-1, c+2 ],
        [ r-2, c+1 ],
        [ r-2, c-1 ],
        [ r-1, c-2 ],
        [ r+1, c-2 ],
        [ r+2, c-1 ]
    ];
    return possibleMoves.filter(p =>
        p[0]>=0 && p[0]<=7 && p[1]>=0 && p[1]<=7);
};

const bishop = pos => {
    let r = pos[0] + 1;
    let c = pos[1] + 1;
    const possibleMoves = [];
    while(r<=7 && c<=7)
        possibleMoves.push([ r++, c++ ]);
    r = pos[0] - 1;
    c = pos[1] + 1;
    while(r>=0 && c<=7)
        possibleMoves.push([ r--, c++ ]);
    r = pos[0] - 1;
    c = pos[1] - 1;
    while(r>=0 && c>=0)
        possibleMoves.push([ r--, c-- ]);
    r = pos[0] + 1;
    c = pos[1] - 1;
    while(r<=7 && c>=0)
        possibleMoves.push([ r++, c-- ]);
    return possibleMoves;
};

const queen = pos => {
    return [
        ...rook(pos),
        ...bishop(pos)
    ];
};

const king = pos => {
    const r= pos[0];
    const c = pos[1];
    const possibleMoves = [
        [ r+1, c ],
        [ r+1, c+1 ],
        [ r, c+1 ],
        [ r-1, c+1 ],
        [ r-1, c ],
        [ r-1, c-1 ],
        [ r, c-1 ],
        [ r+1, c-1 ]
    ];
    return possibleMoves.filter(p =>
        p[0]>=0 && p[0]<=7 && p[1]>=0 && p[1]<=7);
};

const patterns = {
    "PAWN": pawn,
    "ROOK": rook,
    "KNIGHT": knight,
    "BISHOP": bishop,
    "QUEEN": queen,
    "KING": king
};

export default patterns;
