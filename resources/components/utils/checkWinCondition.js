/**
 * Check for a win condition in all directions from the selected tile.
 * @param {Game} game - The game instance.
 * @param {GameObject} selectedTile - The tile that was picked.
 * @returns {Object|boolean} - Coordinates of the winning line if a win is found, false otherwise.
 */
export default function(game, selectedTile){
    
    // check →
    const weWin = checkWin(game, selectedTile, 1, 0);
    if(weWin) return weWin;

    // check ↘
    const nwseWin = checkWin(game, selectedTile, 1, 1);
    if(nwseWin) return nwseWin;

    // check ↓
    const nsWin = checkWin(game, selectedTile, 0, 1);
    if(nsWin) return nsWin;
    
    // check ↙
    const neswWin = checkWin(game, selectedTile, -1, 1);
    if(neswWin) return neswWin;

    return false;
}

/**
 * Check for a win condition in a specific direction from the selected tile.
 * @param {Game} game - The game instance.
 * @param {GameObject} selectedTile - The tile that was picked.
 * @param {number} xDirection - The x direction to check (1 (right), 0, or -1 (left)).
 * @param {number} yDirection - The y direction to check (1 (down), 0, or -1 (up)).
 * @returns {Object|boolean} - Coordinates of the winning line if a win is found, false otherwise.
 */
function checkWin(game, selectedTile, xDirection, yDirection){
    // find first in the opposite direction ("draw bow")
    let firstFoundLocation = selectedTile.config.location;
    let returnObject = {
        x: null,
        y: null,
        x2: null,
        y2: null,
    };

    let currentX = selectedTile.config.location.x;
    let currentY = selectedTile.config.location.y;
    while(currentX >= 0 && currentY >= 0 && currentX < game.config.boardSize && currentY < game.config.boardSize){
        // stop search if checked tile is unused or occupied by anything else than the current player
        if(!game.state.gameFields[currentX][currentY].state || game.state.gameFields[currentX][currentY].state.occupiedBy != selectedTile.state.occupiedBy){
            break;
        }
        firstFoundLocation = game.state.gameFields[currentX][currentY].config.location;
        returnObject.x = game.state.gameFields[currentX][currentY].config.x
        returnObject.y = game.state.gameFields[currentX][currentY].config.y
        
        currentX -= xDirection;
        currentY -= yDirection;

    }

    // count win length from first found in the given direction ("shoot arrow")
    let score = 0;
    currentX = firstFoundLocation.x;
    currentY = firstFoundLocation.y;
    while(currentX < game.config.boardSize && currentY < game.config.boardSize && currentX >= 0 && currentY >= 0){
        // stop counting if checked tile is unused or occupied by anything else than the current player
        if(!game.state.gameFields[currentX][currentY].state || game.state.gameFields[currentX][currentY].state.occupiedBy != selectedTile.state.occupiedBy){
            break;
        }
        score++;
        if (score >= game.state.winLength){
            returnObject.x2 = game.state.gameFields[currentX][currentY].config.x;
            returnObject.y2 = game.state.gameFields[currentX][currentY].config.y;
            return returnObject;
        }
        currentX += xDirection;
        currentY += yDirection;
    }
    return false;
}