import Game from '../classes/Game.js';
import { handleUserInputsGameplay } from './userInputGameplay.js';
import { handleUserInputPause } from './userInputPause.js';
import { handleUserInputMenu } from './userInputMenu.js';

/** * Main handler for user inputs. 
 * Delegates to view-specific handlers.
 * @param {Game} game - The game instance.
 */
export function handleUserInputs(game) {
        game.userInputs.forEach(input => {
            if(input.type == 'click') { 
                switch(game.view) {
                    case Game.GAME_VIEW.GAMEPLAY:
                        handleUserInputsGameplay(game, input);
                        break;

                    case Game.GAME_VIEW.PAUSED:
                        handleUserInputPause(game, input);
                        break;

                    case Game.GAME_VIEW.MENU:
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