'use strict'

class Player {
    constructor(name, partial, total) {
        this.name = name;
        this.partial = 0;
        this.total = 0;
    }

    diceRoll() {
        var randomNumber = Math.floor(Math.random() * 6) + 1;
        return randomNumber;         // return effectively ends the program
    }

    

    win() {
        if (this.total + this.partial >= 100) {
            this.total += this.partial;
            console.log(`Game over. Player ${players[turn].name} wins with ${this.total} points.`);
            return true;
        }
    }

    
}
