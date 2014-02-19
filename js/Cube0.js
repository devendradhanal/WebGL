$(document).ready(function() {

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(new THREE.Color('#272822'), 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 50;
    scene = new THREE.Scene();

    $('body').append(renderer.domElement);
    // create a point light
    pointLight = new THREE.PointLight(0xFFFFFF);
    // pointLight.position.set(50, 50, 50);
    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 500;

    // add to the scene
    scene.add(pointLight);

    geometry = new THREE.CubeGeometry(20, 20, 20);
    material = new THREE.MeshPhongMaterial({
        ambient: '#FFFFFF',
        color: '#ffffff',
        specular: '#EEEEEE',
        shininess: 30,
        morphTargets: true,
        wireframe:true
        /*,
        shading: THREE.FlatShading*/
    });


    for (var i = 0; i < geometry.vertices.length; i++) {

        var vertices = [];

        for (var v = 0; v < geometry.vertices.length; v++) {

            vertices.push(geometry.vertices[v].clone());

            if (v === i) {

                vertices[vertices.length - 1].x *= 2;
                vertices[vertices.length - 1].y *= 2;
                vertices[vertices.length - 1].z *= 2;

            }

        }

        geometry.morphTargets.push({
            name: "target" + i,
            vertices: vertices
        });

    }


    cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;
    scene.add(cube);

    renderer.render(scene, camera);


    shearCubeController = function() {
        this.camera_pos_x = 0;
        this.camera_pos_y = 0;
        this.camera_pos_z = 50;

        this.Syx = 0.0000000001;
        this.Szx = 0.0000000001;
        this.Sxy = 0.0000000001;
        this.Szy = 0.0000000001;
        this.Sxz = 0.0000000001;
        this.Syz = 0.0000000001;

    }

    ctrlr = new shearCubeController();
    gui = new dat.GUI();


    gui.add(ctrlr, 'camera_pos_x', -500, 500).step(1);
    gui.add(ctrlr, 'camera_pos_y', -500, 500).step(1);
    gui.add(ctrlr, 'camera_pos_z', -500, 500).step(1);

    SyxCtrlr = gui.add(ctrlr, 'Syx', -2.00, 2.00).step(0.01);
    SzxCtrlr = gui.add(ctrlr, 'Szx', -2.00, 2.00).step(0.01);
    SxyCtrlr = gui.add(ctrlr, 'Sxy', -2.00, 2.00).step(0.01);
    SzyCtrlr = gui.add(ctrlr, 'Szy', -2.00, 2.00).step(0.01);
    SxzCtrlr = gui.add(ctrlr, 'Sxz', -2.00, 2.00).step(0.01);
    SyzCtrlr = gui.add(ctrlr, 'Syz', -2.00, 2.00).step(0.01);

    globalSyx = null;
    globalSzx = null;
    globalSxy = null;
    globalSzy = null;
    globalSxz = null;
    globalSyz = null;


    SyxCtrlr.onChange(function(value) {

        if (globalSyx !== value) {
            globalSyx = value;
            // normalizeCube();
            updateCube();
            console.log(value);
        } else {

            console.log("Old Value");
        }


    });
    SzxCtrlr.onChange(function(value) {

        if (globalSzx !== value) {
            globalSzx = value;
            // normalizeCube();
            updateCube();
            console.log(value);
        } else {

            console.log("Old Value");
        }


    });
    SxyCtrlr.onChange(function(value) {

        if (globalSxy !== value) {
            globalSxy = value;
            // normalizeCube();
            updateCube();
            console.log(value);
        } else {

            console.log("Old Value");
        }


    });
    SzyCtrlr.onChange(function(value) {

        if (globalSzy !== value) {
            globalSzy = value;
            // normalizeCube();
            updateCube();
            console.log(value);
        } else {

            console.log("Old Value");
        }


    });
    SxzCtrlr.onChange(function(value) {

        if (globalSxz !== value) {
            globalSxz = value;
            // normalizeCube();
            updateCube();
            console.log(value);
        } else {

            console.log("Old Value");
        }


    });
    SyzCtrlr.onChange(function(value) {

        if (globalSyz !== value) {
            globalSyz = value;
            // normalizeCube();
            updateCube();
            console.log(value);
        } else {

            console.log("Old Value");
        }


    });

    window.addEventListener('resize', onWindowResize, false);
    rendererLoop();

});

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function normalizeCube() {



    // console.log('normalizeCube');
    matrix = new THREE.Matrix4();

    matrix.set(1.00, 0.00, 0.00, 0.00,
        0.00, 1.00, 0.00, 0.00,
        0.00, 0.00, 1, 0.00,
        0.00, 0.00, 0.00, 1.00);

    // apply shear matrix to geometry                  
    cube.geometry.applyMatrix(matrix);
    cube.geometry.verticesNeedUpdate = true;

    // updateCube();
}


function updateCube() {
    scene.remove(cube);
    geometry = new THREE.CubeGeometry(20, 20, 20, 6, 6, 6);
    material = new THREE.MeshPhongMaterial({
        ambient: '#FFFFFF',
        color: '#ffffff',
        specular: '#EEEEEE',
        shininess: 30
        /*,
        shading: THREE.FlatShading*/
    });
    cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;
    scene.add(cube);
    console.log('updateCube');
    Syx = ctrlr.Syx.toFixed(2);
    Szx = ctrlr.Szx.toFixed(2);
    Sxy = ctrlr.Sxy.toFixed(2);
    Szy = ctrlr.Szy.toFixed(2);
    Sxz = ctrlr.Sxz.toFixed(2);
    Syz = ctrlr.Syz.toFixed(2);

    matrix = new THREE.Matrix4();

    matrix.set(1, ctrlr.Syx, ctrlr.Szx, 0,
        ctrlr.Sxy, 1, ctrlr.Szy, 0,
        ctrlr.Sxz, ctrlr.Syz, 1, 0,
        0, 0, 0, 1);

    // apply shear matrix to geometry                  
    cube.geometry.applyMatrix(matrix);
    cube.geometry.verticesNeedUpdate = true;
}


function rendererLoop() {
    requestAnimationFrame(rendererLoop);
    cube.rotation.y += 0.001;
    normalizeCube();
    // updateCube();
    /*Syx = ctrlr.Syx;
    Szx = ctrlr.Szx;
    Sxy = ctrlr.Sxy;
    Szy = ctrlr.Szy;
    Sxz = ctrlr.Sxz;
    Syz = ctrlr.Syz;

    matrix = new THREE.Matrix4();

    matrix.set(1, ctrlr.Syx, ctrlr.Szx, 0,
        ctrlr.Sxy, 1, ctrlr.Szy, 0,
        ctrlr.Sxz, ctrlr.Syz, 1, 0,
        0, 0, 0, 1);

    // apply shear matrix to geometry                  
    cube.geometry.applyMatrix(matrix);
    cube.geometry.verticesNeedUpdate = true;*/


    camera.position.x = ctrlr.camera_pos_x;
    camera.position.y = ctrlr.camera_pos_y;
    camera.position.z = ctrlr.camera_pos_z;
    renderer.render(scene, camera);
}
