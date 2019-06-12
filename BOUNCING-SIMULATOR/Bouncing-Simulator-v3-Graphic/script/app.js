/* EASY VERSION - [EXAM] Create bouncy simulator. Get board from ExampleInput.js. 
X – border, 0 – boards object can travel, 1 – bouncing object. The 
program is to show how the object would travel and bounce against 
the walls. The program is to end when object comes back to original 
position. */

/* HARD VERSION - [EXAM] Create bouncy simulator. Get board from ExampleInput.js. 
Y – when bouncing objects enters it move it to random direction other 
that it came and Y turns into 0,    X – border, 0 – boards object
can travel, 1 – bouncing object. The program is to show how the object 
would travel and bounce against the walls. Bouncing objects starts in 
any corner. 1 and Y position may vary. */

const easyBoard = [
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "1", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "X", "X", "X", "X", "X", "X"]
];

const hardBoard = [
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "1", "0", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "X", "0", "0", "0", "0", "Y", "0", "X"],
  ["X", "0", "0", "X", "X", "X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "Y", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
];
//given boards;

class Vector {
  upLeft(position, board) {
    let x = position[0] - 1;
    let y = position[1] - 1;
    if (board[y][x]) {
      return [x, y];
    } else {
      return false;
    }
  }
  upRight(position, board) {
    let x = position[0] + 1;
    let y = position[1] - 1;
    if (board[y][x]) {
      return [x, y];
    } else {
      return false;
    }
  }
  downLeft(position, board) {
    let x = position[0] - 1;
    let y = position[1] + 1;
    if (board[y][x]) {
      return [x, y];
    } else {
      return false;
    }
  }
  downRight(position, board) {
    let x = position[0] + 1;
    let y = position[1] + 1;
    if (board[y][x]) {
      return [x, y];
    } else {
      return false;
    }
  }
  //methods used to set direction for a ball to move;
  randomDirection(direction) {
    let possibleDirections;
    if (direction === this.downRight) {
      possibleDirections = [this.upRight, this.downLeft, this.downRight];
    } else if (direction === this.downLeft) {
      possibleDirections = [this.upLeft, this.downLeft, this.downRight];
    } else if (direction === this.upRight) {
      possibleDirections = [this.upLeft, this.upRight, this.downRight];
    } else if (direction === this.upLeft) {
      possibleDirections = [this.upLeft, this.upRight, this.downLeft];
    }
    let randomizer = Math.floor(Math.random() * possibleDirections.length);
    return possibleDirections[randomizer];
  }
  //method that returns a random vector after ball encounters Y field;
}

class WallDetector {
  findWalls(board, position) {
    let y = position[1];
    let x = position[0];
    let wall = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    if (board[y][x - 1] === "X") {
      wall.left = true;
    }
    if (board[y - 1][x] === "X") {
      wall.up = true;
    }
    if (board[y][x + 1] === "X") {
      wall.right = true;
    }
    if (board[y + 1][x] === "X") {
      wall.down = true;
    }
    return wall;
  }
  //method that returns an object with data about walls near a ball;
  findCorners(board, position) {
    let y = position[1];
    let x = position[0];
    let corner = {
      upRight: false,
      upLeft: false,
      downLeft: false,
      downRight: false
    };
    if (
      board[y - 1][x + 1] === "X" &&
      board[y - 1][x] !== "X" &&
      board[y][x + 1] !== "X"
    ) {
      corner.upRight = true;
    }
    if (
      board[y - 1][x - 1] === "X" &&
      board[y - 1][x] !== "X" &&
      board[y][x - 1] !== "X"
    ) {
      corner.upLeft = true;
    }
    if (
      board[y + 1][x - 1] === "X" &&
      board[y + 1][x] !== "X" &&
      board[y][x - 1] !== "X"
    ) {
      corner.downLeft = true;
    }
    if (
      board[y + 1][x + 1] === "X" &&
      board[y + 1][x] !== "X" &&
      board[y][x + 1] !== "X"
    ) {
      corner.downRight = true;
    }
    return corner;
  }
  //method that returns an object with data about convex corners near a ball;
  run(board, position) {
    let wall = this.findWalls(board, position);
    let convexCorner = this.findCorners(board, position);
    let corner = {
      upRight: false,
      upLeft: false,
      downLeft: false,
      downRight: false
    };
    if ((wall.left && wall.up) || convexCorner.upLeft) {
      corner.upLeft = true;
    }
    if ((wall.left && wall.down) || convexCorner.downLeft) {
      corner.downLeft = true;
    }
    if ((wall.right && wall.up) || convexCorner.upRight) {
      corner.upRight = true;
    }
    if ((wall.right && wall.down) || convexCorner.downRight) {
      corner.downRight = true;
    }
    let result = Object.assign(corner, wall);
    return result;
  }
  //method that return an object with data about near walls and convex corners from methods above
  //plus concave corners
}

class PositionFinder {
  run(board) {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x] === "1") {
          return [x, y];
        }
      }
    }
  }
  //method to find a ball position in a board;
}

class TextureSet {
  constructor(directory, wallSrc, ballSrc, portalSrc, finishSrc, backgroundSrc) {
    this.directory = directory;
    this.wallSrc = wallSrc;
    this.ballSrc = ballSrc;
    this.portalSrc = portalSrc;
    this.finishSrc = finishSrc;
    this.backgroundSrc = backgroundSrc;
  }
  create() {
    let wall = new Image();
    wall.src = this.directory + this.wallSrc;
    let ball = new Image();
    ball.src = this.directory + this.ballSrc;
    let portal = new Image();
    portal.src = this.directory + this.portalSrc;
    let finish = new Image();
    finish.src = this.directory + this.finishSrc;
    const background = (canvasId) => {
      document.getElementById(canvasId).style.background = `url(${this.directory + this.backgroundSrc})`;
    }
    return {
      wall,
      ball,
      portal,
      finish,
      background
    }
  }
  //method to create texture sets for different layouts;
}

class App {
  constructor(board, canvasId, textures) {
    this.vector = new Vector();
    this.wall = new WallDetector();
    this.positionFinder = new PositionFinder();
    this.board = board;
    this.canvasId = canvasId;
    this.currentVector = this.vector.downRight;
    this.position = this.positionFinder.run(this.board);
    this.finishCondition = this.positionFinder.run(this.board);
    this.previousDraw;
    this.currentInterval;
    this.wallImage = textures.wall;
    this.ballImage = textures.ball;
    this.portalImage = textures.portal;
    this.finishImage = textures.finish;
  }
  clearCanvas() {
    let canvas = document.getElementById(this.canvasId);
    if (canvas.getContext) {
      let ctx = canvas.getContext("2d");
      for (let y = 0; y < this.board.length; y++) {
        for (let x = 0; x < this.board[y].length; x++) {
          let renderX = x * 50;
          let renderY = y * 50;
          ctx.clearRect(renderX, renderY, 50, 50);
        }
      }
    }
  }
  //method to clear canvas before rendering new texture sets;
  changeTextures(textures) {
    this.wallImage = textures.wall;
    this.ballImage = textures.ball;
    this.portalImage = textures.portal;
    this.finishImage = textures.finish;
    this.clearCanvas();
    this.draw();
  }
  //method activated after clicking buttons changing layouts;
  draw() {
    let canvas = document.getElementById(this.canvasId);
    if (canvas.getContext) {
      let ctx = canvas.getContext("2d");
      for (let y = 0; y < this.board.length; y++) {
        for (let x = 0; x < this.board[y].length; x++) {
          let renderX = x * 50;
          let renderY = y * 50;
          if (this.board[y][x] === "X") {
            ctx.drawImage(this.wallImage, renderX, renderY, 50, 50);
          }
          if (this.board[y][x] === "1") {
            ctx.drawImage(this.ballImage, renderX, renderY, 50, 50);
          }
          if (this.board[y][x] === "Y") {
            ctx.drawImage(this.portalImage, renderX, renderY, 50, 50);
          }
          if (this.board[y][x] === "0") {
            ctx.clearRect(renderX, renderY, 50, 50);
          }
        }
      }
      ctx.drawImage(
        this.finishImage,
        this.finishCondition[0] * 50,
        this.finishCondition[1] * 50,
        50,
        50
      );
    }
  }
  //method to render graphics on canvas;
  bounce() {
    let bounce = this.wall.run(this.board, this.position);
    if (this.currentVector === this.vector.upLeft && bounce.upLeft) {
      this.currentVector = this.vector.downRight;
    } else if (this.currentVector === this.vector.downLeft && bounce.downLeft) {
      this.currentVector = this.vector.upRight;
    } else if (this.currentVector === this.vector.upRight && bounce.upRight) {
      this.currentVector = this.vector.downLeft;
    } else if (
      this.currentVector === this.vector.downRight &&
      bounce.downRight
    ) {
      this.currentVector = this.vector.upLeft;
    } else if (this.currentVector === this.vector.upLeft && bounce.left) {
      this.currentVector = this.vector.upRight;
    } else if (this.currentVector === this.vector.upLeft && bounce.up) {
      this.currentVector = this.vector.downLeft;
    } else if (this.currentVector === this.vector.upRight && bounce.right) {
      this.currentVector = this.vector.upLeft;
    } else if (this.currentVector === this.vector.upRight && bounce.up) {
      this.currentVector = this.vector.downRight;
    } else if (this.currentVector === this.vector.downLeft && bounce.left) {
      this.currentVector = this.vector.downRight;
    } else if (this.currentVector === this.vector.downLeft && bounce.down) {
      this.currentVector = this.vector.upLeft;
    } else if (this.currentVector === this.vector.downRight && bounce.right) {
      this.currentVector = this.vector.downLeft;
    } else if (this.currentVector === this.vector.downRight && bounce.down) {
      this.currentVector = this.vector.upRight;
    }
  }
  //method that pick a right vector after ball bounces off the wall;
  move() {
    this.bounce();
    let nextPosition = this.currentVector(this.position, this.board);
    if (this.board[nextPosition[1]][nextPosition[0]] === "0") {
      this.board[nextPosition[1]][nextPosition[0]] = "1";
      this.board[this.position[1]][this.position[0]] = "0";
      this.position = [nextPosition[0], nextPosition[1]];
    } else if (this.board[nextPosition[1]][nextPosition[0]] === "Y") {
      this.board[nextPosition[1]][nextPosition[0]] = "1";
      this.board[this.position[1]][this.position[0]] = "0";
      this.position = [nextPosition[0], nextPosition[1]];
      this.currentVector = this.vector.randomDirection(this.currentVector);
    }
    this.draw();
  }
  //method to move a ball by one position depends on current position and it's vector;
  animate(speed) {
    this.currentInterval = setInterval(() => {
      this.move();
      if (
        this.position[0] === this.finishCondition[0] &&
        this.position[1] === this.finishCondition[1]
      ) {
        this.stopAnimate();
      }
    }, speed);
  }
  //method to start board animation after activation;
  stopAnimate() {
    clearInterval(this.currentInterval);
  }
  //method to freeze animation;
}

const basketball = new TextureSet(
  "./textures/basketball/",
  "brick.jpg",
  "basketball.png",
  "lakers.png",
  "basket.png",
  "parquet.jpg"
).create();

const football = new TextureSet(
  "./textures/football/",
  "stone.png",
  "football.png",
  "referee.png",
  "gate.png",
  "grass.jpg"
).create();

const hockey = new TextureSet(
  "./textures/hockey/",
  "crowd.jpg",
  "puck.png",
  "stick.png",
  "gate.png",
  "ice.jpg"
).create();

const space = new TextureSet(
  "./textures/space/",
  "meteor.jpg",
  "spaceship.png",
  "portal.png",
  "spacebase.png",
  "space.png"
).create();
//texture sets that can be changed dynamically;

const appEasy = new App(easyBoard, "boardEasy", basketball);
const appHard = new App(hardBoard, "boardHard", basketball);
//two instances of App class, one for each board difficulty levels;
