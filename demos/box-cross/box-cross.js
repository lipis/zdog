// ----- setup ----- //

var sceneSize = 9;
var isSpinning = true;
var TAU = Zdog.TAU;
// colors
var yellow = '#ED0';
var gold = '#EA0';
var orange = '#E62';
var garnet = '#C25';
var eggplant = '#636';

var initRotate = {x: (35 / 360) * TAU, y: TAU / 8};

var illo = new Zdog.Illustration({
  element: '.illo',
  rotate: initRotate,
  resize: 'fullscreen',
  dragRotate: true,
  onDragStart: function() {
    isSpinning = false;
  },
  onResize: function(width, height) {
    this.zoom = Math.floor(Math.min(width, height) / sceneSize);
  },
});

// ----- model ----- //

var model = new Zdog.Anchor({
  addTo: illo,
});

function addBox(options) {
  var boxOptions = {
    addTo: model,
    stroke: false,
    topFace: yellow,
    rearFace: gold,
    leftFace: orange,
    rightFace: orange,
    frontFace: garnet,
    bottomFace: eggplant,
  };
  Zdog.extend(boxOptions, options);

  new Zdog.Box(boxOptions);
}

// top
addBox({
  bottomFace: false,
  translate: {y: -1},
});
// bottom
addBox({
  topFace: false,
  translate: {y: 1},
});
// front
addBox({
  rearFace: false,
  translate: {z: 1},
});
// back
addBox({
  frontFace: false,
  translate: {z: -1},
});
// left
addBox({
  rightFace: false,
  translate: {x: -1},
});
// right
addBox({
  leftFace: false,
  translate: {x: 1},
});

var dot = new Zdog.Shape({
  addTo: model,
  translate: {y: -2},
  stroke: 1,
  color: gold,
});
dot.copy({
  translate: {y: 2},
  color: gold,
});
dot.copy({
  translate: {x: -2},
  color: yellow,
});
dot.copy({
  translate: {x: 2},
  color: garnet,
});
dot.copy({
  translate: {z: -2},
  color: orange,
});
dot.copy({
  translate: {z: 2},
  color: eggplant,
});

// ----- animate ----- //

var ticker = 0;
var cycleCount = 150;

function animate() {
  spin();
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

function spin() {
  if (!isSpinning) {
    return;
  }
  var progress = ticker / cycleCount;
  var turn = Math.floor(progress % 4);
  var theta = Zdog.easeInOut(progress % 1, 3) * TAU;
  if (turn == 0 || turn == 2) {
    model.rotate.y = theta;
  } else if (turn == 1) {
    model.rotate.x = theta;
  } else if (turn == 3) {
    model.rotate.z = theta;
  }
  ticker++;
}

animate();
