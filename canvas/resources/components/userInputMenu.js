import { GAME_MODE } from './Game.js';
import GameObject from './GameObject.js';
import * as gameBoard from './gameBoard.js';

export function handleUserInputMenu(game, input){
    game.gameObjects[GAME_MODE.MENU].forEach(gameObject => {
        
        // Check click on start button
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'start_button'){
                    game.gameMode = GAME_MODE.GAMEPLAY;
                    gameBoard.create(game);
                }
            }
        }
    });
}