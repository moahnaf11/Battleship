import "./style.css";
import rotateIcon from './rotate-360.svg';
import { Ship } from "../js/ship";
import { Gameboard } from "../js/gameboard";
import { Player } from "../js/player";

let rotate = document.createElement("img");
rotate.src = rotateIcon;
let button = document.querySelector("button.rotate");
button.appendChild(rotate);

let restartButton = document.querySelector(".restart");

let turn = "player";

let startButton = document.querySelector(".start");

let playerGrid = document.querySelector(".player > .grid-container");
let computerGrid = document.querySelector(".computer > .grid-container");
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
function computerAttack () {
    let playerAttack = true;
    disableComputerGridClickListeners();


    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    while (player1.gameboard.grid.textContent === ".") {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
    }
    while (turn === "computer" && playerAttack) {
        playerAttack = player1.gameboard.receiveAttack(row, col);
        if (playerAttack) {
            if ((row + 1) < 10) {
                row += 1;
            }   else if (row - 1 >= 0) {
                row -= 1;
            } 
        }
        if (player1.gameboard.grid.every(row => row.every(col => col === ""))) {
            const style = document.createElement("style");
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
                }
            `;
            document.head.appendChild(style);
            restartButton.style.display = "inline-block";
            return;
        }
    }
    turn = "player";
    document.querySelector("div.display").textContent = "Your turn";
    enableComputerGridClickListeners();

}


function myAttack (box) {
    let attackSuccess = computer.gameboard.receiveAttack(box.classList.value.split(" ")[0].split("-")[1], box.classList.value.split(" ")[1].split("-")[1]);
    if (!attackSuccess) {
        turn = "computer";
        disableComputerGridClickListeners();
        document.querySelector("div.display").textContent = "Computer's turn";
        setTimeout(computerAttack, 4000); 
    }   else {
        if (computer.gameboard.grid.every(row => row.every(col => col === ""))) {
            const style = document.createElement("style");
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
                }
            `;
            document.head.appendChild(style);
            restartButton.style.display = "inline-block";
            return;
        }


    }
}

function handleComputerBoxClick(event) {
    myAttack(event.target);
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
    playerGrid.innerHTML = '';
    computerGrid.innerHTML = '';

    player1 = new Player("player");
    computer = new Player("computer");
    player1.gameboard.placeShip("player");
    computer.gameboard.placeShip("computer");

    button.disabled = false;
    button.style.opacity = "1";
    button.style.cursor = "pointer";
    startButton.style.display = "inline-block";
    document.querySelector("div.display").textContent = "";

    // Remove win messages
    const style = document.querySelector('style');
    if (style) {
        document.head.removeChild(style);
    }

    // Re-add event listeners
    enableComputerGridClickListeners();
})
