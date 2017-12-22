'use strict'

class Player {
    constructor(name, partial, total) {
        this.name = name;
        this.partial = 0;
        this.total = 0;
    }

    diceRoll() {
        var randomNumber = Math.floor(Math.random() * 6) + 1;
        return randomNumber;         
    }

    

    win() {
        if (this.total + this.partial >= 100) {
            this.total = 100;
            return true;
        }
    }

    
}
