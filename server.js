var http = require("http");

var x = "10.1.1.1";
var activePlayer = "x";

var board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

//create a server object:
const express = require("express");
const path = require("path");
const app = express();
const port = 3001;
app.use(express.static(path.join(__dirname, "build")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/TicTacToe/game", (req, res) => {
  const resData = { board: board, cmd: "", yourTurn: false };
  var ip = req.headers["x-real-ip"] || req.connection.remoteAddress;

  if (req.query.newGame == true) {
    newGame(ip);
  }

  //debug
  var p = "x";
  //var p = ip == player1 ? "x" : "o";

  if (req.query.x != "" && req.query.y != "" && p == activePlayer) {
    const x = "1";
    const y = "1";

    setCell(p, x, y);
    if (p == "x") activePlayer = "o";
    else activePlayer = "x";
  }

  resData.yourTurn = p == activePlayer;

  if (checkWin() != null) {
    resData.cmd = "win";
    resData.yourTurn = false;
  }
  res.send(resData);
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

function newGame(newPlayer1) {
  player1 = newPlayer1;
  player2 = "";
  board = [
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ];
}
