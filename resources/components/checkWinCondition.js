export default function(game, selectedTile){
    console.log("clicked: x:" + selectedTile.config.location.x + ", y:" + selectedTile.config.location.y);
    // Check west-east win
    // find first to the west
    let firstFoundLocation = selectedTile.config.location;
    let currentX = selectedTile.config.location.x;
    let currentY = selectedTile.config.location.y;
    while(currentX >= 0){
        console.log(game.gameFields[currentX][currentY]);
        if(!game.gameFields[currentX][currentY].state || game.gameFields[currentX][currentY].state.occupiedBy != selectedTile.state.occupiedBy){
            break;
        }
        firstFoundLocation = game.gameFields[currentX][currentY].config.location;
        currentX--;
    }
    // count from west to east
    let score = 0;
    currentX = firstFoundLocation.x;
    currentY = firstFoundLocation.y;
    while(currentX < game.config.boardSize){
        if(!game.gameFields[currentX][currentY].state || game.gameFields[currentX][currentY].state.occupiedBy != selectedTile.state.occupiedBy){
            break;
        }
        score++;
        console.log("scored! current score: " + score);
        if (score >= game.state.winLength){
            console.log("PLAYER " + selectedTile.state.occupiedBy + " WINS!");
            return;
        }
        currentX++;
    }
}