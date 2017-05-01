const TOTAL_TIME = 300; // ms

// const distance = (piece, dest) => {
//     return Math.sqrt(
//         Math.pow(piece.object.position.x - dest[0], 2) +
//         Math.pow(piece.object.position.z - dest[2], 2)
//     );
// };

const animatePiece = (piece, dest) => {
    const startTime = (new Date()).getTime();
    const x = piece.object.position.x;
    const y = piece.object.position.y;
    const z = piece.object.position.z;
    const deltaX = dest[0] - x;
    const deltaZ = dest[2] - z;
    return new Promise((fulfill, reject) => {
        const incrementalAnim = () => {
            const dt = (new Date()).getTime() - startTime;
            const dx = deltaX * dt / TOTAL_TIME;
            const dz = deltaZ * dt / TOTAL_TIME;
            piece.object.position.set(x + dx, y, z + dz);
            if(dt < TOTAL_TIME)
                requestAnimationFrame(incrementalAnim);
            else
                fulfill();
        };
        incrementalAnim();
    });
};

// const animatePiece = (piece, dest) => {
//     const startTime = (new Date()).getTime();
//     const { x, y, z } = piece.object.position;
//     const d = distance(piece, dest);
//     const h = d/2; // lets roll with this for now
//     const theta = Math.atan(4*h/d);
//     const g = 10;
//     const v0 = g * TOTAL_TIME / (2 * Math.sin(theta));
//     return new Promise((fulfill, reject) => {
//         const incrementalAnim = () => {
//             const dt = (new Date()).getTime() - startTime;
//             const dx = v0 * Math.cos(theta);
//             const dy = v0 * Math.sin(theta) - 0.5 * g * dt * dt;
            
//             piece.object.position.set(x + dx, y + dy, z + dz);
//             if(dt < TOTAL_TIME)
//                 requestAnimationFrame(incrementalAnim);
//             else
//                 fulfill();
//         };
//         incrementalAnim();
//     });
// };

export default animatePiece;
