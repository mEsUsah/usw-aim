import Game from '../classes/Game.js';
import GameObject from '../classes/GameObject.js';

/** * Handles user inputs specific to the pause view.
 * @param {Game} game - The game instance.
 * @param {Object} input - The user input data (click coordinates).
 */
export default function handleUserInputPause(game, input){
    game.gameObjects[Game.VIEW.PAUSED].forEach(gameObject => {
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'continue_button'){
                    game.view = Game.VIEW.GAMEPLAY;
                }
                if(gameObject.config.name === 'stop_button'){
                    game.view = Game.VIEW.MENU;
                }
            }
        }
    });
}