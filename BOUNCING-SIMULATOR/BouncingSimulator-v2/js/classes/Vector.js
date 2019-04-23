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
}

module.exports = Vector;