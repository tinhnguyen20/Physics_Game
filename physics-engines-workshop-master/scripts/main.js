
var renderer, stage, container;
var world;
var bodies = [];
var graphics = [];

var ZOOM = 20;

init();
animate();

/*
 * Initializer function which initializes the engine world, renderer, and
 * any initial bodies.
 */
function init(){

  /* --- INITIALIZE THE ENGINE --- */
  // Init p2.js
  world = new p2.World();
  world.gravity = [0, 0];    
  /* --- INITIALIZE THE RENDERER --- */
  /* Initialize the stage */
  renderer = PIXI.autoDetectRenderer(800, 600);
  stage = new PIXI.Stage(0x333333);
  /* Put a container into the stage, which will in turn hold all the things we
   * want to display */
  container = new PIXI.DisplayObjectContainer(),
  stage.addChild(container);
  /* Add the canvas to the DOM */
  document.body.appendChild(renderer.view);
  /* Center at origin */
  container.position.x = renderer.width/2;
  container.position.y = renderer.height/2;
  container.scale.x =  ZOOM; // zoom in
  container.scale.y = -ZOOM; // flip the y axis to make "up" the physics "up"

  /* --- INITIALIZE BODIES --- */

  /* YOUR CODE HERE */
   var boxBody = new p2.Body({
     mass: .5,
     position: [0,0],
     angularVelocity:1
   });
   boxBody.addShape(new p2.Rectangle(2,1));
   world.addBody(boxBody);
   // add body to global list of bodes
   bodies.push(boxBody);
  // create a graphical representation
   var boxGraphics = makeGraphics(boxBody.shapes);
   graphics.push(boxGraphics);
   container.addChild(boxGraphics);


  /* Make ground */
  var groundBody = new p2.Body({
    mass: 0,
    position:[0,-14],
  });
  groundBody.addShape(new p2.Rectangle(50,10));
  world.addBody(groundBody);
  bodies.push(groundBody);
  // create a graphical representation
  var groundGraphics = makeGraphics(groundBody.shapes);
  graphics.push(groundGraphics);
  container.addChild(groundGraphics);


  var rectangleBody = new p2.Body({
    mass: 0,
    position: [-5,-7],
  });
  rectangleBody.addShape(new p2.Rectangle(5,5));
  world.addBody(rectangleBody);
   // add body to global list of bodes
  bodies.push(rectangleBody);
  // create a graphical representation
  var rectangleGraphics = makeGraphics(rectangleBody.shapes);
  graphics.push(rectangleGraphics);
  container.addChild(rectangleGraphics);

  var leftWallBody = new p2.Body({
    mass: 0,
    position: [-20,0],
  });
  leftWallBody.addShape(new p2.Rectangle(1,30));
  world.addBody(leftWallBody);
   // add body to global list of bodes
  bodies.push(leftWallBody);
  // create a graphical representation
  var leftWallGraphics = makeGraphics(leftWallBody.shapes);
  graphics.push(leftWallGraphics);
  container.addChild(leftWallGraphics);

  var rightWallBody = new p2.Body({
    mass: 0,
    position: [20,0],
  });
  rightWallBody.addShape(new p2.Rectangle(1,30));
  world.addBody(rightWallBody);
   // add body to global list of bodes
  bodies.push(rightWallBody);
  // create a graphical representation
  var rightWallGraphics = makeGraphics(rightWallBody.shapes);
  graphics.push(rightWallGraphics);
  container.addChild(rightWallGraphics);

  var topWallBody = new p2.Body({
    mass: 0,
    position: [0,15],
  });
  topWallBody.addShape(new p2.Rectangle(40,1));
  world.addBody(topWallBody);
   // add body to global list of bodes
  bodies.push(topWallBody);
  // create a graphical representation
  var topWallGraphics = makeGraphics(topWallBody.shapes);
  graphics.push(topWallGraphics);
  container.addChild(topWallGraphics);

  var circleBody = new p2.Body({
     mass: .2,
     position: [0,10],
     angularVelocity:1
   });
   circleBody.addShape(new p2.Circle(1));
   world.addBody(circleBody);
   // add body to global list of bodes
   bodies.push(circleBody);
  // create a graphical representation
   var circleGraphics = makeGraphics(circleBody.shapes);
   graphics.push(circleGraphics);
   container.addChild(circleGraphics);



} // end of init function --------

/*
 * A simple animation loop which takes care of stepping the physics engine
 * and drawing all bodies in the global array of bodies.
 */
function animate() {
  requestAnimationFrame(animate);
  updatePhysics();
  render();
}

function updatePhysics() {
  if (keyDown)  { 
    console.log("down");
    /* YOUR CODE HERE */
    /* What should be done when down is pressed? */
    bodies[0].applyForce([0, -15], bodies[0].position);

  }
  if (keyUp) {
    console.log("up");
    /* YOUR CODE HERE */
    bodies[0].applyForce([0, 15], bodies[0].position);


  }
  if (keyLeft) {
    console.log("left");
    /* YOUR CODE HERE */
    bodies[0].applyForce([-15, 0], bodies[0].position);
  }
  if (keyRight) {
    console.log("right");
    /* YOUR CODE HERE */
    bodies[0].applyForce([15, 0], bodies[0].position);
  }

  /* Step the engine */
  world.step(1/60);
}


function render() {
  /* Iterate over all bodies and graphics */
  for (var i = 0; i < graphics.length; i++) {
    /* Update graphics position and rotation using body info */
    graphics[i].position.x = bodies[i].position[0];
    graphics[i].position.y = bodies[i].position[1];
    graphics[i].rotation   = bodies[i].angle;
  }
  renderer.render(stage);
}
