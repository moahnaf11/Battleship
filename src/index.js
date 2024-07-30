import "./style.css";
import rotateIcon from './rotate-360.svg';
import { Ship } from "../js/ship";
import { Gameboard } from "../js/gameboard";
import { Player } from "../js/player";

let rotate = document.createElement("img");
rotate.src = rotateIcon;
let button = document.querySelector("button.rotate");
button.appendChild(rotate);

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
    startButton.disabled = true;
    startButton.style.opacity = "0.5";
    startButton.style.cursor = "not-allowed";

    if (turn === "player") {
        document.querySelector("div.display").textContent = "Your turn";
    }

})

let computerDiv = document.querySelectorAll(".computer > .grid-container > div");
computerDiv.forEach((box) => {
    box.addEventListener("click", () => computer.gameboard.receiveAttack(box.classList.value.split(" ")[0].split("-")[1], box.classList.value.split(" ")[1].split("-")[1]));
})


