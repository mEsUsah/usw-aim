import { GAME_MODE } from './Game.js';
import { handleUserInputsGameplay } from './userInputGameplay.js';
import { handleUserInputPause } from './userInputPause.js';
import { handleUserInputMenu } from './userInputMenu.js';

export function handleUserInputs(game) {
        game.userInputs.forEach(input => {
            if(input.type == 'click') { 
                switch(game.mode) {
                    case GAME_MODE.GAMEPLAY:
                        handleUserInputsGameplay(game, input);
                        break;

                    case GAME_MODE.PAUSED:
                        handleUserInputPause(game, input);
                        break;

                    case GAME_MODE.MENU:
                        handleUserInputMenu(game, input);
                        break;
                    
                    default:
                        break;
                }
            }
        });
        game.userInputs = [];
    };