import {
    JSONLoader,
    MeshFaceMaterial,
    Mesh
} from "three";

import Pieces from "./Pieces";

const loadModels = (scene, scaleFactor) => {
    const loader = new JSONLoader();

    // Start loading models
    const block = [];
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

    const pieces = new Pieces();

    matsLoaded.then(materials => {
        const boardBlackMat = materials[0][0];
        const boardWhiteMat = materials[1][0];
        const whiteMat = materials[2][0];
        const blackMat = materials[3][0];
        
        loader.load( "models/boardBlock.json", (geo, mat) => {
            let color;
            for(let i=1; i<=8; i++) {
                block[i-1] = [];
                color = color=="WHITE" ? "BLACK" : "WHITE";
                for(let j=8; j>=1; j--) {
                    const model = new Mesh(geo, color=="WHITE" ? boardWhiteMat.clone() : boardBlackMat.clone());
                    model.position.set(-7*scaleFactor + (j-1)*2*scaleFactor, 0, 7*scaleFactor - (i-1)*2*scaleFactor);
                    model.receiveShadow = true;
                    model.scale.set(scaleFactor, scaleFactor, scaleFactor);
                    scene.add(model);
                    block[i-1][j-1] = {
                        object: model,
                        color: color
                    };
                    color = color=="WHITE" ? "BLACK" : "WHITE";
                }
            }
        });

        loader.load("models/pawn.json", (geo, mat) => {
            const movementPattern = () => {

            };
            for(let i=1; i<=8; i++) {
                const pawn = new Mesh(geo, whiteMat.clone());
                pawn.position.set((i-1) * 2.005*scaleFactor, 0, 0);
                pawn.castShadow = true;
                pawn.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(pawn);
                pieces.add({
                    player: "WHITE",
                    name: "PAWN",
                    object: pawn,
                    position: [1, i-1]
                });
            }
            for(let i=1; i<=8; i++) {
                const pawn = new Mesh(geo, blackMat.clone());
                pawn.position.set((i-1) * 2.005*scaleFactor, 0, -10 * scaleFactor);
                pawn.castShadow = true;
                pawn.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(pawn);
                pieces.add({
                    player: "BLACK",
                    name: "PAWN",
                    object: pawn,
                    position: [6, i]
                });
            }
        });

        loader.load("models/rook.json", (geo, mat) => {
            for(let i=1; i<=2; i++) {
                const rook = new Mesh(geo, whiteMat.clone());
                rook.position.set((i-1) * 14*scaleFactor, 0, 0);
                rook.castShadow = true;
                rook.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(rook);
                pieces.add({
                    player: "WHITE",
                    name: "ROOK",
                    object: rook,
                    position: [0, (i-1)*7]
                });
            }
            for(let i=1; i<=2; i++) {
                const rook = new Mesh(geo, blackMat.clone());
                rook.position.set((i-1) * 14*scaleFactor, 0, -14 * scaleFactor);
                rook.castShadow = true;
                rook.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(rook);
                pieces.add({
                    player: "BLACK",
                    name: "ROOK",
                    object: rook,
                    position: [7, (i-1)*7]
                });
            }
        });

        loader.load("models/knight.json", (geo, mat) => {
            for(let i=1; i<=2; i++) {
                const knight = new Mesh(geo, whiteMat.clone());
                knight.position.set((i-1) * 10*scaleFactor, 0, 0);
                knight.castShadow = true;
                knight.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(knight);
                pieces.add({
                    player: "WHITE",
                    name: "KNIGHT",
                    object: knight,
                    position: [0, 1 + (i-1)*5]
                });
            }
            for(let i=1; i<=2; i++) {
                const knight = new Mesh(geo, blackMat.clone());
                knight.position.set((i-1) * 10*scaleFactor, 0, -14 * scaleFactor);
                knight.castShadow = true;
                knight.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(knight);
                pieces.add({
                    player: "BLACK",
                    name: "KNIGHT",
                    object: knight,
                    position: [7, 1 + (i-1)*5]
                });
            }
        });

        loader.load("models/bishop.json", (geo, mat) => {
            for(let i=1; i<=2; i++) {
                const bishop = new Mesh(geo, whiteMat.clone());
                bishop.position.set((i-1) * 6*scaleFactor, 0, 0);
                bishop.castShadow = true;
                bishop.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(bishop);
                pieces.add({
                    player: "WHITE",
                    name: "BISHOP",
                    object: bishop,
                    position: [0, 2 + (i-1)*4]
                });
            }
            for(let i=1; i<=2; i++) {
                const bishop = new Mesh(geo, blackMat.clone());
                bishop.position.set((i-1) * 6 * scaleFactor, 0, -14 * scaleFactor);
                bishop.castShadow = true;
                bishop.scale.set(scaleFactor, scaleFactor, scaleFactor);
                scene.add(bishop);
                pieces.add({
                    player: "BLACK",
                    name: "BISHOP",
                    object: bishop,
                    position: [7, 2 + (i-1)*4]
                });
            }
        });

        loader.load("models/queen.json", (geo, mat) => {
            const queen = new Mesh(geo, whiteMat.clone());
            queen.position.set(0, 0, 0);
            queen.castShadow = true;
            queen.scale.set(scaleFactor, scaleFactor, scaleFactor);
            scene.add(queen);
            pieces.add({
                player: "WHITE",
                name: "QUEEN",
                object: queen,
                position: [0, 3]
            });
            
            const queen2 = new Mesh(geo, blackMat.clone());
            queen2.position.set(0, 0, -14 * scaleFactor);
            queen2.castShadow = true;
            queen2.scale.set(scaleFactor, scaleFactor, scaleFactor);
            scene.add(queen2);
            pieces.add({
                player: "BLACK",
                name: "QUEEN",
                object: queen2,
                position: [7, 3]
            });
        });

        loader.load("models/king.json", (geo, mat) => {
            const king = new Mesh(geo, whiteMat.clone());
            king.position.set(0, 0, 0);
            king.castShadow = true;
            king.scale.set(scaleFactor, scaleFactor, scaleFactor);
            scene.add(king);
            pieces.add({
                player: "WHITE",
                name: "KING",
                object: king,
                position: [0, 4]
            });

            const king2 = new Mesh(geo, blackMat.clone());
            king2.position.set(0, 0, -14 * scaleFactor);
            king2.castShadow = true;
            king2.scale.set(scaleFactor, scaleFactor, scaleFactor);
            scene.add(king2);
            pieces.add({
                player: "BLACK",
                name: "KING",
                object: king2,
                position: [7, 4]
            });
        });
        
    });
    return {
        pieces
    };
};

export default loadModels;
