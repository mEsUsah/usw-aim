import { GAME_VIEW } from '../classes/Game.js';
import GameObject from '../classes/GameObject.js';

/** * Handles user inputs specific to the pause view.
 * @param {Game} game - The game instance.
 * @param {Object} input - The user input data (click coordinates).
 */
export function handleUserInputPause(game, input){
    game.gameObjects[GAME_VIEW.PAUSED].forEach(gameObject => {
        // Check click on continue button
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'continue_button'){
                    game.view = GAME_VIEW.GAMEPLAY;
                }
            }
        }
        // Check click on stop button
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'stop_button'){
                    game.view = GAME_VIEW.MENU;
                }
            }
        }
    });
}