import "./style.css";
import rotateIcon from './rotate-360.svg';
import { Ship } from "../js/ship";
import { Gameboard } from "../js/gameboard";
import { Player } from "../js/player";

let rotate = document.createElement("img");
rotate.src = rotateIcon;
let button = document.querySelector("button.rotate");
button.appendChild(rotate);

let style;

let restartButton = document.querySelector(".restart");

let turn = "player";

let startButton = document.querySelector(".start");

let playerGrid = document.querySelector(".player > .grid-container");
let computerGrid = document.querySelector(".computer > .grid-container");
createGrid(playerGrid, computerGrid);

function createGrid (playerGrid, computerGrid) {
    for (let row = 0; row < 10; row += 1) {
    let column = 1
    for (let col = 0; col < 10; col += 1) {
        let box = document.createElement("div");
        playerGrid.appendChild(box);
        let computerBox = document.createElement("div");
        computerGrid.appendChild(computerBox);
        computerBox.style.gridColumn = `${column}`;
        box.style.gridColumn = `${column}`;

        // add row and col classes
        box.classList.add(`row-${row}`);
        box.classList.add(`col-${col}`);

        computerBox.classList.add(`row-${row}`);
        computerBox.classList.add(`col-${col}`);


        column += 1;
    }
}

}



let player1 = new Player("player");
player1.gameboard.placeShip("player");
let computer = new Player("computer");
computer.gameboard.placeShip("computer");

button.addEventListener("click", () => player1.gameboard.placeShip("player"));

startButton.addEventListener("click", () => {
    button.disabled = true;
    button.style.opacity = "0.5";
    button.style.cursor = "not-allowed";
    startButton.style.display = "none";

    // event listeners for computer grid boxes
    enableComputerGridClickListeners();

    if (turn === "player") {
        document.querySelector("div.display").textContent = "Your turn";
    }

})

// computer attack function 

let lastHit = null;
let potentialTargets = [];
let attackedCells = new Set();

function computerAttack () {
    let playerAttack = true;
    disableComputerGridClickListeners();

    let row, col;

    // Check if there are potential targets
    if (potentialTargets.length > 0) {
        // Attack from the list of potential targets
        [row, col] = potentialTargets.pop();
    } else {
        // Find a random cell that has not been attacked yet
        do {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
        } while (attackedCells.has(`${row},${col}`));
    }

    // Execute the attack
    playerAttack = player1.gameboard.receiveAttack(row, col);
    attackedCells.add(`${row},${col}`);
    potentialTargets = potentialTargets.filter(([r, c]) => !attackedCells.has(`${r},${c}`));



    if (playerAttack) {
        // Track the last hit
        lastHit = { row, col };

        // Add adjacent cells to potential targets
        if (row > 0 && !attackedCells.has(`${row - 1},${col}`)) potentialTargets.push([row - 1, col]); // Up
        if (row < 9 && !attackedCells.has(`${row + 1},${col}`)) potentialTargets.push([row + 1, col]); // Down
        if (col > 0 && !attackedCells.has(`${row},${col - 1}`)) potentialTargets.push([row, col - 1]); // Left
        if (col < 9 && !attackedCells.has(`${row},${col + 1}`)) potentialTargets.push([row, col + 1]); // Right

        if (player1.gameboard.grid.every(row => row.every(col => col === ""))) {
            style = document.createElement("style");
            style.textContent = `
                .computer::before {
                    content: "Computer Wins";
                    font-family: "intro_rust_gbase_2_line", sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    z-index: 2;
                    top: 0;
                    left: 0;
                    background-color: #7dd3fc;
                    font-size: 2rem;
                    border-radius: 20px;
                }
                .computer {
                    z-index: 1;
                }
            `;
            document.head.appendChild(style);
            restartButton.style.display = "inline-block";
            return;
        }



        setTimeout(computerAttack, 2000);
        return;

    }
    turn = "player";
    document.querySelector("div.display").textContent = "Your turn";
    enableComputerGridClickListeners();
}

let trackMyAttack = new Set();
function myAttack (box) {
    if (!trackMyAttack.has(`${box.classList.value.split(" ")[0].split("-")[1]},${box.classList.value.split(" ")[1].split("-")[1]}`)) {
        let attackSuccess = computer.gameboard.receiveAttack(box.classList.value.split(" ")[0].split("-")[1], box.classList.value.split(" ")[1].split("-")[1]);
        trackMyAttack.add(`${box.classList.value.split(" ")[0].split("-")[1]},${box.classList.value.split(" ")[1].split("-")[1]}`)
        if (!attackSuccess) {
            turn = "computer";
            disableComputerGridClickListeners();
            document.querySelector("div.display").textContent = "Computer's turn";
            setTimeout(computerAttack, 2000); 
        }   else {
            if (computer.gameboard.grid.every(row => row.every(col => col === ""))) {
                style = document.createElement("style");
                style.textContent = `
                    .player::before {
                        content: "You Win";
                        font-family: "intro_rust_gbase_2_line", sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        z-index: 2;
                        top: 0;
                        left: 0;
                        background-color: #7dd3fc;
                        font-size: 2rem;
                        border-radius: 20px;
                    }
                    .player {
                        z-index: 1;
                    }
                `;
                document.head.appendChild(style);
                restartButton.style.display = "inline-block";
                return;
            }
    
    
        }
    }

    
    
}

function handleComputerBoxClick(event) {
    myAttack(event.target.closest("div"));
}

// enable computer box listeners 
function enableComputerGridClickListeners() {
    let computerDiv = document.querySelectorAll(".computer > .grid-container > div");
    computerDiv.forEach((box) => {
        box.addEventListener("click", handleComputerBoxClick);
    });
}

// disable computer box listeners
function disableComputerGridClickListeners() {
    let computerDiv = document.querySelectorAll(".computer > .grid-container > div");
    computerDiv.forEach((box) => {
        box.removeEventListener("click", handleComputerBoxClick);
    });
}

restartButton.addEventListener("click", () => {
    if (style) {
        document.head.removeChild(style);
    }
    restartButton.style.display = "none";
    playerGrid.innerHTML = '';
    computerGrid.innerHTML = '';
    createGrid(playerGrid, computerGrid);

    player1 = new Player("player");
    computer = new Player("computer");

    player1.gameboard.placeShip("player");
    computer.gameboard.placeShip("computer");

    // Reset the buttons and display elements
    button.disabled = false;
    button.style.opacity = "1";
    button.style.cursor = "pointer";
    startButton.style.display = "inline-block";

    document.querySelector("div.display").textContent = "Edit Ship Placement Using this Button";
    lastHit = null;
    potentialTargets = [];
    attackedCells = new Set();
    trackMyAttack = new Set();


})
