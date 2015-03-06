var keyLeft = keyUp = keyRight = keyDown = false;

window.onkeydown = function(e) {
  handleKey(e.keyCode, true);
}
window.onkeyup = function(e) {
  handleKey(e.keyCode, false);
}

function handleKey(code, isDown) {
  switch (code) {
    case 37: keyLeft  = isDown; break;
    case 38: keyUp    = isDown; break;
    case 39: keyRight = isDown; break;
    case 40: keyDown  = isDown; break;
    default: break;
  }
}
