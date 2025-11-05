export default function(game, selectedTile){
    console.log("clicked: x:" + selectedTile.config.location.x + ", y:" + selectedTile.config.location.y);
    
    console.log("checking →");
    if(checkWin(game, selectedTile, 1, 0)){
        console.log("Win!!");
        return
    }

    console.log("checking ↘");
    if(checkWin(game, selectedTile, 1, 1)){
        console.log("Win!!");
        return
    }

    console.log("checking ↓");
    if(checkWin(game, selectedTile, 0, 1)){
        console.log("Win!!");
        return
    }
    
    console.log("checking ↙");
    if(checkWin(game, selectedTile, -1, 1)){
        console.log("Win!!");
        return
    }
}

function checkWin(game, selectedTile, xDirection, yDirection){
    // find first (draw bow)
    let firstFoundLocation = selectedTile.config.location;
    let currentX = selectedTile.config.location.x;
    let currentY = selectedTile.config.location.y;
    while(currentX >= 0 && currentY >= 0 && currentX < game.config.boardSize && currentY < game.config.boardSize){
        // stop search if checked tile is unused or occupied by anything else than the current player
        if(!game.gameFields[currentX][currentY].state || game.gameFields[currentX][currentY].state.occupiedBy != selectedTile.state.occupiedBy){
            break;
        }
        firstFoundLocation = game.gameFields[currentX][currentY].config.location;
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
            return true;
        }
        currentX += xDirection;
        currentY += yDirection;
    }
    return false;
}