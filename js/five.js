// step 1 renderer
var canvas = document.querySelector('canvas');
canvas.innerWidth = 400;
canvas.innerHeight = 300;

renderer = new THREE.WebGLRenderer({'canvas':canvas});
renderer.setSize(canvas.innerWidth, canvas.innerHeight);
renderer.setClearColor(new THREE.Color(0xff0000, 1));
document.body.appendChild(renderer.domElement);

// step 2 camera
camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 200 );
camera.position.set(0,0,3.333);

// step 3 scene
scene = new THREE.Scene();

// step 4 add camera and scene to renderer
// renderer.render(scene,camera);


// step 5 create object to show
geo = new  THREE.CubeGeometry( 1, 1, 1);
mat = new THREE.MeshBasicMaterial( {color:0x888888} );

obj = new THREE.Mesh(geo, mat);
obj.rotation.x = Math.PI / 5;
obj.rotation.y = Math.PI / 5;

scene.add(obj);

renderer.render(scene,camera);
