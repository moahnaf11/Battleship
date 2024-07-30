

class Ship {
    constructor(length, name, sunk=false, hit=0) {
        this.length = length;
        this.sunk = sunk;
        this.hit = hit;
        this.name = name;  
    }

    hits() {
        this.hit += 1;
        this.sunks();
    }

    sunks() {
        if (this.hit === this.length) {
            this.sunk = true;
        }
    }
}


export{Ship};