import GameObject from "../classes/GameObject.js";
import GameShape from "../classes/GameShape.js";
import { GAME_TYPE } from "../classes/Game.js";
import { OPPONENT_TYPE } from "../classes/Game.js";
import * as gameplayShapes from "../shapes/gameplayShapes.js";

export function create(game){
    const buttonOffsetY = 150;

    // Game title
    const titleText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: game.displayData.gameWidth / 2,
        y: 80,
        name: 'title_text',
    });
    titleText.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "Noughts and Crosses",
        font: "60px Consolas",
        color: "white",
        align: "center",
        baseline: "middle"
    }));
    titleText.addShape(new GameShape('line', {
        x: -350,
        y: 35,
        x2: 350,
        y2: 35,
        color: "white",
        lineWidth: 3,      
    }));
    titleText.addShape(new GameShape('text', {
        x: 0,
        y: 60,
        text: "Stanley Skarshaug - USW student 23092388",
        font: "20px Consolas",
        color: "gray",
        align: "center",
        baseline: "middle"
    }));

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
    startButton.addShape(new GameShape('rectangle', {
        x: -60,
        y: -60,
        width: 120,
        height: 120,
        color: "red"
    }));
    startButton.addShape(new GameShape('polygon', {
        x: -0,
        y: -0,
        points: [
            {x: -30, y: -40},
            {x: 40, y: 0},
            {x: -30, y: 40}
        ],
        color: "red",
        fillColor: "red"
    }));
    game.gameObjects.menu.push(startButton);


    // Size buttons
    const sizeText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: 80 + buttonOffsetY,
        name: 'size_text',
    });
    sizeText.addShape(gameplayShapes.menuSelectionText("Board Size:"));
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
        sizeButton.addShape(gameplayShapes.menuButtonOutline());
        sizeButton.addShape(gameplayShapes.menuButtonText(`${i}x${i}`));
        if(i === game.state.boardSize){
            sizeButton.addShape(gameplayShapes.menuSelectedIndicator());
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
    winLengthText.addShape(gameplayShapes.menuSelectionText("Win Length:"));
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
        winLengthButton.addShape(gameplayShapes.menuButtonOutline());
        winLengthButton.addShape(gameplayShapes.menuButtonText(`${i}`));
        if(i === game.state.winLength){
            winLengthButton.addShape(gameplayShapes.menuSelectedIndicator());
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
    gameTypeText.addShape(gameplayShapes.menuSelectionText("Game Type:"));
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
    gameTypeNormalButton.addShape(gameplayShapes.menuButtonOutline());
    gameTypeNormalButton.addShape(gameplayShapes.menuButtonText("Nor"));
    gameTypeNormalButton.addShape(gameplayShapes.menuSelectedIndicator());
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
    gameTypeBlockButton.addShape(gameplayShapes.menuButtonOutline());
    gameTypeBlockButton.addShape(gameplayShapes.menuButtonText("Blk"));
    game.gameObjects.menu.push(gameTypeBlockButton);

    // Player 2 type selector
    const player2TypeText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: 80 * 4 + buttonOffsetY,
        name: 'player_2_type_text',
    });
    player2TypeText.addShape(gameplayShapes.menuSelectionText("Player 2:"));
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
    player2TypeNormalButton.addShape(gameplayShapes.menuButtonOutline());
    player2TypeNormalButton.addShape(gameplayShapes.menuButtonText("Hum"));
    player2TypeNormalButton.addShape(gameplayShapes.menuSelectedIndicator());
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
    player2TypeCpuButton.addShape(gameplayShapes.menuButtonOutline());
    player2TypeCpuButton.addShape(gameplayShapes.menuButtonText("CPU"));
    game.gameObjects.menu.push(player2TypeCpuButton);
}

