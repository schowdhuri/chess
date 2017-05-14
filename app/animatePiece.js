const TOTAL_TIME = 600; // ms

const findCoeftA = (x1, y1, x2, y2, x3, y3) =>
    (((y2-y3)/(x2-x3)) - ((y1-y2)/(x1-x2))) / (x3-x1);

const findCoeftB = (x1, y1, x2, y2, a) => {
    return (y1-y2)/(x1-x2) - a*(x1+x2);
}

const findCoeftC = (x1, y1, a, b) =>
    y1 - a*x1*x1 - b*x1;

const findRoots = (a, b, c) =>
    [
        (-b + Math.sqrt(b*b - 4*a*c)) / (2*a),
        (-b - Math.sqrt(b*b - 4*a*c)) / (2*a)
    ];

const findY = (a, b, c, x) =>
    a * x * x + b * x + c;

const animatePiece = (piece, dest) => {
    const startTime = (new Date()).getTime();
    const x1 = piece.object.position.x;
    const y1 = piece.object.position.y;
    const z1 = piece.object.position.z;
    
    const x3 = dest[0];
    const y3 = dest[1];
    const z3 = dest[2];

    const deltaX = x3-x1;
    const deltaZ = z3-z1;
    const x2 = x1 + deltaX/2;
    const y2 = Math.abs(deltaX) > Math.abs(deltaZ)
                ? (Math.abs(deltaX) > 4 ? 4 : Math.abs(deltaX))
                : (Math.abs(deltaZ) > 4 ? 4 : Math.abs(deltaZ));
    const z2 = z1 + deltaZ/2;

    const a1 = findCoeftA(x1, y1, x2, y2, x3, y3);
    const b1 = findCoeftB(x1, y1, x2, y2, a1);
    const c1 = findCoeftC(x1, y1, a1, b1);

    const a2 = findCoeftA(z1, y1, z2, y2, z3, y3);
    const b2 = findCoeftB(z1, y1, z2, y2, a2);
    const c2 = findCoeftC(z1, y1, a2, b2);

    // console.log("eqn 1 coefts: ", a1.toFixed(4), b1.toFixed(4), c1.toFixed(4));
    // console.log("eqn 2 coefts: ", a2.toFixed(4), b2.toFixed(4), c2.toFixed(4));

    return new Promise((fulfill, reject) => {
        const incrementalAnim = () => {
            const dt = (new Date()).getTime() - startTime;
            const dx = dt * deltaX / TOTAL_TIME;
            const dz = dt * deltaZ / TOTAL_TIME;
            let y;
            if(!isNaN(a1) && !isNaN(b1) && !isNaN(c1)) {
                y = findY(a1, b1, c1, x1 + dx);
            } else {
                y = findY(a2, b2, c2, z1 + dz);
            }
            // console.log(x1+dx, y, z1 + dz);
            y = Math.abs(y);
            piece.object.position.set(x1 + dx, y, z1 + dz);
            if(dt < TOTAL_TIME) {
                requestAnimationFrame(incrementalAnim);
            } else {
                piece.object.position.set(...dest);
                fulfill();
            }
        };
        incrementalAnim();
    });
};

export default animatePiece;
