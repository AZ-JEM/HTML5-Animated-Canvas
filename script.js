// --------------------------------------------------/
// make sure document is loaded...
// --------------------------------------------------/
window.onload = function() {

  // ==================================================/
  // get the canvas handle
  // ==================================================/
  var canvas = document.getElementById('canvas');

  // get the drawing context
  if (canvas.getContext){

    // --------------------------------------------------/
    //  Global declarations
    // --------------------------------------------------/
    var ctx = canvas.getContext('2d');

    // current angle of rotation
    var a = 0;
    // desired dimensions of centered rectangle
    var w = 350;
    var h = w;
    // focal point = center of canvas
    var cx = canvas.width/2;
    var cy = canvas.height/2;
    // calc deltas
    var dx = h/2;
    var dy = w/2;
    // animation request id
    var req;
    var run = true;

    setup();
    draw();

  } // end getContext

  // --------------------------------------------------/
  //  one time configuration
  // --------------------------------------------------/
  function setup () {

    ctx.shadowColor = "#555";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 30;
    ctx.shadowOffsetY = 30;

    // clear on click
    canvas.addEventListener('click', function(e) {
      run = !run;
      if (run)
        draw();
      else
        window.cancelAnimationFrame(req);
    });
  }

  // --------------------------------------------------/
  //  draw a single frame
  // --------------------------------------------------/
  function draw () {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // calculate new angle of rotation
    a = a < 360 ? a+0.25 : 0;
    // draw ellipses
    drawEllipses();
    // perform rotation
    ctx.translate(cx, cy);
    ctx.rotate(-a * (Math.PI/180));
    // draw rectangle
    centerRect();
    // reset current transformation matrix to the identity matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // make frame request
    req = window.requestAnimationFrame(draw);

  }

  // --------------------------------------------------/
  //  draw all ellipses
  // --------------------------------------------------/
  function drawEllipses () {

    var hyp  = 0;
    var newX = 0;
    var newY = 0;
    var newA = 0;

    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 10;
    ctx.fillStyle = 'rgba(127, 0, 127, 0.5)';

    hyp = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    for (var i=0; i<4; i++) {
      ctx.beginPath();

      newA = a + 45 + (i*90);
      newX = cx + (hyp) * Math.cos(newA * Math.PI/180);
      newY = cy + (hyp) * Math.sin(newA * Math.PI/180);

      ctx.ellipse(newX, newY, 30, 90, (-newA * Math.PI/180)*5, 0, 2 * Math.PI);

      // if ((i % 2) === 0)
      //   ctx.ellipse(newX, newY, 30, 90, ( 3 * newA * Math.PI/180), 0, 2 * Math.PI);
      // else
      //   ctx.ellipse(newX, newY, 30, 90, (-1 * newA * Math.PI/180), 0, 2 * Math.PI);

      ctx.closePath();
      ctx.stroke();
      ctx.fill();

    }
  }

  // --------------------------------------------------/
  //  draw the center rotating rectangle
  // --------------------------------------------------/
  function centerRect() {

    // draw centered rectangle
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 127, 0.5)';
    ctx.rect(-dx, -dy, dx*2, dy*2);
    ctx.closePath();
    ctx.fill();

    // bisect rectangle
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 127, 0, 0.5)';
    ctx.moveTo(-dx, -dy);
    ctx.lineTo( dx,  dy);
    ctx.lineTo(-dx,  dy);
    ctx.lineTo(-dx, -dy);
    ctx.closePath();
    ctx.fill();

  }
};
