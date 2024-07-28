

class Ship {
    constructor(length, sunk=false, hit=0) {
        this.length = length;
        this.sunk = sunk;
        this.hit = hit; 
    }

    hits() {
        this.hit += 1;

    }

    sunks() {
        if (this.hit === this.length) {
            this.sunk = true;
        }
    }
}

let carrier = new Ship(5);
let battleship = new Ship(4);
let destroyer = new Ship(3);
let submarine = new Ship(3);
let patrolBoat = new Ship(2);


export{carrier, battleship, destroyer, submarine, patrolBoat};