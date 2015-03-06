/**
 * Returns a random integer in MIN (inclusive) and MAX (exclusive).
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Returns a Pixi.js Graphics Object that is a visual representation of the
 * provided SHAPES.
 */
function makeGraphics(shapes) {
  var graphics = new PIXI.Graphics();
  var fillColor = randInt(0x000000, 0xFFFFFF + 1);
  graphics.beginFill(fillColor);
  for (var j = 0; j < shapes.length; j++) {
    var shape = shapes[j];
    if (shape instanceof p2.Convex) {
      var end = shape.vertices.length;
      graphics.moveTo(shape.vertices[end-1][0], shape.vertices[end-1][1]);
      for (var i = 0; i < end; i++) {
        graphics.lineTo(shape.vertices[i][0], shape.vertices[i][1]);
      }
    } else if (shape instanceof p2.Circle) {
      graphics.drawCircle(0, 0, shape.radius);
      /* Draw angle indicator */
      graphics.lineStyle(.1, lighten(fillColor, -.2));
      graphics.moveTo(0, 0);
      graphics.lineTo(0, shape.radius * 0.9);
    }
  }
  graphics.endFill();
  return graphics;
}


function spawnParticle(position, velocity) {
  var body = new p2.Body({
    mass: 0.01,
    position: position,
    velocity: velocity
  });
  body.addShape(new p2.Circle(0.1, 0, 0));
  world.addBody(body);
  bodies.push(body);
  var g = makeGraphics(body.shapes);
  graphics.push(g);
  container.addChild(g);

  // kill after one second
  setTimeout(function () {
    world.removeBody(body);
    container.removeChild(g);
  }, 1000);

  return body;
}
function spawnRandomCircle() {
  return spawnRandomBody(new p2.Circle(randInt(1,5) / 2.0), randInt(-5, 5), randInt(-5, 5));
}
function spawnRandomRect() {
  return spawnRandomBody(new p2.Rectangle(randInt(1,5),randInt(1,5)), randInt(-5, 5), randInt(-5,5));
}

/**
 * Spawns a new body and adds it to the global array. Returns the body.
 */
function spawnRandomBody(shape, x, y) {
  // Create
  var body = new p2.Body({
    mass: 1,
    position: [x, y],
    angularVelocity: randInt(-3,3)
  });
  body.addShape(shape);
  world.addBody(body);
  // Draw
  bodies.push(body);
  var g = makeGraphics(body.shapes);
  /* Put graphics in global array of graphics and in stage container */
  graphics.push(g);
  container.addChild(g);

  return body;
}

function lighten(color, percentage) {
  r = (color & 0xFF0000) >> 16;
  g = (color & 0x00FF00) >> 8;
  b = (color & 0x0000FF);

  hsl = rgbToHsl(r, g, b);
  newRgb = hslToRgb(hsl[0], hsl[1], Math.max(0, Math.min(1, hsl[2] * (1 + percentage))));
  
  result = (newRgb[0] << 16) | (newRgb[1] << 8) | (newRgb[2]);
  return result;
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
}
