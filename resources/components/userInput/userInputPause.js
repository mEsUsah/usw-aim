import Game from '../classes/Game.js';
import GameObject from '../classes/GameObject.js';

/** * Handles user inputs specific to the pause view.
 * @param {Game} game - The game instance.
 * @param {Object} input - The user input data (click coordinates).
 */
export function handleUserInputPause(game, input){
    game.gameObjects[Game.GAME_VIEW.PAUSED].forEach(gameObject => {
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'continue_button'){
                    game.view = Game.GAME_VIEW.GAMEPLAY;
                }
                if(gameObject.config.name === 'stop_button'){
                    game.view = Game.GAME_VIEW.MENU;
                }
            }
        }
    });
}