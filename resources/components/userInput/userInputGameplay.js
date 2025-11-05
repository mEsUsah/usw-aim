import { GAME_MODE } from '../classes/Game.js';
import * as uiGameplay from '../ui/uiGameplay.js';
import GameObject from '../classes/GameObject.js';
import checkWinCondition from '../checkWinCondition.js';
import checkDrawCondition from '../checkDrawCondition.js';
import * as gameplayObjects from '../gameObjects/gameplayObjects.js'
import * as gameObjectShapes from '../shapes/gameObjectShapes.js'

export function handleUserInputsGameplay(game, input){
    game.gameObjects[GAME_MODE.GAMEPLAY].forEach(gameObject => {
        // Check click on board cells
        if (game.state.gameOver == false && gameObject.config.variant == GameObject.VARIANT.BOARD) {
            if (gameObject.checkCollision(input.x, input.y) && gameObject.state.occupiedBy == null) {
                gameObject.state.occupiedBy = game.state.currentPlayer; 
                game.state.occupiedSpaces++;
                
                switch(game.state.currentPlayer){
                    case 1:
                        gameObjectShapes.addCrossShape(game, gameObject);
                        game.state.currentPlayer = 2;
                        break;
                    case 2:
                        gameObjectShapes.addCircleShape(game, gameObject);
                        game.state.currentPlayer = 1;
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
                    return;
                }
                const gameDraw = checkDrawCondition(game);
                if(gameDraw){
                    game.state.gameOver = true;
                    gameplayObjects.addGameOverText(game, "Game Over");
                    return;
                }

                uiGameplay.updateTurnSymbol(game);
            }
        }

        // Check click on menu button
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'menu_button'){
                    game.mode = GAME_MODE.PAUSED;
                }
            }
        }
        
    });
}