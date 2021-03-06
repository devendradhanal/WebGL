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
        shininess: 30
        /*,
        shading: THREE.FlatShading*/
    });
    cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;
    scene.add(cube);

    // create a point light
    pointLight = new THREE.PointLight(0xFFFFFF);

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
    this.cube_position_x = 0;
    this.cube_position_y = 0;
    this.cube_position_z = 0;

    this.pointLight_position_x = 10;
    this.pointLight_position_y = 50;
    this.pointLight_position_z = 500;
    this.addCube = function() {
        console.log('Ka boom!!!');
        geometry = new THREE.CubeGeometry(20, 20, 20);
        /*material = new THREE.MeshBasicMaterial({
        color: '#A6E22E'
    });*/

        material = new THREE.MeshPhongMaterial({
            ambient: '#FFFFFF',
            color: '#66D9EF',
            specular: '#EEEEEE',
            shininess: 30
            /*,
        shading: THREE.FlatShading*/
        });
        cube_1 = new THREE.Mesh(geometry, material);
        cube_1.rotation.x = Math.PI / 5;
        cube_1.rotation.y = Math.PI / 5;
/*        cube_1.position.x = 10;
        cube_1.position.y = 50;
        cube_1.position.z = 100;*/
        scene.add(cube_1);
        run();
    }
}


ctrl = new controller();

gui = new dat.GUI();

gui.add(ctrl, 'rotationSpeed', 0.01, 0.5).step(0.0001);
gui.add(ctrl, 'pointLight_position_x', 10, 1000);
gui.add(ctrl, 'pointLight_position_y', 10, 1000);
gui.add(ctrl, 'pointLight_position_z', 10, 1000);
gui.add(ctrl, 'addCube');
gui.add(ctrl, 'cube_position_x', -500, 500);
gui.add(ctrl, 'cube_position_y', -500, 500);
gui.add(ctrl, 'cube_position_z', -500, 500);

function run() {
    requestAnimationFrame(run);
    cube.rotation.y += ctrl.rotationSpeed;
    pointLight.position.x = ctrl.pointLight_position_x;
    pointLight.position.y = ctrl.pointLight_position_y;
    pointLight.position.z = ctrl.pointLight_position_z;
    cube.position.x = ctrl.cube_position_x;
    cube.position.y = ctrl.cube_position_y;
    cube.position.z = ctrl.cube_position_z;
    renderer.render(scene, camera);
}
