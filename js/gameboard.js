import {Ship} from "./ship";
import battleship from "/src/sail-boat.svg";


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

    placeShip(person) {
        if (this.grid.some((row) => row.some((item) => item !== ""))) {
            this.grid = Array(10).fill().map(() => Array(10).fill(""));
            document.querySelectorAll(".player > .grid-container > div > img").forEach(icon => icon.remove());
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
                        

                            // append shipicon
                            for (let count = 0; count < ship.length; count += 1) {
                                this.grid[verticalNum][number] = ship.name;
                                let box = document.querySelector(`.${person} > .grid-container > .row-${verticalNum}.col-${number}`)
                                this.appendshipIcon(box, isVertical);
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
                            // append icon

                            for (let count = 0; count < ship.length; count += 1) {
                                this.grid[verticalNum][number] = ship.name;
                                let box = document.querySelector(`.${person} > .grid-container > .row-${verticalNum}.col-${number}`)
                                this.appendshipIcon(box, isVertical);
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
                            // append icon

                            for (let count = 0; count < ship.length; count += 1) {
                                this.grid[number][numY] = ship.name;
                                let box = document.querySelector(`.${person} > .grid-container > .row-${number}.col-${numY}`)
                                this.appendshipIcon(box, isVertical);
                                numY += 1;
                            }
                            break;
                        }  

                    }   else if (numSub >= 0 && !isVertical) {
                        let shipOccupied = this.grid[number].slice(numSub, number + 1);
                        if (shipOccupied.every(slot => slot === "")) {
                            // append icon
                            for (let count = 0; count < ship.length; count += 1) {
                                this.grid[number][numSub] = ship.name;
                                let box = document.querySelector(`.${person} > .grid-container > .row-${number}.col-${numSub}`)
                                this.appendshipIcon(box, isVertical);
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


    appendshipIcon(boxTarget, isVertical) {
        
        let shipIcon = document.createElement("img");
        shipIcon.src = battleship;
        shipIcon.classList.add("ship-icon");
        
        shipIcon.style.width = "50%";
        shipIcon.style.height = "100%";
        
        
        if (isVertical) {
            shipIcon.style.transform = "rotate(90deg) translate(-50%, -50%";
            shipIcon.style.transformOrigin = "top left";
            
            
             
        }   else {
            shipIcon.style.transform = "translate(-50%, -50%)";
        }

        boxTarget.appendChild(shipIcon);
    }

}

export {Gameboard};