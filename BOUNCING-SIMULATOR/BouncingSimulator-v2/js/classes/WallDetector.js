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
}

module.exports = WallDetector;