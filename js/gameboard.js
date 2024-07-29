import {Ship} from "./ship";
import battleship from "/src/battleship.svg";


let isVertical;
 

class Gameboard {
    constructor() {
        this.grid = Array(10).fill().map(() => Array(10).fill(""));
        this.carrier = new Ship(5, "carrier");
        this.battleship = new Ship(4, "battleship");
        this.destroyer = new Ship(3, "destroyer");
        this.submarine = new Ship(3, "submarine");
        this.patrolBoat = new Ship(2, "patrolboat");
    }

    receiveAttack() {

    }

    placeShip() {
        if (this.grid.some((row) => row.some((item) => item !== ""))) {
            this.grid = Array(10).fill().map(() => Array(10).fill(""));
        }
        let ships = [this.carrier, this.battleship, this.destroyer, this.submarine, this.patrolBoat];
        for (let ship of ships) {
            while (true) {
                let number = Math.floor(Math.random() * 10);
                let numSub = number - (ship.length - 1);
                let numAdd = number + ship.length;
                let numY = number;
                let verticalNum = number;
                if (number < 5) {
                    isVertical = true;
                    if (numAdd <= 10 && isVertical) {
                        let gridspace = 0;
                        for (let i = 0; i < ship.length; i +=1) {
                            if (this.grid[numY][number] !== "") {
                                break;
                            }   else {
                                gridspace += 1;
                                numY += 1;
                            }
                        }

                        if (gridspace === ship.length) {
                            let shipicon = document.createElement("img");
                            shipicon.src = battleship;
                            let boxTarget = document.querySelector(`div.row-${verticalNum}.col-${number}`);
                            boxTarget.appendChild(shipicon);
                            shipicon.style.width = 
                            for (let count = 0; count < ship.length; count += 1) {
                                this.grid[verticalNum][number] = ship.name;
                                verticalNum += 1;
                            }
                            break;
                        }


                    }   else if (numSub >= 0 && isVertical) {
                        let gridcound = 0;
                        for (let i = 0; i < ship.length; i += 1) {
                            if (this.grid[verticalNum][numSub] !== "") {
                                break;
                            }   else {
                                gridcound += 1;
                                verticalNum += 1;
                            }
                        } 

                        if (gridcound === ship.length) {
                            for (let count = 0; count < ship.length; count += 1) {
                                this.grid[verticalNum][number] = ship.name;
                                verticalNum += 1;
                            }
                            break;

                        }

                    }
 

                }   else {
                    isVertical = false;
                    if (numAdd <= 10 && !isVertical) {
                        let shipOccupied = this.grid[number].slice(number, numAdd);
                        if (shipOccupied.every(slot => slot === "")) {
                            for (let count = 0; count < ship.length; count += 1) {
                                this.grid[number][numY] = ship.name;
                                numY += 1;
                            }
                            break;
                        }  

                    }   else if (numSub >= 0 && !isVertical) {
                        let shipOccupied = this.grid[number].slice(numSub, number + 1);
                        if (shipOccupied.every(slot => slot === "")) {
                            for (let count = 0; count < ship.length; count += 1) {
                                this.grid[number][numSub] = ship.name;
                                numSub += 1;
                            }
                            break;
                        }

                    } 
                }

            }

        }
        console.log(this.grid);   
    }

}

export {Gameboard};