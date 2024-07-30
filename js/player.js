import { Gameboard } from "./gameboard"

class Player {
    constructor(type) {
        this.gameboard = new Gameboard(type);
    }

}

export {Player};