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

const Vector = require('./js/classes/Vector');
const WallDetector = require('./js/classes/WallDetector');
const PositionFinder = require('./js/classes/PositionFinder');
const easyBoard = require('./js/boards/ExamEasyInput').board;
const hardBoard = require('./js/boards/ExamHardInput').board;

class App {
  constructor(board) {
    this.vector = new Vector();
    this.wall = new WallDetector();
    this.positionFinder = new PositionFinder();
    this.board = board;
    this.currentVector = this.vector.downRight;
    this.position = this.positionFinder.run(this.board);
    this.finishCondition = this.positionFinder.run(this.board);
  }
  bounce() {
    let bounce = this.wall.run(this.board, this.position);
    if (this.currentVector === this.vector.upLeft && bounce.upLeft) {
      this.currentVector = this.vector.downRight;
    } else if (this.currentVector === this.vector.downLeft && bounce.downLeft) {
      this.currentVector = this.vector.upRight;
    } else if (this.currentVector === this.vector.upRight && bounce.upRight) {
      this.currentVector = this.vector.downLeft;
    } else if (this.currentVector === this.vector.downRight && bounce.downRight) {
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
  move() {
    let nextPosition = this.currentVector(this.position, this.board);
    if (this.board[nextPosition[1]][nextPosition[0]] === "0") {
      this.board[nextPosition[1]][nextPosition[0]] = "1";
      this.board[this.position[1]][this.position[0]] = "0";
      this.position = [nextPosition[0], nextPosition[1]];
    } else if (this.board[nextPosition[1]][nextPosition[0]] === "X") {
      console.log("BOUNCE!");
      this.bounce();
      this.move();
    } else if (this.board[nextPosition[1]][nextPosition[0]] === "Y") {
      this.board[nextPosition[1]][nextPosition[0]] = "1";
      this.board[this.position[1]][this.position[0]] = "0";
      this.position = [nextPosition[0], nextPosition[1]];
      this.currentVector = this.vector.randomDirection(this.currentVector);
      console.log("CHANGE TO RANDOM DIRECTION!");
    }
  }
  run(counts) {
    console.log(`Start position at: ${this.position}`);
    console.log(this.currentVector);
    let moveCounter = 0;
    while (counts > 0) {
      this.move();
      moveCounter++;
      console.log(`Move #${moveCounter} -----------------------------------`);
      console.log(`You're at: ${this.position}`);
      console.log(this.currentVector);
      counts--;
      if (
        this.position[0] === this.finishCondition[0] &&
        this.position[1] === this.finishCondition[1]
      ) {
        console.log("BINGO!");
        break;
      }
    }
  }
}

const app = new App(hardBoard);
app.run(80);