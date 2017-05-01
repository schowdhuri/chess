import setup from "./setup";
import loadModels from "./loadModels";
import setupEvents from "./interaction";

const {
    scene,
    scaleFactor,
    renderer,
    camera
} = setup(document.getElementById("container"));

const { board } = loadModels(scene, scaleFactor);

const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};
render();

window.board = board;

setupEvents(board, camera);
