
/**
 * Check if the game has reached a draw condition.
 * A draw occurs when all spaces on the board are occupied.
 * @param {Game} game - The game instance.
 * @returns {boolean} - True if the game is currently a draw, false otherwise.
 */
export default function(game){
    const maxSpaces = game.state.boardSize ** 2;
    const occupiedSpaces = game.state.occupiedSpaces;
    const drawCondition = occupiedSpaces >= maxSpaces;
    
    return drawCondition;
}