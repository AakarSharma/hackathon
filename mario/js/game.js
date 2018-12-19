var requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
var updateables = [];
var fireballs = [];
var player = new Mario.Player([0, 0]);

document.body.appendChild(canvas);

var vX = 0,
  vY = 0,
  vWidth = 256,
  vHeight = 240;

resources.load([
  'sprites/player.png',
  'sprites/enemy.png',
  'sprites/tiles.png',
  'sprites/playerl.png',
  'sprites/items.png',
  'sprites/enemyr.png',
]);

resources.onReady(init);
var level;
var sounds;
var music;

//initialize
var lastTime;
function init() {
  music = {
    overworld: new Audio('sounds/aboveground_bgm.ogg'),
    underground: new Audio('sounds/underground_bgm.ogg'),
    clear: new Audio('sounds/stage_clear.wav'),
    death: new Audio('sounds/mariodie.wav')
  };
  sounds = {
    smallJump: new Audio('sounds/jump-small.wav'),
    bigJump: new Audio('sounds/jump-super.wav'),
    breakBlock: new Audio('sounds/breakblock.wav'),
    bump: new Audio('sounds/bump.wav'),
    coin: new Audio('sounds/coin.wav'),
    fireball: new Audio('sounds/fireball.wav'),
    flagpole: new Audio('sounds/flagpole.wav'),
    kick: new Audio('sounds/kick.wav'),
    pipe: new Audio('sounds/pipe.wav'),
    itemAppear: new Audio('sounds/itemAppear.wav'),
    powerup: new Audio('sounds/powerup.wav'),
    stomp: new Audio('sounds/stomp.wav')
  };
  Mario.oneone();

  lastTime = Date.now();
  ctx.font = "20px Georgia";
  ctx.fillStyle = 'white';
  var background = new Image();
  background.src = "welcome.jpg";

  background.onload = function () {
    ctx.drawImage(background, 0, 0);
    setTimeout(() => {
      main();
    }, 1000);

  }

}

var gameTime = 0;
var paused = 0;
var pauseMusic = 0;

//set up the game loop
function main() {
  if (paused == 0) {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();


    lastTime = now;
  } else {
    ctx.font = "20px Georgia";
    ctx.fillStyle = 'white';
    ctx.fillText("Paused!", 20, 40);
  }

  if (input.isDown('SPACE')) {
    if (paused == 1) {
      paused = 0;
    }
    else {
      paused = 1;
    }
  }

  requestAnimFrame(main);
  if (input.isDown('ALT')) {
    if (pauseMusic == 1) {
      pauseMusic = 0;
      music.overworld.play();
    }
    else {
      pauseMusic = 1;
      music.overworld.pause();
    }
  }
  if (pauseMusic == 1) {
    ctx.font = "15px Georgia";
    ctx.fillStyle = 'white';
    ctx.fillText("Mute!", 180, 40);
  }
}

function update(dt) {
  gameTime += dt;
  handleInput(dt);
  updateEntities(dt, gameTime);

  checkCollisions();
}

function handleInput(dt) {
  if (player.piping || player.dying || player.noInput) return;

  if (input.isDown('RUN')) {
    player.run();
  } else {
    player.noRun();
  }
  if (input.isDown('JUMP')) {
    player.jump();
  } else {

    player.noJump();
  }

  if (input.isDown('DOWN')) {
    player.crouch();
  } else {
    player.noCrouch();
  }

  if (input.isDown('LEFT')) {
    player.moveLeft();
  }
  else if (input.isDown('RIGHT')) {
    player.moveRight();
  } else {
    player.noWalk();
  }
}

function updateEntities(dt, gameTime) {
  player.update(dt, vX);
  updateables.forEach(function (ent) {
    ent.update(dt, gameTime);
  });


  if (player.exiting) {
    if (player.pos[0] > vX + 96)
      vX = player.pos[0] - 96
  } else if (level.scrolling && player.pos[0] > vX + 80) {
    vX = player.pos[0] - 80;
  }

  if (player.powering.length !== 0 || player.dying) { return; }
  level.items.forEach(function (ent) {
    ent.update(dt);
  });

  level.enemies.forEach(function (ent) {
    ent.update(dt, vX);
  });

  fireballs.forEach(function (fireball) {
    fireball.update(dt);
  });
  level.pipes.forEach(function (pipe) {
    pipe.update(dt);
  });
}

function checkCollisions() {
  if (player.powering.length !== 0 || player.dying) { return; }
  player.checkCollisions();

  level.items.forEach(function (item) {
    item.checkCollisions();
  });
  level.enemies.forEach(function (ent) {
    ent.checkCollisions();
  });
  fireballs.forEach(function (fireball) {
    fireball.checkCollisions();
  });
  level.pipes.forEach(function (pipe) {
    pipe.checkCollisions();
  });
}

function render() {
  updateables = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = level.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "15px Georgia";
  ctx.fillStyle = 'white';
  ctx.fillText("Best time: " + 500, 10, 280);
  ctx.fillText("time: " + gameTime.toFixed(2), 150, 280);

  for (var i = 0; i < 15; i++) {
    for (var j = Math.floor(vX / 16) - 1; j < Math.floor(vX / 16) + 20; j++) {
      if (level.scenery[i][j]) {
        renderEntity(level.scenery[i][j]);
      }
    }
  }


  level.items.forEach(function (item) {
    renderEntity(item);
  });

  level.enemies.forEach(function (enemy) {
    renderEntity(enemy);
  });



  fireballs.forEach(function (fireball) {
    renderEntity(fireball);
  })

  for (var i = 0; i < 15; i++) {
    for (var j = Math.floor(vX / 16) - 1; j < Math.floor(vX / 16) + 20; j++) {
      if (level.statics[i][j]) {
        renderEntity(level.statics[i][j]);
      }
      if (level.blocks[i][j]) {
        renderEntity(level.blocks[i][j]);
        updateables.push(level.blocks[i][j]);
      }
    }
  }

  if (player.invincibility % 2 === 0) {
    renderEntity(player);
  }

  level.pipes.forEach(function (pipe) {
    renderEntity(pipe);
  });
}

function renderEntity(entity) {
  entity.render(ctx, vX, vY);
}
