var http = require("http");
const bodyParser = require("body-parser");

var x = "10.1.1.1";
var o = "";
var activePlayer = "x";

var board = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
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

app.use(bodyParser.json());

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/TicTacToe/game", (req, res) => {
  const resData = { board: board, cmd: "", yourTurn: false, winner: "" };
  var ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
  const params = req.body;

  if (params.newGame == true) {
    newGame(ip);
  }

  if (ip != x && o == "") {
    o = ip;
  }

  //debug
  var p = "x";
  //var p = ip == player1 ? "x" : "o";

  if (params.x != "" && p == activePlayer) {
    const x = params.x;

    if (setCell(p, x)) {
      if (p == "x") activePlayer = "o";
      else activePlayer = "x";
    }
  }

  resData.yourTurn = p == activePlayer;

  if (CheckWin()) {
    resData.cmd = "win";
    resData.yourTurn = false;
  }
  res.send(resData);
});

app.listen(port, () => {
  console.log(`Game server listening on port ${port}`);
});

function setCell(player, x) {
  for (var y = board[0].length - 1; y > 0; y--) {
    if (board[x][y] == "") {
      board[x][y] = player;
      return true;
    }
  }
  return false;
}

function CheckWin() {
  console.log("IsFinished");
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] == "") continue;
      //Row Check
      if (col < 5) {
        if (
          board[row][col] == board[row][col + 1] &&
          board[row][col + 2] == board[row][col + 3]
        ) {
          if (board[row][col + 1] == board[row][col + 2]) {
            return true;
          }
        }
      }
      //Colom Check
      if (row < 5) {
        if (
          board[row][col] == board[row + 1][col] &&
          board[row + 2][col] == board[row + 3][col]
        ) {
          if (board[row + 1][col] == board[row + 2][col]) {
            return true;
          }
        }
      }

      //check line from up-left -> down-right
      if (col < 5 && row < 5) {
        if (
          board[row][col] == board[row + 1][col + 1] &&
          board[row + 2][col + 2] == board[row + 3][col + 3]
        ) {
          if (board[row + 1][col + 1] == board[row + 2][col + 2]) {
            return true;
          }
        }
      }
      //check line from up-right -> down-left
      if (row < 5 && col > 2) {
        //bug
        if (
          board[row][col] == board[row - 1][col + 1] &&
          board[row - 2][col + 2] == board[row - 3][col + 3]
        ) {
          if (board[row - 1][col + 1] == board[row - 2][col + 2]) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

function newGame(newPlayer1) {
  x = newPlayer1;
  o = "";
  board = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ];
}
