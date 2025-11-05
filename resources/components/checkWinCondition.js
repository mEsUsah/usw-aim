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

function checkWin(game, selectedTile, xDirection, yDirection){
    // find first (draw bow)
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
        if(!game.gameFields[currentX][currentY].state || game.gameFields[currentX][currentY].state.occupiedBy != selectedTile.state.occupiedBy){
            break;
        }
        firstFoundLocation = game.gameFields[currentX][currentY].config.location;
        returnObject.x = game.gameFields[currentX][currentY].config.x
        returnObject.y = game.gameFields[currentX][currentY].config.y
        
        currentX -= xDirection;
        currentY -= yDirection;

    }

    // count (shoot arrow)
    let score = 0;
    currentX = firstFoundLocation.x;
    currentY = firstFoundLocation.y;
    while(currentX < game.config.boardSize && currentY < game.config.boardSize && currentX >= 0 && currentY >= 0){
        // stop counting if chekced tile is unused or occupied by anyting else than the current player
        if(!game.gameFields[currentX][currentY].state || game.gameFields[currentX][currentY].state.occupiedBy != selectedTile.state.occupiedBy){
            break;
        }
        score++;
        if (score >= game.state.winLength){
            returnObject.x2 = game.gameFields[currentX][currentY].config.x;
            returnObject.y2 = game.gameFields[currentX][currentY].config.y;
            return returnObject;
        }
        currentX += xDirection;
        currentY += yDirection;
    }
    return false;
}