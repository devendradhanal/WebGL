$(document).ready(function() {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color('#272822'), 1.0);
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 150;
    scene = new THREE.Scene();

    geometry = new THREE.CubeGeometry(20, 20, 20);
    /*material = new THREE.MeshBasicMaterial({
        color: '#A6E22E'
    });*/

    material = new THREE.MeshPhongMaterial({
        ambient: '#FFFFFF',
        color: '#A6E22E',
        specular: '#EEEEEE',
        shininess: 30/*,
        shading: THREE.FlatShading*/
    });
    cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;
    scene.add(cube);

    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 500;

    // add to the scene
    scene.add(pointLight);



    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);
    run();
});

controller = function() {
    this.rotationSpeed = 0.01;
}


ctrl = new controller();

gui = new dat.GUI();

gui.add(ctrl, 'rotationSpeed', 0.01, 0.5).step(0.0001);


function run() {
    requestAnimationFrame(run);
    cube.rotation.y += ctrl.rotationSpeed;
    renderer.render(scene, camera);
}
