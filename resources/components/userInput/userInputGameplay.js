import Game from '../classes/Game.js';
import * as uiGameplay from '../ui/uiGameplay.js';
import GameObject from '../classes/GameObject.js';
import checkWinCondition from '../utils/checkWinCondition.js';
import checkDrawCondition from '../utils/checkDrawCondition.js';
import * as gameplayObjects from '../gameObjects/gameplayObjects.js'
import * as gameplayShapes from '../shapes/gameplayShapes.js'
import * as statUtils from '../utils/statUtils.js';

/** * Handles user inputs specific to the gameplay view.
 * @param {Game} game - The game instance.
 * @param {Object} input - The user input data (click coordinates).
 */
export default function handleUserInputsGameplay(game, input){
    game.state.gameObjects[Game.VIEW.GAMEPLAY].forEach(gameObject => {
        // Check click on board cells
        if (game.state.gameOver == false && gameObject.config.variant == GameObject.VARIANT.BOARD) {
            if (gameObject.checkCollision(input.x, input.y) && gameObject.state.occupiedBy == null) {
                gameObject.state.occupiedBy = game.state.currentPlayer; 
                game.state.occupiedSpaces++;
                
                // Add shape based on current player
                switch(game.state.currentPlayer){
                    case 1:
                        gameplayShapes.addGameboardCross(game, gameObject);
                        break;
                    case 2:
                        gameplayShapes.addGameboardCircle(game, gameObject);
                        break;
                    default:
                        break;
                }

                // Check for win/draw conditions
                const gameWon = checkWinCondition(game, gameObject);
                if(gameWon){
                    gameplayObjects.addWinLine(game,gameWon);
                    game.state.gameOver = true;
                    gameplayObjects.addGameOverText(game, "Game Over");
                    statUtils.update(game, game.state.currentPlayer);
                    return;
                }
                const gameDraw = checkDrawCondition(game);
                if(gameDraw){
                    game.state.gameOver = true;
                    gameplayObjects.addGameOverText(game, "Game Over");
                    statUtils.update(game, 0); // 0 for draw
                    return;
                }

                // change turn
                switch(game.state.currentPlayer){
                    case 1:
                        game.state.currentPlayer = 2;
                        break;
                    case 2:
                        game.state.currentPlayer = 1;
                        break;
                    default:
                        break;
                }

                uiGameplay.updateTurnSymbol(game);
            }
        }

        // Check click on pause button
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'pause_button'){
                    game.state.view = Game.VIEW.PAUSED;
                }
                if(gameObject.config.name === 'stop_button'){
                    game.state.view = Game.VIEW.MENU;
                }
            }
        }
        
    });
}