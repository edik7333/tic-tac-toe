var http = require("http");

var player1 = "";
var player2 = "";

var board = [
  [[], [], []],
  [[], [], []],
  [[], [], []],
];

//create a server object:
const express = require("express");
const path = require("path");
const app = express();
const port = 3001;
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/TicTacToe/game", (req, res) => {
  const x = req.params.x;
  const y = req.params.y;
  setCell(p, x, y);
  if (checkWin() != null) res.send({ board: board, cmd: "win" });
});

app.listen(port, () => {
  console.log(`Game server listening on port ${port}`);
});

function setCell(player, x, y) {
  if (board[y][x] != "") return;
  board[y][x] = player;
}

function checkWin() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0];
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
      return board[0][j];
    }
  }

  // Check diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }

  // No one has won
  return null;
}

function newGame() {
  player1 = "";
  player2 = "";
  board = [
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ];
}
