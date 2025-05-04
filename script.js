document.addEventListener('DOMContentLoaded', function() {
    // Game state
    const gameState = {
        realMadrid: {
            substitutionsUsed: 0,
            maxSubstitutions: 5,
            formation: '4-3-3'
        },
        psg: {
            substitutionsUsed: 0,
            maxSubstitutions: 5,
            formation: '4-3-3'
        },
        substitutionInProgress: null
    };

    // Player data
    const teamsData = {
        realMadrid: {
            players: [
                { id: 1, name: "T. COURTOIS", position: "GK", rating: 89, image: "https://media.api-sports.io/football/players/1100.png", onPitch: true },
                { id: 2, name: "D. CARVAJAL", position: "DEF", rating: 82, image: "https://media.api-sports.io/football/players/1101.png", onPitch: true },
                { id: 3, name: "EDER MILITAO", position: "DEF", rating: 83, image: "https://media.api-sports.io/football/players/1102.png", onPitch: true },
                { id: 4, name: "D. ALABA", position: "DEF", rating: 85, image: "https://media.api-sports.io/football/players/1103.png", onPitch: true },
                { id: 5, name: "F. MENDY", position: "DEF", rating: 82, image: "https://media.api-sports.io/football/players/1104.png", onPitch: true },
                { id: 6, name: "CASEMIRO", position: "MID", rating: 88, image: "https://media.api-sports.io/football/players/1105.png", onPitch: true },
                { id: 7, name: "T. KROOS", position: "MID", rating: 86, image: "https://media.api-sports.io/football/players/1106.png", onPitch: true },
                { id: 8, name: "L. MODRIC", position: "MID", rating: 87, image: "https://media.api-sports.io/football/players/1107.png", onPitch: true },
                { id: 9, name: "RODRYGO", position: "FWD", rating: 83, image: "https://media.api-sports.io/football/players/1108.png", onPitch: true },
                { id: 10, name: "K. BENZEMA", position: "FWD", rating: 89, image: "https://media.api-sports.io/football/players/1109.png", onPitch: true },
                { id: 11, name: "VINICIUS JR", position: "FWD", rating: 84, image: "https://media.api-sports.io/football/players/1110.png", onPitch: true }
            ],
            substitutes: [
                { id: 12, name: "L. VÁZQUEZ", position: "DEF", rating: 78, image: "https://media.api-sports.io/football/players/1111.png", onPitch: false },
                { id: 13, name: "NACHO", position: "DEF", rating: 79, image: "https://media.api-sports.io/football/players/1112.png", onPitch: false },
                { id: 14, name: "F. VALVERDE", position: "MID", rating: 84, image: "https://media.api-sports.io/football/players/1113.png", onPitch: false },
                { id: 15, name: "E. CAMAVINGA", position: "MID", rating: 80, image: "https://media.api-sports.io/football/players/1114.png", onPitch: false },
                { id: 16, name: "A. LUNIN", position: "GK", rating: 76, image: "https://media.api-sports.io/football/players/1115.png", onPitch: false },
                { id: 17, name: "M. ASENSIO", position: "FWD", rating: 81, image: "https://media.api-sports.io/football/players/1116.png", onPitch: false }
            ]
        },
        psg: {
            players: [
                { id: 101, name: "G. DONNARUMMA", position: "GK", rating: 87, image: "https://media.api-sports.io/football/players/2000.png", onPitch: true },
                { id: 102, name: "A. HAKIMI", position: "DEF", rating: 84, image: "https://media.api-sports.io/football/players/2001.png", onPitch: true },
                { id: 103, name: "S. RAMOS", position: "DEF", rating: 85, image: "https://media.api-sports.io/football/players/2002.png", onPitch: true },
                { id: 104, name: "MARQUINHOS", position: "DEF", rating: 87, image: "https://media.api-sports.io/football/players/2003.png", onPitch: true },
                { id: 105, name: "N. MENDES", position: "DEF", rating: 82, image: "https://media.api-sports.io/football/players/2004.png", onPitch: true },
                { id: 106, name: "M. VERATTI", position: "MID", rating: 87, image: "https://media.api-sports.io/football/players/2005.png", onPitch: true },
                { id: 107, name: "VITINHA", position: "MID", rating: 82, image: "https://media.api-sports.io/football/players/2006.png", onPitch: true },
                { id: 108, name: "F. RUIZ", position: "MID", rating: 81, image: "https://media.api-sports.io/football/players/2007.png", onPitch: true },
                { id: 109, name: "L. MESSI", position: "FWD", rating: 91, image: "https://media.api-sports.io/football/players/2008.png", onPitch: true },
                { id: 110, name: "K. MBAPPÉ", position: "FWD", rating: 91, image: "https://media.api-sports.io/football/players/2009.png", onPitch: true },
                { id: 111, name: "NEYMAR JR", position: "FWD", rating: 89, image: "https://media.api-sports.io/football/players/2010.png", onPitch: true }
            ],
            substitutes: [
                { id: 112, name: "P. KIMPEMBE", position: "DEF", rating: 83, image: "https://media.api-sports.io/football/players/2011.png", onPitch: false },
                { id: 113, name: "D. PEREIRA", position: "MID", rating: 80, image: "https://media.api-sports.io/football/players/2012.png", onPitch: false },
                { id: 114, name: "C. SOLER", position: "MID", rating: 81, image: "https://media.api-sports.io/football/players/2013.png", onPitch: false },
                { id: 115, name: "K. NAVAS", position: "GK", rating: 84, image: "https://media.api-sports.io/football/players/2014.png", onPitch: false },
                { id: 116, name: "R. SANCHES", position: "MID", rating: 80, image: "https://media.api-sports.io/football/players/2015.png", onPitch: false },
                { id: 117, name: "H. EKITIKÉ", position: "FWD", rating: 77, image: "https://media.api-sports.io/football/players/2016.png", onPitch: false }
            ]
        }
    };

    // Formation positions (x, y coordinates on pitch)
    const formationPositions = {
        '4-3-3': {
            GK: { x: 10, y: 50 },
            DEF: [
                { x: 25, y: 15 }, { x: 25, y: 35 }, { x: 25, y: 65 }, { x: 25, y: 85 }
            ],
            MID: [
                { x: 50, y: 30 }, { x: 50, y: 50 }, { x: 50, y: 70 }
            ],
            FWD: [
                { x: 75, y: 30 }, { x: 75, y: 50 }, { x: 75, y: 70 }
            ]
        },
        '4-4-2': {
            GK: { x: 10, y: 50 },
            DEF: [
                { x: 25, y: 15 }, { x: 25, y: 35 }, { x: 25, y: 65 }, { x: 25, y: 85 }
            ],
            MID: [
                { x: 45, y: 20 }, { x: 45, y: 40 }, { x: 45, y: 60 }, { x: 45, y: 80 }
            ],
            FWD: [
                { x: 70, y: 40 }, { x: 70, y: 60 }
            ]
        },
        '4-2-3-1': {
            GK: { x: 10, y: 50 },
            DEF: [
                { x: 25, y: 15 }, { x: 25, y: 35 }, { x: 25, y: 65 }, { x: 25, y: 85 }
            ],
            MID: [
                { x: 40, y: 40 }, { x: 40, y: 60 },
                { x: 60, y: 30 }, { x: 60, y: 50 }, { x: 60, y: 70 }
            ],
            FWD: [
                { x: 80, y: 50 }
            ]
        },
        '3-5-2': {
            GK: { x: 10, y: 50 },
            DEF: [
                { x: 25, y: 30 }, { x: 25, y: 50 }, { x: 25, y: 70 }
            ],
            MID: [
                { x: 40, y: 15 }, { x: 40, y: 35 }, { x: 50, y: 50 }, { x: 40, y: 65 }, { x: 40, y: 85 }
            ],
            FWD: [
                { x: 70, y: 40 }, { x: 70, y: 60 }
            ]
        }
    };

    // Initialize the app
    init();

    function init() {
        renderTeams();
        setupEventListeners();
        updateSubstitutionCounters();
    }

    function renderTeams() {
        renderTeam('realMadrid');
        renderTeam('psg');
    }

    function renderTeam(teamId) {
        const team = teamsData[teamId];
        const formation = gameState[teamId].formation;
        
        // Clear previous players
        document.getElementById(`starting-xi${teamId === 'psg' ? '-2' : ''}`).innerHTML = '';
        document.getElementById(`substitutes${teamId === 'psg' ? '-2' : ''}`).innerHTML = '';
        document.getElementById(`pitch${teamId === 'psg' ? '-2' : ''}`).innerHTML = '';
        
        // Update formation display
        if (teamId === 'realMadrid') {
            document.getElementById('formation-display').textContent = `Current Formation: ${formation}`;
        }
        
        // Render players on pitch
        const pitch = document.getElementById(`pitch${teamId === 'psg' ? '-2' : ''}`);
        
        // Group players by position
        const playersByPosition = {
            GK: [],
            DEF: [],
            MID: [],
            FWD: []
        };
        
        team.players.forEach(player => {
            if (player.onPitch) {
                playersByPosition[player.position].push(player);
            }
        });
        
        // Position GK
        if (playersByPosition.GK.length > 0) {
            const gk = playersByPosition.GK[0];
            const pos = formationPositions[formation].GK;
            createPlayerOnPitch(gk, pos.x, pos.y, pitch, teamId);
        }
        
        // Position DEF
        playersByPosition.DEF.forEach((defender, i) => {
            if (formationPositions[formation].DEF[i]) {
                const pos = formationPositions[formation].DEF[i];
                createPlayerOnPitch(defender, pos.x, pos.y, pitch, teamId);
            }
        });
        
        // Position MID
        playersByPosition.MID.forEach((midfielder, i) => {
            if (formationPositions[formation].MID[i]) {
                const pos = formationPositions[formation].MID[i];
                createPlayerOnPitch(midfielder, pos.x, pos.y, pitch, teamId);
            }
        });
        
        // Position FWD
        playersByPosition.FWD.forEach((forward, i) => {
            if (formationPositions[formation].FWD[i]) {
                const pos = formationPositions[formation].FWD[i];
                createPlayerOnPitch(forward, pos.x, pos.y, pitch, teamId);
            }
        });
        
        // Render substitutes
        team.substitutes.forEach(sub => {
            if (!sub.onPitch) {
                createSubstituteCard(sub, teamId);
            }
        });
    }

    function createPlayerOnPitch(player, xPercent, yPercent, pitchElement, teamId) {
        const playerElement = document.createElement('div');
        playerElement.className = 'player-on-pitch';
        playerElement.dataset.id = player.id;
        playerElement.dataset.team = teamId;
        playerElement.style.left = `${xPercent}%`;
        playerElement.style.top = `${yPercent}%`;
        playerElement.innerHTML = `
            <div class="player-name">${player.name.split(' ').pop()}</div>
            <div class="player-rating">${player.rating}</div>
        `;
        
        // Make draggable for potential position changes
        playerElement.draggable = true;
        playerElement.addEventListener('dragstart', handleDragStart);
        
        // Click to substitute
        playerElement.addEventListener('click', () => {
            if (gameState.substitutionInProgress && 
                gameState.substitutionInProgress.team === teamId && 
                gameState.substitutionInProgress.inPlayer) {
                // This is the player being substituted out
                gameState.substitutionInProgress.outPlayer = player;
                showSubstitutionModal(teamId);
            }
        });
        
        pitchElement.appendChild(playerElement);
    }

    function createSubstituteCard(player, teamId) {
        const subsContainer = document.getElementById(`substitutes${teamId === 'psg' ? '-2' : ''}`);
        const subCard = document.createElement('div');
        subCard.className = 'substitute-card';
        subCard.dataset.id = player.id;
        subCard.dataset.team = teamId;
        subCard.innerHTML = `
            <div class="player-name">${player.name}</div>
            <div class="player-position">${player.position}</div>
            <div class="player-rating">${player.rating}</div>
        `;
        
        // Click to select for substitution
        subCard.addEventListener('click', () => {
            if (gameState[teamId].substitutionsUsed >= gameState[teamId].maxSubstitutions) {
                alert('Maximum substitutions reached for this team!');
                return;
            }
            
            if (!gameState.substitutionInProgress) {
                // Start new substitution
                gameState.substitutionInProgress = {
                    team: teamId,
                    inPlayer: player,
                    outPlayer: null
                };
                
                // Highlight substitute and players on pitch
                subCard.classList.add('highlighted');
                document.querySelectorAll(`.player-on-pitch[data-team="${teamId}"]`).forEach(p => {
                    p.style.cursor = 'pointer';
                    p.style.border = '2px solid yellow';
                });
            } else if (gameState.substitutionInProgress.team === teamId && 
                      gameState.substitutionInProgress.inPlayer.id === player.id) {
                // Cancel this substitution
                cancelSubstitution(teamId);
            }
        });
        
        subsContainer.appendChild(subCard);
    }

    function showSubstitutionModal(teamId) {
        const modal = document.getElementById('substitution-modal');
        const { inPlayer, outPlayer } = gameState.substitutionInProgress;
        
        document.getElementById('out-player-name').textContent = outPlayer.name;
        document.getElementById('in-player-name').textContent = inPlayer.name;
        
        modal.style.display = 'block';
        
        // Setup modal buttons
        document.getElementById('confirm-sub').onclick = () => {
            performSubstitution(teamId);
            modal.style.display = 'none';
        };
        
        document.getElementById('cancel-sub').onclick = () => {
            cancelSubstitution(teamId);
            modal.style.display = 'none';
        };
        
        document.querySelector('.close-modal').onclick = () => {
            cancelSubstitution(teamId);
            modal.style.display = 'none';
        };
    }

    function performSubstitution(teamId) {
        const { inPlayer, outPlayer } = gameState.substitutionInProgress;
        const team = teamsData[teamId];
        
        // Update player status
        outPlayer.onPitch = false;
        inPlayer.onPitch = true;
        
        // Update game state
        gameState[teamId].substitutionsUsed++;
        gameState.substitutionInProgress = null;
        
        // Re-render team
        renderTeam(teamId);
        updateSubstitutionCounters();
    }

    function cancelSubstitution(teamId) {
        gameState.substitutionInProgress = null;
        
        // Remove highlights
        document.querySelectorAll('.substitute-card.highlighted').forEach(card => {
            card.classList.remove('highlighted');
        });
        
        document.querySelectorAll('.player-on-pitch').forEach(player => {
            player.style.cursor = '';
            player.style.border = '';
        });
    }

    function updateSubstitutionCounters() {
        document.getElementById('substitution-counter').textContent = 
            `Substitutions used: ${gameState.realMadrid.substitutionsUsed}/${gameState.realMadrid.maxSubstitutions} (RM) | ${gameState.psg.substitutionsUsed}/${gameState.psg.maxSubstitutions} (PSG)`;
    }

    function setupEventListeners() {
        // Formation changes
        document.getElementById('formation-select').addEventListener('change', (e) => {
            gameState.realMadrid.formation = e.target.value;
            renderTeam('realMadrid');
        });
        
        document.getElementById('formation-select-2').addEventListener('change', (e) => {
            gameState.psg.formation = e.target.value;
            renderTeam('psg');
        });
        
        // Reset button
        document.getElementById('reset-btn').addEventListener('click', resetTeams);
        
        // Drag and drop for player movement
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        document.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('football-pitch')) {
                const playerId = e.dataTransfer.getData('text/plain');
                const playerElement = document.querySelector(`.player-on-pitch[data-id="${playerId}"]`);
                
                if (playerElement) {
                    const rect = e.target.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const xPercent = (x / rect.width) * 100;
                    const yPercent = (y / rect.height) * 100;
                    
                    playerElement.style.left = `${Math.max(5, Math.min(95, xPercent))}%`;
                    playerElement.style.top = `${Math.max(5, Math.min(95, yPercent))}%`;
                }
            }
        });
    }

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.id);
    }

    function resetTeams() {
        // Reset Real Madrid
        teamsData.realMadrid.players.forEach(p => p.onPitch = true);
        teamsData.realMadrid.substitutes.forEach(p => p.onPitch = false);
        gameState.realMadrid.substitutionsUsed = 0;
        gameState.realMadrid.formation = '4-3-3';
        document.getElementById('formation-select').value = '4-3-3';
        
        // Reset PSG
        teamsData.psg.players.forEach(p => p.onPitch = true);
        teamsData.psg.substitutes.forEach(p => p.onPitch = false);
        gameState.psg.substitutionsUsed = 0;
        gameState.psg.formation = '4-3-3';
        document.getElementById('formation-select-2').value = '4-3-3';
        
        // Reset UI
        gameState.substitutionInProgress = null;
        renderTeams();
        updateSubstitutionCounters();
    }
});