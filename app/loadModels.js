import {
    JSONLoader,
    MeshFaceMaterial,
    Mesh
} from "three";

import Board from "./Board";
import BoardBlock from "./BoardBlock";
import Piece from "./Piece";

const loadModels = (scene, scaleFactor) => {
    const loader = new JSONLoader();

    // Start loading models
    const blackBoardMatLoaded = new Promise((fulfill, reject) => {
        loader.load( "models/boardBlack.json", (geo, mat) => {
            const material = new MeshFaceMaterial(mat);
            fulfill(material);
        });
    });

    const whiteBoardMatLoaded = new Promise((fulfill, reject) => {
        loader.load( "models/boardWhite.json", (geo, mat) => {
            const material = new MeshFaceMaterial(mat);
            fulfill(material);
        });
    });

    const blackMatLoaded = new Promise((fulfill, reject) => {
        loader.load( "models/blackCube.json", (geo, mat) => {
            const material = new MeshFaceMaterial(mat);
            fulfill(material);
        });
    });

    const whiteMatLoaded = new Promise((fulfill, reject) => {
        loader.load( "models/whiteCube.json", (geo, mat) => {
            const material = new MeshFaceMaterial(mat);
            fulfill(material);
        });
    });

    const matsLoaded = Promise.all([
        blackBoardMatLoaded,
        whiteBoardMatLoaded,
        whiteMatLoaded,
        blackMatLoaded
    ]);

    const board = new Board(scaleFactor);
    window.board = board;

    matsLoaded.then(materials => {
        const boardBlackMat = materials[0][0];
        const boardWhiteMat = materials[1][0];
        
        return new Promise((fulfill, reject) => {
            loader.load( "models/boardBlock.json", (geo, mat) => {
                let color;
                for(let i=1; i<=8; i++) {
                    color = color=="WHITE" ? "BLACK" : "WHITE";
                    for(let j=8; j>=1; j--) {
                        const model = new Mesh(geo, color=="WHITE" ? boardWhiteMat.clone() : boardBlackMat.clone());
                        model.position.set(-7*scaleFactor + (j-1)*2*scaleFactor, 0, 7*scaleFactor - (i-1)*2*scaleFactor);
                        model.receiveShadow = true;
                        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
                        scene.add(model);
                        board.add(new BoardBlock({
                            object: model,
                            color: color,
                            position: [i-1, j-1]
                        }));
                        color = color=="WHITE" ? "BLACK" : "WHITE";
                    }
                }
                fulfill([ materials[2], materials[3] ]);
            });
        })
    }).then(materials => {
        const whiteMat = materials[0][0];
        const blackMat = materials[1][0];
    
        loader.load("models/pawn.json", (geo, mat) => {
            for(let i=1; i<=8; i++) {
                const pawn = new Mesh(geo, whiteMat.clone());
                pawn.position.set(-7*scaleFactor + (i-1) * 2.005*scaleFactor, 0, 5 * scaleFactor);
                pawn.castShadow = true;
                pawn.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(pawn);
                board.add(new Piece({
                    player: "WHITE",
                    name: "PAWN",
                    object: pawn,
                    position: [1, i-1]
                }));
            }
            for(let i=1; i<=8; i++) {
                const pawn = new Mesh(geo, blackMat.clone());
                pawn.position.set(-7*scaleFactor + (i-1) * 2.005*scaleFactor, 0, -5 * scaleFactor);
                pawn.castShadow = true;
                pawn.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(pawn);
                board.add(new Piece({
                    player: "BLACK",
                    name: "PAWN",
                    object: pawn,
                    position: [6, i-1]
                }));
            }
        });

        loader.load("models/rook.json", (geo, mat) => {
            for(let i=1; i<=2; i++) {
                const rook = new Mesh(geo, whiteMat.clone());
                rook.position.set(-7*scaleFactor + (i-1) * 14*scaleFactor, 0, 7 * scaleFactor);
                rook.castShadow = true;
                rook.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(rook);
                board.add(new Piece({
                    player: "WHITE",
                    name: "ROOK",
                    object: rook,
                    position: [0, (i-1)*7]
                }));
            }
            for(let i=1; i<=2; i++) {
                const rook = new Mesh(geo, blackMat.clone());
                rook.position.set(-7*scaleFactor + (i-1) * 14*scaleFactor, 0, -7 * scaleFactor);
                rook.castShadow = true;
                rook.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(rook);
                board.add(new Piece({
                    player: "BLACK",
                    name: "ROOK",
                    object: rook,
                    position: [7, (i-1)*7]
                }));
            }
        });

        loader.load("models/knight.json", (geo, mat) => {
            for(let i=1; i<=2; i++) {
                const knight = new Mesh(geo, whiteMat.clone());
                knight.position.set(-5*scaleFactor + (i-1) * 10*scaleFactor, 0, 7 * scaleFactor);
                knight.castShadow = true;
                knight.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(knight);
                board.add(new Piece({
                    player: "WHITE",
                    name: "KNIGHT",
                    object: knight,
                    position: [0, 1 + (i-1)*5]
                }));
            }
            for(let i=1; i<=2; i++) {
                const knight = new Mesh(geo, blackMat.clone());
                knight.position.set(-5*scaleFactor + (i-1) * 10*scaleFactor, 0, -7 * scaleFactor);
                knight.castShadow = true;
                knight.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(knight);
                board.add(new Piece({
                    player: "BLACK",
                    name: "KNIGHT",
                    object: knight,
                    position: [7, 1 + (i-1)*5]
                }));
            }
        });

        loader.load("models/bishop.json", (geo, mat) => {
            for(let i=1; i<=2; i++) {
                const bishop = new Mesh(geo, whiteMat.clone());
                bishop.position.set(-3*scaleFactor + (i-1) * 6*scaleFactor, 0, 7 * scaleFactor);
                bishop.castShadow = true;
                bishop.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(bishop);
                board.add(new Piece({
                    player: "WHITE",
                    name: "BISHOP",
                    object: bishop,
                    position: [0, 2 + (i-1)*3]
                }));
            }
            for(let i=1; i<=2; i++) {
                const bishop = new Mesh(geo, blackMat.clone());
                bishop.position.set(-3*scaleFactor + (i-1) * 6 * scaleFactor, 0, -7 * scaleFactor);
                bishop.castShadow = true;
                bishop.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(bishop);
                board.add(new Piece({
                    player: "BLACK",
                    name: "BISHOP",
                    object: bishop,
                    position: [7, 2 + (i-1)*3]
                }));
            }
        });

        loader.load("models/queen.json", (geo, mat) => {
            const queen = new Mesh(geo, whiteMat.clone());
            queen.position.set(-1*scaleFactor, 0, 7 * scaleFactor);
            queen.castShadow = true;
            queen.scale.set(scaleFactor, scaleFactor, scaleFactor);
            scene.add(queen);
            board.add(new Piece({
                player: "WHITE",
                name: "QUEEN",
                object: queen,
                position: [0, 3]
            }));
            
            const queen2 = new Mesh(geo, blackMat.clone());
            queen2.position.set(-1*scaleFactor, 0, -7 * scaleFactor);
            queen2.castShadow = true;
            queen2.scale.set(scaleFactor, scaleFactor, scaleFactor);
            scene.add(queen2);
            board.add(new Piece({
                player: "BLACK",
                name: "QUEEN",
                object: queen2,
                position: [7, 3]
            }));
        });

        loader.load("models/king.json", (geo, mat) => {
            const king = new Mesh(geo, whiteMat.clone());
            king.position.set(1*scaleFactor, 0, 7 * scaleFactor);
            king.castShadow = true;
            king.scale.set(scaleFactor, scaleFactor, scaleFactor);
            scene.add(king);
            board.add(new Piece({
                player: "WHITE",
                name: "KING",
                object: king,
                position: [0, 4]
            }));

            const king2 = new Mesh(geo, blackMat.clone());
            king2.position.set(1*scaleFactor, 0, -7 * scaleFactor);
            king2.castShadow = true;
            king2.scale.set(scaleFactor, scaleFactor, scaleFactor);
            scene.add(king2);
            board.add(new Piece({
                player: "BLACK",
                name: "KING",
                object: king2,
                position: [7, 4]
            }));
        });
    });
    return {
        board
    };
};

export default loadModels;
