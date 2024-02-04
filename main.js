let players = [];

window.onload = function () {
    // Load players from local storage when the page loads
    const storedPlayers = localStorage.getItem('cricketPlayers');
    if (storedPlayers) {
        players = JSON.parse(storedPlayers);
        displayPlayers();
    }
}

function addPlayer() {
    const playerName = document.getElementById('playerName').value;
    const runsScored = parseInt(document.getElementById('runsScored').value) || 0;
    const runsConceded = parseInt(document.getElementById('runsConceded').value) || 0;
    const wicketsTaken = parseInt(document.getElementById('wicketsTaken').value) || 0;
    const contribution = parseInt(document.getElementById('contribution').value) || 0;
    const matchesPlayed = parseInt(document.getElementById('matchesPlayed').value) || 0;

    if (playerName && !isNaN(runsScored) && !isNaN(runsConceded) && !isNaN(wicketsTaken) && !isNaN(contribution) && !isNaN(matchesPlayed)) {
        const player = {
            name: playerName,
            runs: runsScored,
            conceded: runsConceded,
            wickets: wicketsTaken,
            contribution: contribution,
            matches: matchesPlayed
        };
        players.push(player);
        displayPlayers();
        clearForm();

        // Save players to local storage
        localStorage.setItem('cricketPlayers', JSON.stringify(players));
    } else {
        alert('Please enter valid player information.');
    }
}

function deletePlayer(index) {
    players.splice(index, 1);
    displayPlayers();

    // Save players to local storage
    localStorage.setItem('cricketPlayers', JSON.stringify(players));
}

function updatePlayer(index) {
    const runsScored = parseInt(prompt('Enter additional runs scored:')) || 0;
    const runsConceded = parseInt(prompt('Enter additional runs conceded:')) || 0;
    const wicketsTaken = parseInt(prompt('Enter additional wickets taken:')) || 0;
    const contribution = parseInt(prompt('Enter additional contribution:')) || 0;
    const matchesPlayed = parseInt(prompt('Enter additional matches played:')) || 0;

    if (!isNaN(runsScored) || !isNaN(runsConceded) || !isNaN(wicketsTaken) || !isNaN(contribution) || !isNaN(matchesPlayed)) {
        players[index] = {
            ...players[index],
            runs: (players[index].runs || 0) + runsScored,
            conceded: (players[index].conceded || 0) + runsConceded,
            wickets: (players[index].wickets || 0) + wicketsTaken,
            contribution: (players[index].contribution || 0) + contribution,
            matches: (players[index].matches || 0) + matchesPlayed
        };
        displayPlayers();

        // Save players to local storage
        localStorage.setItem('cricketPlayers', JSON.stringify(players));
    } else {
        alert('Invalid input. Player not updated.');
    }
}

function displayPlayers() {
    const playersSection = document.getElementById('players');
    playersSection.innerHTML = '';

    players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.innerHTML = `
            <strong>${player.name}</strong> - 
            Runs Scored: ${player.runs}, 
            Runs Conceded: ${player.conceded},
            Wickets Taken: ${player.wickets},
            Contribution: ${player.contribution},
            Matches Played: ${player.matches}
            <button onclick="updatePlayer(${index})">Update</button>
            <button onclick="deletePlayer(${index})">Delete</button>
        `;
        playersSection.appendChild(playerDiv);
    });
}

function clearForm() {
    document.getElementById('playerForm').reset();
}
