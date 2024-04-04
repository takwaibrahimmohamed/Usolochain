// vars
var gridY = 35;  // number of rows
var gridX = 200;  // number of shapes per row
var gridYheight = 1;  // height of each row
var rad = 40;  // radius of gridY

// setup scene and renderer
const canva = document.querySelector(".centerContent .image")
console.log(canva)
var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer( { antialias: true,alpha: true } );
renderer.setClearColor( 0x000000, 0 );
renderer.setSize( window.innerWidth, window.innerHeight );
canva.appendChild(renderer.domElement);

var shapes = [];

// add geometry to scene
function setup() {
  var step = (2*Math.PI)/gridX;
  var angle = 0; 
  for (var j = 0; j < gridY; j++) {  
    shapes[j] = [];
    for (var i = 0; i < gridX; i++) {
      var x = rad*Math.sin(angle);
      var z = rad*Math.cos(angle);
      var y = (j*gridYheight)+(gridYheight/gridX);
      var rot = (i*(360/gridX)) * (Math.PI/180.0);
      var geo = new THREE.PlaneGeometry(1, 0.2);
      var mat = new THREE.MeshBasicMaterial( { color: "purple" } );
      var shape = new THREE.Mesh( geo, mat );
      shape.material.side = THREE.BackSide;
      shape.overdraw = true;
      shape.position.x = x;
      shape.position.z = z;
      shape.position.y = y;
      shape.rotation.y = rot;
      scene.add( shape );    
      shapes[j].push( shape );
      angle += step;
    }
  }
}

// plasma 
var p1 = 0,
  p2 = 0,
  p3 = 0,
  p4 = 0,
  t1, t2, t3, t4,
  aSin = [], 
  r, i, j, x;

var as = Math.random(300)*5;
var fd = Math.random(300)*10;
var as1 = Math.random(200)*50;
var fd1 = Math.random(300)*50;
var fd2 = Math.random(300)*50;
var ps = (Math.random(200)*20)-10;
var ps2 = (Math.random(200)*40)-20;

console.log('var as='+as+',fd='+fd+',as1='+as1+',fd1='+fd1+',fd2='+fd2+',ps='+ps+',ps2='+ps2+';');

function setupPlasma() {
  var i = 512;
  while (i--) {
    r = (i * 0.703125) * 0.0174532;
    aSin[i] = Math.sin(r) * 1024;
  }
  drawPlasma();
}

function drawPlasma() {
  t4 = p4;
  t3 = p3;
  i = gridX; while(i--) {
    t1 = p1 + 5; 
    t2 = p2 + 3; 
    t3 &= 511;
    t4 &= 511;
    j = gridY; while(j--) {
      t1 &= 511;
      t2 &= 511;
      x = aSin[t1] + aSin[t2] + aSin[t3] + aSin[t4];
      shapes[j][i].material.color.r = (x/as)/255;
      shapes[j][i].material.color.r = (x/fd)/255;
      shapes[j][i].material.color.r = (x/ps)/255;
      
      t1 += 5;
      t2 += 3;
    }
    t4 += as1;
    t3 += fd1;
  }
  p1 += ps;
  p3 += ps2;
}

function render() {
  requestAnimationFrame(render);
  cam.rotation.y += 0.001;
  cam.rotation.z += 0.0001;
  drawPlasma();
  renderer.render(scene, cam);
}

function main() {
  setup();  // setup geometry
  setupPlasma(); //setup plasma
  cam.position.y = gridY*gridYheight/2;
  /*  cam.position.z = 9;*/
  render();
}
main();


