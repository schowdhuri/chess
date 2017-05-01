import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    PCFSoftShadowMap,
    AmbientLight,
    PointLight,

    Vector2,
    Vector3,
    MOUSE,
    Quaternion,
    Spherical,
    OrthographicCamera,
    EventDispatcher

} from "three";

import OrbitControlsFactory from "three-orbit-controls";

const OrbitControls = OrbitControlsFactory({
    Vector2,
    Vector3,
    MOUSE,
    Quaternion,
    Spherical,
    PerspectiveCamera,
    OrthographicCamera,
    EventDispatcher 
});

const setup = (container) => {
    const scaleFactor = window.innerWidth < window.innerHeight
        ? window.innerWidth / 1330
        : 1;

    const scene = new Scene();

    // Setup the camera
    const camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 14 + 8 * scaleFactor;
    camera.position.y = 8;

    const orbitControl = new OrbitControls(camera);

    // Setup the renderer
    const renderer = new WebGLRenderer({ alpha: true });
    renderer.setClearColor(0xb6c3c3, 1);
    renderer.setSize(window.innerWidth, window.innerHeight-5);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const ambientLight = new AmbientLight(0x808081, 1.5);
    scene.add(ambientLight);

    const light1 = new PointLight(0xcccccc, 0.8);
    light1.position.set(0, 15, 0);
    light1.decay = 2;
    light1.castShadow = true;
    light1.shadow.mapSize.width = 2048;
    light1.shadow.mapSize.height = 2048;
    scene.add(light1);

    return {
        scene,
        scaleFactor,
        renderer,
        camera
    };
};

export default setup;
