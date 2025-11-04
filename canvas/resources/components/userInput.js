import { GAME_MODE } from './Game.js';
import GameObject from './GameObject.js';
import * as gameBoard from './gameBoard.js';
import { handleUserInputsGameplay } from './userInputGameplay.js';

export function handleUserInputs(game) {
        game.userInputs.forEach(input => {
            if(input.type == 'click') { 
                switch(game.gameMode) {
                    case GAME_MODE.GAMEPLAY:
                        handleUserInputsGameplay(game, input);
                        break;

                    case GAME_MODE.PAUSED:
                        game.gameObjects[GAME_MODE.PAUSED].forEach(gameObject => {
                            // Check click on continue button
                            if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
                                if (gameObject.checkCollision(input.x, input.y)) {
                                    if(gameObject.config.name === 'continue_button'){
                                        game.gameMode = GAME_MODE.GAMEPLAY;
                                    }
                                }
                            }
                            // Check click on stop button
                            if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
                                if (gameObject.checkCollision(input.x, input.y)) {
                                    if(gameObject.config.name === 'stop_button'){
                                        game.gameMode = GAME_MODE.MENU;
                                    }
                                }
                            }
                        });
                        break;

                    case GAME_MODE.MENU:
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
                        break;
                    
                    default:
                        break;
                }
            }
        });
        game.userInputs = [];
    };