const pawn = (piece, board) => {
    const pos = piece.position;
    const initPosition = piece.initPosition;
    const firstMove = pos[0]==initPosition[0] && pos[1]==initPosition[1];
    let possibleMoves;
    const isWhite = initPosition[0]==1;
    if(isWhite) {
        if(firstMove) {
            possibleMoves = [
                [pos[0] + 1, pos[1]],
                [pos[0] + 2, pos[1]]
            ];
        } else {
            possibleMoves = [
                [pos[0] + 1, pos[1]]
            ];
        }
    } else { // black
        if(firstMove) {
            possibleMoves = [
                [pos[0] - 1, pos[1]],
                [pos[0] - 2, pos[1]]
            ];
        } else {
            possibleMoves = [
                [pos[0] - 1, pos[1]]
            ];
        }
    }
    
    const curPlayer = board.getBlock(pos).piece.player;
    if(board.getBlock(possibleMoves[0]).piece)
        possibleMoves = [];
    if(possibleMoves[1] && board.getBlock(possibleMoves[1]).piece)
        possibleMoves = possibleMoves.slice(0, 1);
    // capture
    if(isWhite) {
        if(pos[0] < 7 && pos[1] > 0) {
            // left diagonal
            const diagonal = board.getBlock(pos[0] + 1, pos[1] - 1);
            if(diagonal) {
                const diagonalPiece = diagonal.piece;
                if(diagonalPiece && diagonalPiece.player!=curPlayer)
                    possibleMoves.push([
                        diagonalPiece.getPos().row,
                        diagonalPiece.getPos().col,
                        { capture: true }
                    ]);
            }
        }
        if(pos[0] < 7 && pos[1] < 7) {
            // right diagonal
            const diagonal = board.getBlock(pos[0] + 1, pos[1] + 1);
            if(diagonal) {
                const diagonalPiece = diagonal.piece;
                if(diagonalPiece && diagonalPiece.player!=curPlayer)
                    possibleMoves.push([
                        diagonalPiece.getPos().row,
                        diagonalPiece.getPos().col,
                        { capture: true }
                    ]);
            }
        }
    } else {
        if(pos[0] > 0 && pos[1] > 0) {
            // left diagonal
            const diagonal = board.getBlock(pos[0] - 1, pos[1] - 1);
            if(diagonal) {
                const diagonalPiece = diagonal.piece;
                if(diagonalPiece && diagonalPiece.player!=curPlayer)
                    possibleMoves.push([
                        diagonalPiece.getPos().row,
                        diagonalPiece.getPos().col,
                        { capture: true }
                    ]);
            }
        }
        if(pos[0] > 0 && pos[1] < 7) {
            // right diagonal
            const diagonal = board.getBlock(pos[0] - 1, pos[1] + 1);
            if(diagonal) {
                const diagonalPiece = diagonal.piece;
                if(diagonalPiece && diagonalPiece.player!=curPlayer)
                    possibleMoves.push([
                        diagonalPiece.getPos().row,
                        diagonalPiece.getPos().col,
                        { capture: true }
                    ]);
            }
        }        
    }
    return possibleMoves;
};

const rook = (piece, board) => {
    const pos = piece.position;
    const curPlayer = board.getBlock(pos).piece.player;
    let r = pos[0] + 1;
    let c = pos[1];
    let pieceOnDestination;
    const possibleMoves = [];
    while(r<=7) {
        pieceOnDestination = board.getBlock(r, c).piece;
        if(pieceOnDestination) {
            if(pieceOnDestination.player==curPlayer) {
                break;
            } else {
                possibleMoves.push([
                    r,
                    c,
                    { capture: true }
                ]);
                break;
            }
        } else {
            possibleMoves.push([ r++, c ]);
        }
    }
    r = pos[0];
    c = pos[1] + 1;
    while(c<=7) {
        pieceOnDestination = board.getBlock(r, c).piece;
        if(pieceOnDestination) {
            if(pieceOnDestination.player==curPlayer) {
                break;
            } else {
                possibleMoves.push([
                    r,
                    c,
                    { capture: true }
                ]);
                break;
            }
        } else {
            possibleMoves.push([ r, c++ ]);
        }
    }
    r = pos[0] - 1;
    c = pos[1];
    while(r>=0) {
        pieceOnDestination = board.getBlock(r, c).piece;
        if(pieceOnDestination) {
            if(pieceOnDestination.player==curPlayer) {
                break;
            } else {
                possibleMoves.push([
                    r,
                    c,
                    { capture: true }
                ]);
                break;
            }
        } else {
            possibleMoves.push([ r--, c ]);
        }
    }
    r = pos[0];
    c = pos[1] - 1;
    while(c>=0) {
        pieceOnDestination = board.getBlock(r, c).piece;
        if(pieceOnDestination) {
            if(pieceOnDestination.player==curPlayer) {
                break;
            } else {
                possibleMoves.push([
                    r,
                    c,
                    { capture: true }
                ]);
                break;
            }
        } else {
            possibleMoves.push([ r, c-- ]);
        }
    }
    return possibleMoves;
};

const knight = (piece, board) => {
    const pos = piece.position;
    const r= pos[0];
    const c = pos[1];
    let possibleMoves = [
        [ r+2, c+1 ],
        [ r+1, c+2 ],
        [ r-1, c+2 ],
        [ r-2, c+1 ],
        [ r-2, c-1 ],
        [ r-1, c-2 ],
        [ r+1, c-2 ],
        [ r+2, c-1 ]
    ];
    possibleMoves = possibleMoves.filter(p =>
        p[0]>=0 && p[0]<=7 && p[1]>=0 && p[1]<=7);

    const curPlayer = board.getBlock(pos).piece.player;
    const filteredMoves = [];
    possibleMoves.forEach(p => {
        const pieceOnDestination = board.getBlock(p).piece;
        if(!pieceOnDestination)
            filteredMoves.push(p);
        else if(pieceOnDestination.player==curPlayer)
            return;
        else
            filteredMoves.push([
                ...p,
                { capture: true }
            ]);
    });
    return filteredMoves;
};

const bishop = (piece, board) => {
    const pos = piece.position;
    const curPlayer = board.getBlock(pos).piece.player;
    let r = pos[0] + 1;
    let c = pos[1] + 1;
    let pieceOnDestination;
    const possibleMoves = [];
    while(r<=7 && c<=7) {
        pieceOnDestination = board.getBlock(r, c).piece;
        if(pieceOnDestination) {
            if(pieceOnDestination.player==curPlayer) {
                break;
            } else {
                possibleMoves.push([
                    r,
                    c,
                    { capture: true }
                ]);
                break;
            }
        } else {
            possibleMoves.push([ r++, c++ ]);
        }
    }
    r = pos[0] - 1;
    c = pos[1] + 1;
    while(r>=0 && c<=7) {
        pieceOnDestination = board.getBlock(r, c).piece;
        if(pieceOnDestination) {
            if(pieceOnDestination.player==curPlayer) {
                break;
            } else {
                possibleMoves.push([
                    r,
                    c,
                    { capture: true }
                ]);
                break;
            }
        } else {
            possibleMoves.push([ r--, c++ ]);
        }
    }
    r = pos[0] - 1;
    c = pos[1] - 1;
    while(r>=0 && c>=0) {
        pieceOnDestination = board.getBlock(r, c).piece;
        if(pieceOnDestination) {
            if(pieceOnDestination.player==curPlayer) {
                break;
            } else {
                possibleMoves.push([
                    r,
                    c,
                    { capture: true }
                ]);
                break;
            }
        } else {
            possibleMoves.push([ r--, c-- ]);
        }
    }
    r = pos[0] + 1;
    c = pos[1] - 1;
    while(r<=7 && c>=0) {
        pieceOnDestination = board.getBlock(r, c).piece;
        if(pieceOnDestination) {
            if(pieceOnDestination.player==curPlayer) {
                break;
            } else {
                possibleMoves.push([
                    r,
                    c,
                    { capture: true }
                ]);
                break;
            }
        } else {
            possibleMoves.push([ r++, c-- ]);
        }
    }
    return possibleMoves;
};

const queen = (piece, board) => {
    return [
        ...rook(piece, board),
        ...bishop(piece, board)
    ];
};

const king = (piece, board) => {
    const pos = piece.position;
    const r= pos[0];
    const c = pos[1];
    let possibleMoves = [
        [ r+1, c ],
        [ r+1, c+1 ],
        [ r, c+1 ],
        [ r-1, c+1 ],
        [ r-1, c ],
        [ r-1, c-1 ],
        [ r, c-1 ],
        [ r+1, c-1 ]
    ];
    possibleMoves = possibleMoves.filter(p =>
        p[0]>=0 && p[0]<=7 && p[1]>=0 && p[1]<=7);

    const curPlayer = board.getBlock(pos).piece.player;
    const filteredMoves = [];
    possibleMoves.forEach(p => {
        const pieceOnDestination = board.getBlock(p).piece;
        if(!pieceOnDestination)
            filteredMoves.push(p);
        else if(pieceOnDestination.player==curPlayer)
            return;
        else
            filteredMoves.push([
                ...p,
                { capture: true }
            ]);
    });
    return filteredMoves;
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
