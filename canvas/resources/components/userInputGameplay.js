import { GAME_MODE } from './Game.js';
import * as uiGameplay from './uiGameplay.js';
import GameShape from './GameShape.js';
import GameShapeAnimation from './GameShapeAnimation.js';
import GameObject from './GameObject.js';

export function handleUserInputsGameplay(game, input){
    game.gameObjects[GAME_MODE.GAMEPLAY].forEach(gameObject => {
        // Check clock on board cells
        if (gameObject.config.variant == GameObject.VARIANT.BOARD) {
            if (gameObject.checkCollision(input.x, input.y) && gameObject.state.occupiedBy == null) {
                gameObject.state.occupiedBy = game.gameState.currentPlayer; 

                switch(game.gameState.currentPlayer){
                    case 1:
                        addCrossShape(game, gameObject);
                        game.gameState.currentPlayer = 2;
                        break;
                    case 2:
                        addCircleShape(game, gameObject);
                        game.gameState.currentPlayer = 1;
                        break;
                    default:
                        break;
                }

                uiGameplay.updateTurnSymbol(game);
            }
        }

        // Check click on menu button
        if (gameObject.config.variant == GameObject.VARIANT.BUTTON) {
            if (gameObject.checkCollision(input.x, input.y)) {
                if(gameObject.config.name === 'menu_button'){
                    game.gameMode = GAME_MODE.PAUSED;
                }
            }
        }
        
    });
}

function addCrossShape(game, gameObject){
    const line1 = new GameShape('line', {
        x: game.gameConfig.cellPadding - game.gameConfig.cellWidth/2,
        y: game.gameConfig.cellPadding - game.gameConfig.cellHeight/2,
        x2: game.gameConfig.cellWidth/2 - game.gameConfig.cellPadding,
        y2: game.gameConfig.cellHeight/2 - game.gameConfig.cellPadding,
        color: "rgba(40, 151, 255, 1)",
        lineWidth: 4,
    });
    line1.addAnimation(new GameShapeAnimation({
        duration: 150,
        direction: GameShapeAnimation.BACKWARD,
    }));
    gameObject.addShape(line1);
    
    const line2 = new GameShape('line', {
        x: game.gameConfig.cellPadding - game.gameConfig.cellWidth/2,
        y: game.gameConfig.cellHeight/2 - game.gameConfig.cellPadding,
        x2: game.gameConfig.cellWidth/2 - game.gameConfig.cellPadding,
        y2: -game.gameConfig.cellHeight/2 + game.gameConfig.cellPadding,
        color: "rgba(40, 151, 255, 1)",
        lineWidth: 4,
    });
    line2.addAnimation(new GameShapeAnimation({
        duration: 150,
        startDelay: 150
    }));
    gameObject.addShape(line2);
}

function addCircleShape(game, gameObject){
    const circle = new GameShape('circle', {
        x: 0,
        y: 0,
        radius: (game.gameConfig.cellWidth/2) - game.gameConfig.cellPadding,
        color: "rgba(248, 66, 66, 1)",
        lineWidth: 4,
    });
    circle.addAnimation(new GameShapeAnimation({
        duration: 300,
    }));

    gameObject.addShape(circle);
}