var http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

var x = "";
var o = "";
var activePlayer = "x";
var winner = "";

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
app.use(cookieParser());
app.use(cors());
app.use(setClientId);

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
  const resData = {
    board: board,
    cmd: "",
    yourTurn: false,
    winner: winner,
    activePlayer: activePlayer,
  };
  var ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
  const params = req.body;

  if (params.newGame == true) {
    newGame(req.cookies.clientId);
    //resData.clientId = req.cookies.clientId;
  }
  if (x == "") {
    x = req.cookies.clientId;
  } else if (o == "") {
    o = req.cookies.clientId;
    //resData.clientId = req.cookies.clientId;
  }

  //debug
  //var p = "x";
  var p = req.cookies.clientId == x ? "x" : "o";

  if (params.x != null && p == activePlayer) {
    const x = params.x;

    if (setCell(p, x)) {
      if (p == "x") activePlayer = "o";
      else activePlayer = "x";
    }
  }

  if (CheckWin() && winner == "") {
    winner = activePlayer == "x" ? "o" : "x";
    resData.winner = winner;
    activePlayer = "";
  }
  resData.yourTurn = p == activePlayer;
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
          board[row][col + 2] == board[row][col + 3] &&
          board[row][col + 1] == board[row][col + 2]
        ) {
          return true;
        }
      }
      //Colum Check
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
          board[row + 2][col + 2] == board[row + 3][col + 3] &&
          board[row + 1][col + 1] == board[row + 2][col + 2]
        ) {
          return true;
        }
      }
      //check line from up-right -> down-left
      if (col < 5 && row > 2) {
        //bug
        if (
          board[row][col] == board[row - 1][col + 1] &&
          board[row - 2][col + 2] == board[row - 3][col + 3] &&
          board[row - 1][col + 1] == board[row - 2][col + 2]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function newGame(newPlayer1) {
  x = newPlayer1;
  o = "";
  winner = "";
  activePlayer = "x";
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

function setClientId(req, res, next) {
  if (!req.cookies.clientId) {
    // Generate a random ID and set it in a cookie
    const clientId = Math.random().toString(36).substring(2, 10);
    res.cookie("clientId", clientId, { maxAge: 24 * 60 * 60 * 1000 }); // Cookie expires after 1 day
  }
  next();
}
