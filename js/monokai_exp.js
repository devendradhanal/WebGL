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

    cubes = [];
    colors = [];
    colors[-4] = '#ffffff';
    colors[-3] = '#bcbdc1';
    colors[-2] = '#070707';
    colors[-1] = '#303032';
    colors[0] = '#818286';
    colors[1] = '#83806d';
    colors[2] = '#817ea9';
    colors[3] = '#4b8eab';




    for (var i = -4; i < 4; i++) {
        material = new THREE.MeshPhongMaterial({
            ambient: '#FFFFFF',
            color: colors[i],
            specular: '#EEEEEE',
            shininess: 30
            /*,
        shading: THREE.FlatShading*/
        });
        cubes[i] = new THREE.Mesh(geometry, material);
        cubes[i].position.x = i * 30;
        cubes[i].rotation.x = Math.PI / 5;
        cubes[i].rotation.y = Math.PI / 5;
        scene.add(cubes[i]);
    };

    /*cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;
    scene.add(cube);*/

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
    // this.cube_position_x = 0;
    // this.cube_position_y = 0;
    // this.cube_position_z = 0;

    this.pointLight_position_x = 10;
    this.pointLight_position_y = 50;
    this.pointLight_position_z = 500;
}


ctrl = new controller();

gui = new dat.GUI();

gui.add(ctrl, 'rotationSpeed', 0.01, 0.5).step(0.0001);
gui.add(ctrl, 'pointLight_position_x', 10, 1000);
gui.add(ctrl, 'pointLight_position_y', 10, 1000);
gui.add(ctrl, 'pointLight_position_z', 10, 1000);
// gui.add(ctrl, 'addCube');
// gui.add(ctrl, 'cube_position_x', -500, 500);
// gui.add(ctrl, 'cube_position_y', -500, 500);
// gui.add(ctrl, 'cube_position_z', -500, 500);

function run() {
    requestAnimationFrame(run);
    for (var i = -4; i < 4; i++) {
        cubes[i].rotation.y += ctrl.rotationSpeed;
        // cubes[i].position.x = ctrl.cube_position_x;
        // cubes[i].position.y = ctrl.cube_position_y;
        // cubes[i].position.z = ctrl.cube_position_z;
    };

    pointLight.position.x = ctrl.pointLight_position_x;
    pointLight.position.y = ctrl.pointLight_position_y;
    pointLight.position.z = ctrl.pointLight_position_z;

    renderer.render(scene, camera);
}
