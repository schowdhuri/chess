import setup from "./setup";
import loadModels from "./loadModels";
import setupEvents from "./interaction";

const {
    scene,
    scaleFactor,
    renderer,
    camera
} = setup();

const { pieces } = loadModels(scene, scaleFactor);

const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};
render();

setupEvents(pieces, camera);
