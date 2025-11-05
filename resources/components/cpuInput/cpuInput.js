import * as gameObjectShapes from '../shapes/gameObjectShapes.js';
import checkWinCondition from '../checkWinCondition.js';
import checkDrawCondition from '../checkDrawCondition.js';
import * as uiGameplay from '../ui/uiGameplay.js';
import * as gameplayObjects from '../gameObjects/gameplayObjects.js';

export function handleCpuInput(game){
    pickRandomTile(game);
}

function pickRandomTile(game){
    while(true){
        const randX = Math.floor(Math.random() * game.state.boardSize);
        const randY = Math.floor(Math.random() * game.state.boardSize);
        const gameObject = game.gameFields[randX][randY];
        if(gameObject.state.occupiedBy == null){
            gameObject.state.occupiedBy = game.state.currentPlayer; 
            game.state.occupiedSpaces++;
            
            gameObjectShapes.addCircleShape(game, gameObject); // CPU is always player 2
            game.state.currentPlayer = 1;

            // Check for win/draw conditions
            const gameWon = checkWinCondition(game, gameObject);
            if(gameWon){
                gameplayObjects.addWinLine(game,gameWon);
                game.state.gameOver = true;
                gameplayObjects.addGameOverText(game, "Game Over");
                break;
            }
            const gameDraw = checkDrawCondition(game);
            if(gameDraw){
                game.state.gameOver = true;
                gameplayObjects.addGameOverText(game, "Game Over");
                break;
            }

            uiGameplay.updateTurnSymbol(game);
            break;
        }
    }
    return;
}
