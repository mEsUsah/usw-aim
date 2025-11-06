import GameObject from "../classes/GameObject.js";
import { GAME_TYPE } from "../classes/Game.js";
import { OPPONENT_TYPE } from "../classes/Game.js";
import * as menuShapes from "../shapes/menuShapes.js";

export function create(game){
    const buttonOffsetY = 150;

    // Game title
    const titleText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: game.displayData.gameWidth / 2,
        y: 80,
        name: 'title_text',
    });
    menuShapes.addTitle(titleText)

    game.gameObjects.menu.push(titleText);
    
    // Start button
    const startButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: game.displayData.gameWidth / 2,
        y: game.displayData.gameHeight / 5 * 4,
        name: 'start_button',
        outline: {
            top: 60,
            left: 60,
            bottom: 60,
            right: 60
        }
    });
    menuShapes.addStartButton(startButton);
    game.gameObjects.menu.push(startButton);


    // Size buttons
    const sizeText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: 80 + buttonOffsetY,
        name: 'size_text',
    });
    sizeText.addShape(menuShapes.selectionText("Board Size:"));
    game.gameObjects.menu.push(sizeText);

    for(let i = 3; i <= 8; i++){
        const sizeButton = new GameObject({
            variant: GameObject.VARIANT.BUTTON,
            x: (game.displayData.gameWidth - 80 * 6) + (i - 3) * 80,
            y: 80 + buttonOffsetY,
            name: `size_button`,
            outline: {
                top: 30,
                left: 30,
                bottom: 30,
                right: 30
            },
            boardSize: i
        });
        sizeButton.addShape(menuShapes.buttonOutline());
        sizeButton.addShape(menuShapes.buttonText(`${i}x${i}`));
        if(i === game.state.boardSize){
            sizeButton.addShape(menuShapes.selectedIndicator());
        }
        game.gameObjects.menu.push(sizeButton);
    }


    // Win length selector
    const winLengthText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: 80 * 2 + buttonOffsetY,
        name: 'win_length_text',
    });
    winLengthText.addShape(menuShapes.selectionText("Win Length:"));
    game.gameObjects.menu.push(winLengthText);

    for(let i = 3; i <= 8; i++){
        const winLengthButton = new GameObject({
            variant: GameObject.VARIANT.BUTTON,
            x: (game.displayData.gameWidth - 80 * 6) + (i - 3) * 80,
            y: 80 * 2 + buttonOffsetY,
            name: 'win_length_button',
            outline: {
                top: 30,
                left: 30,
                bottom: 30,
                right: 30
            },
            winLength: i
        });
        winLengthButton.addShape(menuShapes.buttonOutline());
        winLengthButton.addShape(menuShapes.buttonText(`${i}`));
        if(i === game.state.winLength){
            winLengthButton.addShape(menuShapes.selectedIndicator());
        }
        game.gameObjects.menu.push(winLengthButton);
    }

    // Game type selector
    const gameTypeText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: 80 * 3 + buttonOffsetY,
        name: 'game_type_text',
    });
    gameTypeText.addShape(menuShapes.selectionText("Game Type:"));
    game.gameObjects.menu.push(gameTypeText);

    const gameTypeNormalButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: (game.displayData.gameWidth - 80 * 6),
        y: 80 * 3 + buttonOffsetY,
        name: 'game_type_button',
        outline: {
            top: 30,
            left: 30,
            bottom: 30,
            right: 30
        },
        gameType: GAME_TYPE.NORMAL
    });
    gameTypeNormalButton.addShape(menuShapes.buttonOutline());
    gameTypeNormalButton.addShape(menuShapes.buttonText("Nor"));
    gameTypeNormalButton.addShape(menuShapes.selectedIndicator());
    game.gameObjects.menu.push(gameTypeNormalButton);

    const gameTypeBlockButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: (game.displayData.gameWidth - 80 * 6) + 80,
        y: 80 * 3 + buttonOffsetY,
        name: 'game_type_button',
        outline: {
            top: 30,
            left: 30,
            bottom: 30,
            right: 30
        },
        gameType: GAME_TYPE.BLOCKED
    });
    gameTypeBlockButton.addShape(menuShapes.buttonOutline());
    gameTypeBlockButton.addShape(menuShapes.buttonText("Blk"));
    game.gameObjects.menu.push(gameTypeBlockButton);

    // Player 2 type selector
    const player2TypeText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: 80 * 4 + buttonOffsetY,
        name: 'player_2_type_text',
    });
    player2TypeText.addShape(menuShapes.selectionText("Player 2:"));
    game.gameObjects.menu.push(player2TypeText);

    const player2TypeNormalButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: (game.displayData.gameWidth - 80 * 6),
        y: 80 * 4 + buttonOffsetY,
        name: 'player_2_type_button',
        outline: {
            top: 30,
            left: 30,
            bottom: 30,
            right: 30
        },
        opponentType: OPPONENT_TYPE.HUMAN
    });
    player2TypeNormalButton.addShape(menuShapes.buttonOutline());
    player2TypeNormalButton.addShape(menuShapes.buttonText("Hum"));
    player2TypeNormalButton.addShape(menuShapes.selectedIndicator());
    game.gameObjects.menu.push(player2TypeNormalButton);

    const player2TypeCpuButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: (game.displayData.gameWidth - 80 * 6) + 80,
        y: 80 * 4 + buttonOffsetY,
        name: 'player_2_type_button',
        outline: {
            top: 30,
            left: 30,
            bottom: 30,
            right: 30
        },
        opponentType: OPPONENT_TYPE.CPU
    });
    player2TypeCpuButton.addShape(menuShapes.buttonOutline());
    player2TypeCpuButton.addShape(menuShapes.buttonText("CPU"));
    game.gameObjects.menu.push(player2TypeCpuButton);

    // Stats display
    const statsText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: game.displayData.gameWidth / 2,
        y: game.displayData.gameHeight - 40,
        name: 'stats_text',
    });
    menuShapes.addStatsText(statsText, game.state.stats);
    game.gameObjects.menu.push(statsText);
}

export function updateStatsText(game){
    const statsText = game.gameObjects.menu.find(obj => obj.config.name === 'stats_text');
    if(statsText){
        statsText.shapes = []; // Clear existing shapes
        menuShapes.addStatsText(statsText, game.state.stats);
    }
}

