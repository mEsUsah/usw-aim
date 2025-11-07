import Game from '../classes/Game.js';
import handleUserInputsGameplay from './userInputGameplay.js';
import handleUserInputPause from './userInputPause.js';
import handleUserInputMenu from './userInputMenu.js';

/** * Main handler for user inputs. 
 * Delegates to view-specific handlers.
 * @param {Game} game - The game instance.
 */
export default function handleUserInputs(game) {
    game.userInputs.forEach(input => {
        if(input.type == 'click') { 
            switch(game.view) {
                case Game.VIEW.GAMEPLAY:
                    handleUserInputsGameplay(game, input);
                    break;

                case Game.VIEW.PAUSED:
                    handleUserInputPause(game, input);
                    break;

                case Game.VIEW.MENU:
                    handleUserInputMenu(game, input);
                    break;
                
                default:
                    break;
            }
        }
    });

    // Clear processed inputs
    game.userInputs = [];
};