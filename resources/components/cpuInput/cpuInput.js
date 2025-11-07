import checkWinCondition from '../checkWinCondition.js';
import checkDrawCondition from '../checkDrawCondition.js';
import * as gameplayShapes from '../shapes/gameplayShapes.js';
import * as uiGameplay from '../ui/uiGameplay.js';
import * as gameplayObjects from '../gameObjects/gameplayObjects.js';
import * as statUtils from '../utils/statUtils.js';

/** 
 * Handles CPU inputs during gameplay.
 * Emulates a player making a decision.
 * @param {Game} game - The game instance.
 */
export default function handleCpuInput(game){
    // Wait a moment to give illusion of decision time
    game.state.cpuWaitTime -= game.frameData.deltaTime;
    if(game.state.cpuWaitTime > 0){
        return;
    }
    game.state.cpuWaitTime = game.state.cpuMoveDelay;
    
    pickRandomField(game);
}

/**
 * Pick a random unoccupied field on the game board.
 * @param {Game} game  - The game instance.
 * @returns 
 */
function pickRandomField(game){
    while(true){
        const randX = Math.floor(Math.random() * game.state.boardSize);
        const randY = Math.floor(Math.random() * game.state.boardSize);
        const gameObject = game.state.gameFields[randX][randY];
        if(gameObject.state.occupiedBy == null){
            gameObject.state.occupiedBy = game.state.currentPlayer; 
            game.state.occupiedSpaces++;
            
            gameplayShapes.addGameboardCircle(game, gameObject); // CPU is always player 2
            game.state.currentPlayer = 1;

            // Check for win/draw conditions
            const gameWon = checkWinCondition(game, gameObject);
            if(gameWon){
                gameplayObjects.addWinLine(game,gameWon);
                game.state.gameOver = true;
                gameplayObjects.addGameOverText(game, "Game Over");
                statUtils.update(game, 2);
                break;
            }
            const gameDraw = checkDrawCondition(game);
            if(gameDraw){
                game.state.gameOver = true;
                gameplayObjects.addGameOverText(game, "Game Over");
                statUtils.update(game, 0); // 0 for draw
                break;
            }

            uiGameplay.updateTurnSymbol(game);
            break;
        }
    }
    return;
}
