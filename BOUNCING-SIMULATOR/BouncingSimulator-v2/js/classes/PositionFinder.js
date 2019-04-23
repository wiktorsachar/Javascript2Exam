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
}

module.exports = PositionFinder;