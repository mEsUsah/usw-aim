import GameObject from "../classes/GameObject.js";
import Game from "../classes/Game.js";
import * as menuShapes from "../shapes/menuShapes.js";

/**
 * Creates and adds menu UI elements to the game.
 * @param {Game} game - The game instance.
 */
export function create(game){
    const buttonOffsetY = 150;

    // Game title
    const titleText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: game.displayState.gameWidth / 2,
        y: 80,
        name: 'title_text',
    });
    menuShapes.addTitle(titleText)

    game.state.gameObjects.menu.push(titleText);
    
    // Start button
    const startButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: game.displayState.gameWidth / 2,
        y: game.displayState.gameHeight / 5 * 4,
        name: 'start_button',
        outline: {
            top: 60,
            left: 60,
            bottom: 60,
            right: 60
        }
    });
    menuShapes.addStartButton(startButton);
    game.state.gameObjects.menu.push(startButton);


    // Size buttons
    const sizeText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: 80 + buttonOffsetY,
        name: 'size_text',
    });
    sizeText.addShape(menuShapes.selectionText("Board Size:"));
    game.state.gameObjects.menu.push(sizeText);

    for(let i = 3; i <= 8; i++){
        const sizeButton = new GameObject({
            variant: GameObject.VARIANT.BUTTON,
            x: (game.displayState.gameWidth - 80 * 6) + (i - 3) * 80,
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
        game.state.gameObjects.menu.push(sizeButton);
    }


    // Win length selector
    const winLengthText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: 80 * 2 + buttonOffsetY,
        name: 'win_length_text',
    });
    winLengthText.addShape(menuShapes.selectionText("Win Length:"));
    game.state.gameObjects.menu.push(winLengthText);

    for(let i = 3; i <= 8; i++){
        const winLengthButton = new GameObject({
            variant: GameObject.VARIANT.BUTTON,
            x: (game.displayState.gameWidth - 80 * 6) + (i - 3) * 80,
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
        if(i > game.state.winLength){
            winLengthButton.addShape(menuShapes.disabledOverlay());
        }
        game.state.gameObjects.menu.push(winLengthButton);
    }

    // Game type selector
    const gameTypeText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: 80 * 3 + buttonOffsetY,
        name: 'game_type_text',
    });
    gameTypeText.addShape(menuShapes.selectionText("Game Type:"));
    game.state.gameObjects.menu.push(gameTypeText);

    const gameTypeNormalButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: (game.displayState.gameWidth - 80 * 6),
        y: 80 * 3 + buttonOffsetY,
        name: 'game_type_button',
        outline: {
            top: 30,
            left: 30,
            bottom: 30,
            right: 30
        },
        gameType: Game.TYPE.NORMAL
    });
    gameTypeNormalButton.addShape(menuShapes.buttonOutline());
    gameTypeNormalButton.addShape(menuShapes.buttonText("Nor"));
    gameTypeNormalButton.addShape(menuShapes.selectedIndicator());
    game.state.gameObjects.menu.push(gameTypeNormalButton);

    const gameTypeBlockButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: (game.displayState.gameWidth - 80 * 6) + 80,
        y: 80 * 3 + buttonOffsetY,
        name: 'game_type_button',
        outline: {
            top: 30,
            left: 30,
            bottom: 30,
            right: 30
        },
        gameType: Game.TYPE.BLOCKED
    });
    gameTypeBlockButton.addShape(menuShapes.buttonOutline());
    gameTypeBlockButton.addShape(menuShapes.buttonText("Blk"));
    game.state.gameObjects.menu.push(gameTypeBlockButton);

    // Player 2 type selector
    const player2TypeText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: 80 * 4 + buttonOffsetY,
        name: 'player_2_type_text',
    });
    player2TypeText.addShape(menuShapes.selectionText("Player 2:"));
    game.state.gameObjects.menu.push(player2TypeText);

    const player2TypeNormalButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: (game.displayState.gameWidth - 80 * 6),
        y: 80 * 4 + buttonOffsetY,
        name: 'player_2_type_button',
        outline: {
            top: 30,
            left: 30,
            bottom: 30,
            right: 30
        },
        opponentType: Game.OPPONENT.HUMAN
    });
    player2TypeNormalButton.addShape(menuShapes.buttonOutline());
    player2TypeNormalButton.addShape(menuShapes.buttonText("Hum"));
    player2TypeNormalButton.addShape(menuShapes.selectedIndicator());
    game.state.gameObjects.menu.push(player2TypeNormalButton);

    const player2TypeCpuButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: (game.displayState.gameWidth - 80 * 6) + 80,
        y: 80 * 4 + buttonOffsetY,
        name: 'player_2_type_button',
        outline: {
            top: 30,
            left: 30,
            bottom: 30,
            right: 30
        },
        opponentType: Game.OPPONENT.CPU
    });
    player2TypeCpuButton.addShape(menuShapes.buttonOutline());
    player2TypeCpuButton.addShape(menuShapes.buttonText("CPU"));
    game.state.gameObjects.menu.push(player2TypeCpuButton);

    // Stats display
    const statsText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: game.displayState.gameWidth / 2,
        y: game.displayState.gameHeight - 40,
        name: 'stats_text',
    });
    menuShapes.addStatsText(statsText, game.state.stats);
    game.state.gameObjects.menu.push(statsText);
}

/**
 * Updates the stats display to show updated game statistics.
 * @param {Game} game - The game instance.
 */
export function updateStatsText(game){
    const statsText = game.state.gameObjects.menu.find(obj => obj.config.name === 'stats_text');
    if(statsText){
        statsText.shapes = []; // Clear existing shapes
        menuShapes.addStatsText(statsText, game.state.stats);
    }
}

