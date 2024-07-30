import "./style.css";
import rotateIcon from './rotate-360.svg';
import { Ship } from "../js/ship";
import { Gameboard } from "../js/gameboard";

let rotate = document.createElement("img");
rotate.src = rotateIcon;
let button = document.querySelector("button.rotate");
button.appendChild(rotate);

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

let player1 = new Gameboard();
player1.placeShip("player");
let computer = new Gameboard();
computer.placeShip("computer");

button.addEventListener("click", () => player1.placeShip("player"));