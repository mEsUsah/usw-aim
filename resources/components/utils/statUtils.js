import * as uiMenu from '../ui/uiMenu.js';

/** 
 * Retrieve stats from localStorage.
 * Creates datastructure if not found.
 * @returns {Object} - The stats data.
 */
export function getData() {
    // check if localStorage has stats, if not initialize it
    if (!localStorage.getItem('gameStats')) {
        const initialStats = {
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            gamesDrawn: 0,
        };
        localStorage.setItem('gameStats', JSON.stringify(initialStats));
    }
    return JSON.parse(localStorage.getItem('gameStats'));
}

/** 
 * Save stats to localStorage.
 * @param {Object} stats - The stats data to save.
 */
export function setData(stats) {
    localStorage.setItem('gameStats', JSON.stringify(stats));
}

/** 
 * Update stats based on game outcome.
 * @param {Game} game - The game instance.
 * @param {number} winner - The winner of the game (player 1 or 2. 0 for draw).
 */
export function update(game, winner){
    game.state.stats.gamesPlayed++;
    switch(winner) {
        case 1:
            game.state.stats.gamesWon++;
            break;
        case 2:
            game.state.stats.gamesLost++;
            break;
        default:
            game.state.stats.gamesDrawn++;
            break;
    }
    setData(game.state.stats);
    uiMenu.updateStatsText(game);
}