///// CONSTANTS /////
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

///// APP STATE (VARIABLES) /////
let board;
let turn;
let win;
let started;
let xScore = 0;
let yScore = 0;

///// CACHED ELEMENT REFERENCES /////
const squares = Array.from(document.querySelectorAll("#board div"));
const turnChoice = document.getElementById("turnChoice");
const turnUpdate = document.getElementById("turnUpdate");
const scores = document.getElementById("scorekeeper");
const turnButtons = document.getElementById("turnButtons");

///// EVENT LISTENERS /////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;

/**
 * Runs to check which turn choice button was clicked, and acts accordingly with variables turn
 * and started.
 */
function addEventListeners() {
    turnButtons.addEventListener("click", function(event) {
        let clicked = event.target;

        if (clicked.id == "xButton" && !started) {
            turn = "X";
            started = true;
            render();
        }
        if (clicked.id == "oButton" && !started) {
            turn = "O";
            started = true;
            render();
        }
    });
}

///// FUNCTIONS /////

/**
 * Function that runs on page startup to assign variable values and to render the board.
 */
function init() {
    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    turn = "?";
    win = null;
    started = false;

    addEventListeners();
    render();
}

/**
 * Responsible for updating the board appearance by looping through the board array.
 */
function render() {
    board.forEach(function(mark, index) {
        squares[index].textContent = mark;
    });

    scores.textContent = `X TOTAL WINS: ${xScore} | O TOTAL WINS: ${yScore}`;
    xButton.textContent = "X";
    oButton.textContent = "O";
    turnUpdate.textContent = (win === "T" ? `TIE GAME` : (win ? `${win} WINS` : `TURN: ${turn}`));
}

/**
 * Alternates between placing an X or an O on the physical board, depending on the turn state of the game.
 * @param event The targeted HTML element
 */
function takeTurn(event) {
    if (started) {
        let index;
        if (!win) {
            index = squares.findIndex(function(square) {
                return square === event.target;
            });
        }

        if (board[index] === "") {
            board[index] = turn;
            turn = turn === "X" ? "O" : "X";
            win = getWinner();

            render();
        }
    }
}

/**
 * Loops through the board array and checks against each of the programmed win conditions.
 * Checks whether winner is defined, and then whether the board has been completely filled. Winner is then assigned
 * a value accordingly.
 * @return Either "X", "O", "T", or null, depending on the value of winner
 */
function getWinner() {
    let winner = null;

    winningConditions.forEach(function(condition, index) {
        if (
            board[condition[0]] &&
            board[condition[0]] === board[condition[1]] &&
            board[condition[1]] === board[condition[2]]
        ) {
            winner = board[condition[0]];
            if (winner === "X") {
                xScore++;
            }
            if (winner === "O") {
                yScore++;
            }
        }
    });

    return winner ? winner : board.includes("") ? null : "T";
}
