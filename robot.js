function getData(url) {
	texto=fetch(url).then(function(response) {
	  return response.text().a(function(text){
		console.log(text)
		return(text);
	  })
	});
	console.log(texto.resolve())
	return(texto)
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );
const controls = new THREE.TrackballControls( camera, renderer.domElement );


var planeGeometry = new THREE.PlaneGeometry(200, 200, 1, 1);
var planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess:60 });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.x=0
plane.position.y=-9
plane.position.z=0
plane.rotation.x-=Math.PI/2
plane.receiveShadow = true;
//WHEEL
geometry = new THREE.SphereBufferGeometry(2, 32, 32, 0, 2*Math.PI, 0.35 * Math.PI, 0.3 * Math.PI);
var image_wheel = new Image();
var texture_wheel
fetch('https://raw.githubusercontent.com/mardebe/Claptrap/main/Tire.txt').then(function(response) {
	return response.text().then(function(text){
		image_wheel.src = 'data:image/png;base64,'+text;
	})
});
texture_wheel = new THREE.Texture();
texture_wheel.image = image_wheel;
image_wheel.onload = function() {
	texture_wheel.needsUpdate = true;
};
material = new THREE.MeshPhongMaterial( {map: texture_wheel,shininess:10 } );
var wheel = new THREE.Mesh( geometry, material );
wheel.castShadow=true;
wheel.rotation.z += Math.PI/2;


geometry = new THREE.CircleGeometry( 1.77, 32 );
var image_side = new Image();
var texture_side
fetch('https://raw.githubusercontent.com/mardebe/Claptrap/main/Side.txt').then(function(response) {
	return response.text().then(function(text){
		image_side.src = 'data:image/png;base64,'+text;
	})
});
texture_side = new THREE.Texture();
texture_side.image = image_side;
image_side.onload = function() {
	texture_side.needsUpdate = true;
};
material = new THREE.MeshPhongMaterial( { map: texture_side, shininess:30 } );
wheel_side1 = new THREE.Mesh( geometry, material );
wheel_side1.castShadow=true;
wheel_side1.position.x+=0.29 * Math.PI;
wheel_side1.rotation.y+= Math.PI/2;

wheel_side2 = new THREE.Mesh( geometry, material );
wheel_side2.castShadow=true;
wheel_side2.position.x-=0.29 * Math.PI;
wheel_side2.rotation.y-= Math.PI/2;

//WHEEL STRUCTURE
geometry = new THREE.CylinderGeometry( .5, .5, .4, 32 );
material = new THREE.MeshPhongMaterial( {color: 0x000f00,shininess:20} );
cylinder1 = new THREE.Mesh( geometry, material );
cylinder1.castShadow=true;
cylinder1.rotation.z-=Math.PI/2;
cylinder1.position.x+=.9;

cylinder2 = new THREE.Mesh( geometry, material );
cylinder2.castShadow=true;
cylinder2.rotation.z+=Math.PI/2;
cylinder2.position.x-=.9;

class WheelTube extends THREE.Curve {
	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}
	getPoint( t, optionalTarget = new THREE.Vector3() ) {
		const tx = Math.sqrt(t * .2);
		const ty = t * .5;
		const tz = 0;
		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}

path = new WheelTube( 2 );
geometry = new THREE.TubeGeometry( path, 20, .3, 16, false );
material = new THREE.MeshPhongMaterial( { color: 0x2F4F4F, shininess: 90 });
wheel_tube1 = new THREE.Mesh( geometry, material );
wheel_tube1.castShadow=true;
wheel_tube1.position.x+=1

wheel_tube2 = new THREE.Mesh( geometry, material );
wheel_tube2.rotation.y-=Math.PI;
wheel_tube2.castShadow=true;
wheel_tube2.position.x-=1


path = new WheelTube( 3 );
geometry = new THREE.TubeGeometry( path, 20, .3, 16, false );
material = new THREE.MeshPhongMaterial( { color: 0x2F4F4F, shininess: 70 });
wheel_tube3=new THREE.Mesh( geometry, material );
wheel_tube3.castShadow=true;
wheel_tube3.position.x+=1.85
wheel_tube3.position.y+=.9
wheel_tube3.rotation.z+=0.3*Math.PI;

wheel_tube4=new THREE.Mesh( geometry, material );
wheel_tube4.castShadow=true;
wheel_tube4.rotation.y-=Math.PI;
wheel_tube4.position.x-=1.85
wheel_tube4.position.y+=.9
wheel_tube4.rotation.z+=0.3*Math.PI;


path = new WheelTube( 2 );
geometry = new THREE.TubeGeometry( path, 20, .4, 16, false );
material = new THREE.MeshPhongMaterial( { color: 0x191919,shininess:70 } );
wheel_tube5 = new THREE.Mesh( geometry, material );
wheel_tube5.castShadow=true;
wheel_tube5.position.x+=1

wheel_tube6 = new THREE.Mesh( geometry, material );
wheel_tube5.castShadow=true;
wheel_tube6.rotation.y-=Math.PI;
wheel_tube6.position.x-=1

//BODY
geometry = new THREE.CylinderGeometry( 3.6, 2.4, 7, 4 );
var image_body = new Image();
var texture_body
fetch('https://raw.githubusercontent.com/mardebe/Claptrap/main/Body.txt').then(function(response) {
	return response.text().then(function(text){
		image_body.src = 'data:image/png;base64,'+text;
	})
});
texture_body = new THREE.Texture();
texture_body.image = image_body;
image_body.onload = function() {
	texture_body.needsUpdate = true;
};
material = new THREE.MeshPhongMaterial( {map: texture_body, shininess:70} );
body = new THREE.Mesh( geometry, material );7
body.castShadow=true;
body.rotation.y+=Math.PI/4;
body.position.y+=7;

geometry = new THREE.BoxGeometry( .18, 1, 2.4 );
material = new THREE.MeshPhongMaterial( {color: 0x501B00,shininess:60} );
skirt_1 = new THREE.Mesh( geometry, material );
skirt_1.castShadow=true;
skirt_1.position.x+=1.7
skirt_1.position.y+=3.2
skirt_1.rotation.z+=Math.PI/9

skirt_2 = new THREE.Mesh( geometry, material );
skirt_2.castShadow=true;
skirt_2.position.x-=1.7
skirt_2.position.y+=3.2
skirt_2.rotation.z-=Math.PI/9

geometry = new THREE.BoxGeometry( 2.4, .6, .18 );
material = new THREE.MeshPhongMaterial( {color: 0x501B00,shininess:60} );
skirt_3 = new THREE.Mesh( geometry, material );
skirt_3.castShadow=true;
skirt_3.position.z-=1.5
skirt_3.position.y+=3.3
skirt_3.rotation.x-=Math.PI/11

skirt_4 = new THREE.Mesh( geometry, material );
skirt_4.castShadow=true;
skirt_4.position.z+=1.5
skirt_4.position.y+=3.3
skirt_4.rotation.x+=Math.PI/11

geometry = new THREE.ConeGeometry( .5,1.1, 3 );
material = new THREE.MeshPhongMaterial( {color: 0x501B00,shininess:60} );
skirt_5 = new THREE.Mesh( geometry, material );
skirt_5.castShadow=true;
skirt_5.position.x+=1.5
skirt_5.position.y+=3.2
skirt_5.position.z+=1.28
skirt_5.rotation.z-=Math.PI/7;
skirt_5.rotation.x+=Math.PI*1.1;

skirt_6 = new THREE.Mesh( geometry, material );
skirt_6.castShadow=true;
skirt_6.position.x-=1.5
skirt_6.position.y+=3.2
skirt_6.position.z+=1.28
skirt_6.rotation.z+=Math.PI/7;
skirt_6.rotation.x+=Math.PI*1.1;

skirt_7 = new THREE.Mesh( geometry, material );
skirt_7.castShadow=true;
skirt_7.position.x+=1.5
skirt_7.position.y+=3.2
skirt_7.position.z-=1.26
skirt_7.rotation.y-=Math.PI/3.4;
skirt_7.rotation.x-=Math.PI*1.3;
skirt_7.rotation.z-=Math.PI/3;

skirt_8 = new THREE.Mesh( geometry, material );
skirt_8.castShadow=true;
skirt_8.position.x-=1.5
skirt_8.position.y+=3.2
skirt_8.position.z-=1.26
skirt_8.rotation.y+=Math.PI/3.4;
skirt_8.rotation.x-=Math.PI*1.3;
skirt_8.rotation.z+=Math.PI/3;

//ARMS
geometry = new THREE.SphereGeometry( .3, 16, 16 );
material = new THREE.MeshPhongMaterial( { color: 0xffff00,shininess:70 } );
shoulder_1 = new THREE.Mesh( geometry, material );
shoulder_1.castShadow=true;

geometry = new THREE.CylinderGeometry( .2, .2, 4, 32 );
material = new THREE.MeshPhongMaterial( {color: 0x2F4F4F,shininess:70} );
tube_1 = new THREE.Mesh( geometry, material );
tube_1.castShadow=true;
tube_1.position.x+=0.95
tube_1.position.y-=1.6
tube_1.rotation.z+=Math.PI/6

geometry = new THREE.CylinderGeometry( .3, .3, .4, 32 );
material = new THREE.MeshPhongMaterial( {color: 0x191919,shininess:70} );
subtube_1 = new THREE.Mesh( geometry, material );
subtube_1.castShadow=true;
subtube_1.rotation.z+=Math.PI/6;
subtube_1.position.x+=1.11;
subtube_1.position.y-=1.9;

subtube_2 = new THREE.Mesh( geometry, material );
subtube_2.castShadow=true;
subtube_2.rotation.z+=Math.PI/6;
subtube_2.position.x+=1.35;
subtube_2.position.y-=2.36;

geometry = new THREE.SphereGeometry( .3, 16, 16 );
material = new THREE.MeshPhongMaterial( { color: 0xffff00, shininess: 70 } );
elbow_1 = new THREE.Mesh( geometry, material );
elbow_1.castShadow=true;

geometry = new THREE.CylinderGeometry( .17, .17, 4, 32 );
material = new THREE.MeshPhongMaterial( {color: 0x2F4F4F,shininess:70} );
tube_2 = new THREE.Mesh( geometry, material );
tube_2.castShadow=true;
tube_2.position.x+=0.33
tube_2.position.y-=0.58
tube_2.position.z-=1.8
tube_2.rotation.z+=Math.PI/16
tube_2.rotation.x+=Math.PI/2.5

class Wire extends THREE.Curve {
	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}
	getPoint( t, optionalTarget = new THREE.Vector3() ) {
		const tx = t;
		const ty = Math.sqrt(t);
		const tz = 0;
		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}
path = new Wire( -2.8 );
geometry = new THREE.TubeGeometry( path, 100, .05, 8, false );
material = new THREE.MeshPhongMaterial( { color: 0x191919, shininess:70 } );
wire_1 = new THREE.Mesh( geometry, material );
wire_1.castShadow=true;
wire_1.position.x+=.25
wire_1.rotation.z+=Math.PI/3.3
wire_1.rotation.x+=Math.PI/2.5

geometry = new THREE.SphereGeometry( .2, 16, 16 );
material = new THREE.MeshPhongMaterial( { color: 0xffff00, shininess:70 } );
wrist_1 = new THREE.Mesh( geometry, material );
wrist_1.castShadow=true;

geometry = new THREE.BoxGeometry( .3, .1, .7 );
material = new THREE.MeshPhongMaterial( {color: 0x191919, shininess:70} );
hand_1 = new THREE.Mesh( geometry, material );
hand_1.castShadow=true;
hand_1.rotation.z+=Math.PI/2;
hand_1.rotation.y-=Math.PI/6;
hand_1.position.x+=.25;
hand_1.position.z-=.4;

geometry = new THREE.BoxGeometry( .25, .07, .55 );
material = new THREE.MeshPhongMaterial( {color: 0x191919, shininess:70} );
hand_2 = new THREE.Mesh( geometry, material );
hand_2.castShadow=true;
hand_2.rotation.z+=Math.PI/2;
hand_2.rotation.y+=Math.PI/8;
hand_2.position.x-=.17;
hand_2.position.z-=.33;

geometry = new THREE.SphereGeometry( .3, 16, 16 );
material = new THREE.MeshPhongMaterial( { color: 0xffff00, shininess:70 } );
shoulder_2 = new THREE.Mesh( geometry, material );
shoulder_2.castShadow=true;

geometry = new THREE.CylinderGeometry( .2, .2, 4, 32 );
material = new THREE.MeshPhongMaterial( {color: 0x2F4F4F, shininess:70} );
tube_3 = new THREE.Mesh( geometry, material );
tube_3.castShadow=true;
tube_3.position.x-=0.95
tube_3.position.y-=1.6
tube_3.rotation.z-=Math.PI/6

geometry = new THREE.CylinderGeometry( .3, .3, .4, 32 );
material = new THREE.MeshPhongMaterial( {color: 0x191919, shininess:70} );
subtube_3 = new THREE.Mesh( geometry, material );
subtube_3.castShadow=true;
subtube_3.rotation.z-=Math.PI/6;
subtube_3.position.x-=1.11;
subtube_3.position.y-=1.9;

subtube_4 = new THREE.Mesh( geometry, material );
subtube_4.castShadow=true;
subtube_4.rotation.z-=Math.PI/6;
subtube_4.position.x-=1.35;
subtube_4.position.y-=2.36;

geometry = new THREE.SphereGeometry( .3, 16, 16 );
material = new THREE.MeshPhongMaterial( { color: 0xffff00, shininess:70 } );
elbow_2 = new THREE.Mesh( geometry, material );
elbow_2.castShadow=true;

geometry = new THREE.CylinderGeometry( .17, .17, 4, 32 );
material = new THREE.MeshPhongMaterial( {color: 0x2F4F4F, shininess:70} );
tube_4 = new THREE.Mesh( geometry, material );
tube_4.castShadow=true;
tube_4.position.x-=0.33
tube_4.position.y-=0.58
tube_4.position.z-=1.8
tube_4.rotation.z-=Math.PI/16
tube_4.rotation.x+=Math.PI/2.5

path = new Wire( 2.8 );
geometry = new THREE.TubeGeometry( path, 100, .05, 8, false );
material = new THREE.MeshPhongMaterial( { color: 0x191919,shininess:70 } );
wire_2 = new THREE.Mesh( geometry, material );
wire_2.castShadow=true;
wire_2.position.x-=.2
wire_2.rotation.z+=Math.PI/3.3
wire_2.rotation.x-=Math.PI/1.7

geometry = new THREE.SphereGeometry( .2, 16, 16 );
material = new THREE.MeshPhongMaterial( { color: 0xffff00, shininess:70 } );
wrist_2 = new THREE.Mesh( geometry, material );
wrist_2.castShadow=true;

geometry = new THREE.BoxGeometry( .3, .1, .7 );
material = new THREE.MeshPhongMaterial( {color: 0x191919, shininess:70} );
hand_3 = new THREE.Mesh( geometry, material );
hand_3.castShadow=true;
hand_3.rotation.z+=Math.PI/2;
hand_3.rotation.y+=Math.PI/6;
hand_3.position.x-=.25;
hand_3.position.z-=.4;

geometry = new THREE.BoxGeometry( .25, .07, .55 );
hand_4 = new THREE.Mesh( geometry, material );
hand_4.castShadow=true;
hand_4.rotation.z+=Math.PI/2;
hand_4.rotation.y-=Math.PI/8;
hand_4.position.x+=.17;
hand_4.position.z-=.33;

//LIGHTS
class Light extends THREE.Curve {
	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}
	getPoint( t, optionalTarget = new THREE.Vector3() ) {
		const tx = 0;
		const ty = 0;
		const tz = t/2;
		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}
path = new Light( 1 );
geometry = new THREE.TubeGeometry( path, 100, .4, 16, false );
material = new THREE.MeshPhongMaterial( { color: 0x191919, shininess:70 } );
tube_5 = new THREE.Mesh( geometry, material );
tube_5.castShadow=true;
tube_5.position.z-=2.75
tube_5.position.y+=9.3

geometry = new THREE.CylinderGeometry( .38, .38, .03, 16 );
material = new THREE.MeshPhongMaterial( {color: 0xffffff,shininess:90} );
cylinder3 = new THREE.Mesh( geometry, material );
cylinder3.rotation.x-=Math.PI/2;
cylinder3.position.y+=9.3;
cylinder3.position.z-=2.6


//HEAD
geometry = new THREE.BoxGeometry( 3, 3, 3 );
material = new THREE.MeshPhongMaterial( {map: texture_body, shininess:60} );
head_1 = new THREE.Mesh( geometry, material );
head_1.castShadow=true;

geometry = new THREE.BoxGeometry( 3.4, 1.5, 1.5 );
material = new THREE.MeshPhongMaterial( {map: texture_body, shininess:20} );
mouth = new THREE.Mesh( geometry, material );
mouth.castShadow=true;
mouth.position.y-=0.7;
mouth.position.z-=1.3;

path = new Light( .5 );
geometry = new THREE.TubeGeometry( path, 100, .25, 16, false );
material = new THREE.MeshPhongMaterial( { color: 0x191919, shininess:70 } );
tube_6 = new THREE.Mesh( geometry, material );
tube_6.castShadow=true;
tube_6.position.z-=1.75
tube_6.position.y+=1.5
tube_6.position.x+=1

tube_7 = new THREE.Mesh( geometry, material );
tube_7.castShadow=true;
tube_7.position.z-=1.75
tube_7.position.y+=1.5
tube_7.position.x-=1

geometry = new THREE.CylinderGeometry( .23, .23, .03, 16 );
material = new THREE.MeshPhongMaterial( {color: 0xffffff,shininess:90} );
cylinder4 = new THREE.Mesh( geometry, material );
cylinder4.rotation.x-=Math.PI/2;
cylinder4.position.y+=1.5;
cylinder4.position.z-=1.6
cylinder4.position.x-=1

cylinder5 = new THREE.Mesh( geometry, material );
cylinder5.rotation.x-=Math.PI/2;
cylinder5.position.y+=1.5;
cylinder5.position.z-=1.6
cylinder5.position.x+=1

//GRUPOS
const claptrap = new THREE.Group()
const head = new THREE.Group()
const full_wheel = new THREE.Group()
const lower_body = new THREE.Group()
const upper_body = new THREE.Group()
const arm_1 = new THREE.Group()
const subarm_1 = new THREE.Group()
const subarm_1_1 = new THREE.Group()
const arm_2 = new THREE.Group()
const subarm_2 = new THREE.Group()
const subarm_2_1 = new THREE.Group()
const light = new THREE.AmbientLight( 0x404040 );
const directionalLight = new THREE.SpotLight(0xffffff,0.5);
const flashlight = new THREE.SpotLight( 0xffffff, 0.5 );
directionalLight.position.set(0, 40, 0);
directionalLight.angle=.4
flashlight.position.set(0,9.4,-2.65)
flashlight.castShadow = true;
flashlight.target=tube_5
directionalLight.target=claptrap
directionalLight.castShadow=true;

full_wheel.add(wheel);
full_wheel.add(wheel_side1);
full_wheel.add(wheel_side2);
lower_body.add(full_wheel);
lower_body.add(cylinder1);
lower_body.add(cylinder2);
lower_body.add(wheel_tube1);
lower_body.add(wheel_tube2);
lower_body.add(wheel_tube3);
lower_body.add(wheel_tube4);
lower_body.add(wheel_tube5);
lower_body.add(wheel_tube6);

arm_1.add(tube_1);
arm_1.add(subtube_1);
arm_1.add(subtube_2);
arm_1.add(shoulder_1);
arm_1.applyMatrix( new THREE.Matrix4().makeTranslation(2.35, 9.2, 0) );
arm_2.add(tube_3);
arm_2.add(subtube_3);
arm_2.add(subtube_4);
arm_2.add(shoulder_2);
arm_2.applyMatrix( new THREE.Matrix4().makeTranslation(-2.35, 9.2, 0) );

subarm_1.add(elbow_1);
subarm_1.add(tube_2);
subarm_1.add(wire_1);
subarm_1.applyMatrix( new THREE.Matrix4().makeTranslation(1.95, -3.34, 0) );
subarm_2.add(elbow_2);
subarm_2.add(tube_4);
subarm_2.add(wire_2);
subarm_2.applyMatrix( new THREE.Matrix4().makeTranslation(-1.95, -3.34, 0) );

subarm_1_1.add(wrist_1);
subarm_1_1.add(hand_1);
subarm_1_1.add(hand_2);
subarm_1_1.applyMatrix( new THREE.Matrix4().makeTranslation(.75, -1.2, -3.75) );
subarm_1.add(subarm_1_1);
subarm_2_1.add(wrist_2);
subarm_2_1.add(hand_3);
subarm_2_1.add(hand_4);
subarm_2_1.applyMatrix( new THREE.Matrix4().makeTranslation(-.75, -1.2, -3.75) );
subarm_2.add(subarm_2_1);

arm_1.add(subarm_1);
arm_2.add(subarm_2);

upper_body.add(arm_1);
upper_body.add(arm_2);
upper_body.add(body);
upper_body.add(skirt_1);
upper_body.add(skirt_2);
upper_body.add(skirt_3);
upper_body.add(skirt_4);
upper_body.add(skirt_5);
upper_body.add(skirt_6);
upper_body.add(skirt_7);
upper_body.add(skirt_8);
upper_body.add(tube_5);
upper_body.add(flashlight);
upper_body.add(cylinder3);

head.applyMatrix( new THREE.Matrix4().makeTranslation(0, 12, 0) );
head.add(head_1);
head.add(cylinder4);
head.add(cylinder5);
head.add(tube_6);
head.add(tube_7);
head.add(mouth);

claptrap.add(lower_body);
claptrap.add(upper_body);
claptrap.add(head)
claptrap.applyMatrix( new THREE.Matrix4().makeTranslation(0, -7, 0) );

scene.add(claptrap);
scene.add(plane);
scene.add(directionalLight);
scene.add( light );

camera.position.z = 60;
camera.position.y = 40;


controls.update();

renderer.render(scene,camera);



window.addEventListener('keyup', handleKeyUp, true)
window.addEventListener('keydown', handleKeyDown, true)
var key_w=false;
var key_a=false;
var key_s=false;
var key_d=false;
var lookPos=[0,0,1];
var ang=0;
var helicopter;

async function handleKeyUp(event){
	if(event.keyCode==87){
		key_w=false;
		// while(Math.abs(claptrap.rotation.x)>=lookPos[2]/100 && Math.abs(claptrap.rotation.z)>=lookPos[0]/100){
		// 	claptrap.rotation.x+=lookPos[2]/300
		// 	claptrap.rotation.z+=lookPos[0]/300
		// 	await new Promise(r => setTimeout(r, 1));
		// }
		claptrap.rotation.x=0
		claptrap.rotation.z=0
	}
	else if(event.keyCode==65){
		key_a=false;
	}
	else if(event.keyCode==83){
		key_s=false;
		// while(Math.abs(claptrap.rotation.x)>=lookPos[2]/100 && Math.abs(claptrap.rotation.z)>=lookPos[0]/100){
		// 	claptrap.rotation.x-=lookPos[2]/300
		// 	claptrap.rotation.z-=lookPos[0]/300
		// 	await new Promise(r => setTimeout(r, 1));
		// }
		claptrap.rotation.x=0
		claptrap.rotation.z=0
	}
	else if(event.keyCode==68){
		key_d=false;
	}
}
function handleKeyDown(event){
	if(event.keyCode==87){
		key_w=true;
	}
	else if(event.keyCode==65){
		key_a=true;
	}
	else if(event.keyCode==83){
		key_s=true;
	}
	else if(event.keyCode==68){
		key_d=true;
	}
}

async function helicopterMode(event){
	if(helicopter){
		window.location.reload();
	}
	
	for (let i = 0; i < 100 ; i++) {
		arm_1.rotation.z+=.01;
		subarm_1.rotation.x-=.008;
		subarm_1.rotation.y-=.005;
		subarm_1_1.rotation.z-=.4;
		arm_2.rotation.z-=.01;
		subarm_2.rotation.x-=.008;
		subarm_2.rotation.y+=.005;
		subarm_2_1.rotation.z+=.4;
		await new Promise(r => setTimeout(r, 30));
	}
	helicopter=true;
	for (let i = 0; i < 600 ; i++) {
		claptrap.position.y+=.01;
		await new Promise(r => setTimeout(r, 1));
	}


}

function animate() {

	if(key_w){
		if(Math.abs(claptrap.rotation.x)<.25 && Math.abs(claptrap.rotation.z)<.25){
			claptrap.rotation.x-=0.01*lookPos[2]
			claptrap.rotation.z-=0.01*lookPos[0]
		}
		if(!helicopter){
			full_wheel.rotation.x-=0.1
		}
		claptrap.position.z-=0.35*lookPos[2]
		claptrap.position.x+=0.35*lookPos[0]
	}
	if(key_s){
		if(Math.abs(claptrap.rotation.x)<.25 && Math.abs(claptrap.rotation.z)<.25){
			claptrap.rotation.x+=0.01*lookPos[2]
			claptrap.rotation.z+=0.01*lookPos[0]
		}
		if(!helicopter){
			full_wheel.rotation.x+=0.1
		}
		claptrap.position.z+=0.35*lookPos[2]
		claptrap.position.x-=0.35*lookPos[0]
	}
	if(key_a){
		claptrap.rotation.y+=Math.PI/128
		if(ang==0){
			ang=360
		}
		ang-=180/Math.PI*Math.PI/128
		lookPos[0]=Math.sin(ang*Math.PI/180)
		lookPos[2]=Math.cos(ang*Math.PI/180)
	}
	if(key_d){
		claptrap.rotation.y-=Math.PI/128
		if(ang==360){
			ang=0
		}
		ang+=180/Math.PI*Math.PI/128
		lookPos[0]=Math.sin(ang*Math.PI/180)
		lookPos[2]=Math.cos(ang*Math.PI/180)
	}
	if(helicopter){
		upper_body.rotation.y+=.4
	}
    requestAnimationFrame( animate );

	controls.update();
    renderer.render( scene, camera );
};

animate();