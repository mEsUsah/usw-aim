import { GAME_MODE } from '../classes/Game.js';
import GameObject from '../classes/GameObject.js';
import * as gameBoard from '../gameBoard.js';

export function handleUserInputMenu(game, input){
    game.gameObjects[GAME_MODE.MENU].forEach(gameObject => {
        
        // Check click on start button
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'start_button'){
                    game.mode = GAME_MODE.GAMEPLAY;
                    gameBoard.create(game);
                }
                if(gameObject.config.name === 'size_button'){
                    game.state.boardSize = gameObject.config.boardSize;
                    game.updateConfig();
                }
            }
        }
    });
}