import { GAME_MODE } from '../classes/Game.js';
import GameObject from '../classes/GameObject.js';

export function handleUserInputPause(game, input){
    game.gameObjects[GAME_MODE.PAUSED].forEach(gameObject => {
        // Check click on continue button
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'continue_button'){
                    game.mode = GAME_MODE.GAMEPLAY;
                }
            }
        }
        // Check click on stop button
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'stop_button'){
                    game.mode = GAME_MODE.MENU;
                }
            }
        }
    });
}