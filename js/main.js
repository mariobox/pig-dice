'use strict'

var players = [];
var turn = 0;
    
inputPlayers();
resetBoard();

document.getElementById('roll').addEventListener('click', () => {
    let play = players[turn].diceRoll();

    if (play === 1) {
        document.getElementById('dieroll').innerHTML = play;
        document.getElementById('dieroll').style.color = 'red';
        players[turn].partial = 0;
        document.getElementById('partial').innerHTML = `<h5>Current Turn Score</h5><h3>0</h3>`;
        change_turns();
    }

    else {
        document.getElementById('dieroll').innerHTML = play;
        document.getElementById('dieroll').style.color = 'black';
        players[turn].partial += play;
        document.getElementById('partial').innerHTML = `<h5>Current Turn Score</h5><h3>${players[turn].partial}</h3>`;
        if (players[turn].win()) {
            players[turn].total = 100;
            document.getElementById('partial').innerHTML = `<h5>${players[turn].name} Wins!</h5>`;
            progressBar(turn);
            playAgain();
        }

    }
});

document.getElementById('hold').addEventListener('click', () => {
    players[turn].total += players[turn].partial;
    document.getElementById('dieroll').innerHTML = '';
    progressBar(turn);
    players[turn].partial = 0;
    document.getElementById('partial').innerHTML = `<h5>Current Turn Score</h5><h3>${players[turn].partial}</h3>`;
    change_turns();
});

function inputPlayers() {
    var player1 = prompt('Name of Player 1');
    var player2 = prompt('Name of player 2');

    players = [new Player(player1), new Player(player2)];

    document.getElementById('0').innerHTML = `<h2>${players[0].name}</h2>`;
    document.getElementById('1').innerHTML = `<h2>${players[1].name}</h2>`;
}

function change_turns() {
    if (turn === 0) {
        document.getElementById('goleft').style.display = 'none';
        document.getElementById('goright').style.display = 'inline';
        turn = 1;
    } else {
        turn = 0;
        document.getElementById('goright').style.display = 'none';
        document.getElementById('goleft').style.display = 'inline';
    }
}

function playAgain() {
    document.getElementById('again').addEventListener('click', () => {
        resetBoard();
    });
}

function resetBoard() {
    turn = 0;
    for (let i = 0; i < 2; i++) {
        players[i].partial = 0;
        players[i].total = 0;
    }
    document.getElementById('partial').innerHTML = `<h5>Current Turn Score</h5><h3>0</h3>`;
    document.getElementById('dieroll').innerHTML = '';
    document.getElementById('goright').style.display = 'none';
    document.getElementById('goleft').style.display = 'inline';
    progressBar(0);
    progressBar(1);
}

function progressBar(turn) {
    let cont = document.getElementsByClassName('cont')[turn];
    cont.innerHTML = `<div class='progress'>${players[turn].total}</div>`;
    let bar = {};
    const progressProps = {
        strokeWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        color: '#0099FF',
        trailColor: '#eee',
        trailWidth: 6,
        svgStyle: null
    }

    bar = new ProgressBar.Circle(cont, progressProps);


    bar.animate(players[turn].total / 100);
}