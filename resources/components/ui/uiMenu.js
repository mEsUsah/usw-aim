import GameObject from "../classes/GameObject.js";
import GameShape from "../classes/GameShape.js";
import { GAME_TYPE } from "../classes/Game.js";
import { OPPONENT_TYPE } from "../classes/Game.js";

export function create(game){
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
        y: game.displayData.gameHeight / 4 * 1,
        name: 'size_text',
    });
    sizeText.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "Board Size:",
        font: "30px Consolas",
        color: "white",
        align: "left",
        baseline: "middle"
    }));
    game.gameObjects.menu.push(sizeText);

    for(let i = 3; i <= 8; i++){
        const sizeButton = new GameObject({
            variant: GameObject.VARIANT.BUTTON,
            x: (game.displayData.gameWidth - 80 * 6) + (i - 3) * 80,
            y: game.displayData.gameHeight / 4 * 1,
            name: `size_button`,
            outline: {
                top: 30,
                left: 30,
                bottom: 30,
                right: 30
            },
            boardSize: i
        });

        sizeButton.addShape(new GameShape('rectangle', {
            x: -30,
            y: -30,
            width: 60,
            height: 60,
            color: "gray"
        }));
        sizeButton.addShape(new GameShape('text', {
            x: 0,
            y: 0,
            text: `${i}x${i}`,
            font: "30px Consolas",
            color: "white",
            align: "center",
            baseline: "middle"
        }));

        if(i === game.state.boardSize){
            sizeButton.addShape(getSelectedIndicator());
        }
        game.gameObjects.menu.push(sizeButton);
    }


    // Win length selector
    const winLengthText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: game.displayData.gameHeight / 4 * 1 + 100,
        name: 'win_length_text',
    });
    winLengthText.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "Win Length:",
        font: "30px Consolas",
        color: "white",
        align: "left",
        baseline: "middle"
    }));
    game.gameObjects.menu.push(winLengthText);

    for(let i = 3; i <= 8; i++){
        const winLengthButton = new GameObject({
            variant: GameObject.VARIANT.BUTTON,
            x: (game.displayData.gameWidth - 80 * 6) + (i - 3) * 80,
            y: game.displayData.gameHeight / 4 * 1 + 100,
            name: 'win_length_button',
            outline: {
                top: 30,
                left: 30,
                bottom: 30,
                right: 30
            },
            winLength: i
        });

        winLengthButton.addShape(new GameShape('rectangle', {
            x: -30,
            y: -30,
            width: 60,
            height: 60,
            color: "gray"
        }));
        winLengthButton.addShape(new GameShape('text', {
            x: 0,
            y: 0,
            text: `${i}`,
            font: "30px Consolas",
            color: "white",
            align: "center",
            baseline: "middle"
        }));

        if(i === game.state.winLength){
            winLengthButton.addShape(getSelectedIndicator());
        }
        game.gameObjects.menu.push(winLengthButton);
    }

    // Game type selector
    const gameTypeText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: game.displayData.gameHeight / 4 * 1 + 200,
        name: 'game_type_text',
    });
    gameTypeText.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "Game Type:",
        font: "30px Consolas",
        color: "white",
        align: "left",
        baseline: "middle"
    }));
    game.gameObjects.menu.push(gameTypeText);

    const gameTypeNormalButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: (game.displayData.gameWidth - 80 * 6),
        y: game.displayData.gameHeight / 4 * 1 + 200,
        name: 'game_type_button',
        outline: {
            top: 30,
            left: 30,
            bottom: 30,
            right: 30
        },
        gameType: GAME_TYPE.NORMAL
    });

    gameTypeNormalButton.addShape(new GameShape('rectangle', {
        x: -30,
        y: -30,
        width: 60,
        height: 60,
        color: "gray"
    }));
    gameTypeNormalButton.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "Nor",
        font: "30px Consolas",
        color: "white",
        align: "center",
        baseline: "middle"
    }));
    gameTypeNormalButton.addShape(getSelectedIndicator());
    game.gameObjects.menu.push(gameTypeNormalButton);

    const gameTypeBlockButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: (game.displayData.gameWidth - 80 * 6) + 80,
        y: game.displayData.gameHeight / 4 * 1 + 200,
        name: 'game_type_button',
        outline: {
            top: 30,
            left: 30,
            bottom: 30,
            right: 30
        },
        gameType: GAME_TYPE.BLOCKED
    });

    gameTypeBlockButton.addShape(new GameShape('rectangle', {
        x: -30,
        y: -30,
        width: 60,
        height: 60,
        color: "gray"
    }));
    gameTypeBlockButton.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "Blk",
        font: "30px Consolas",
        color: "white",
        align: "center",
        baseline: "middle"
    }));

    game.gameObjects.menu.push(gameTypeBlockButton);

    // Player 2 type selector
    const player2TypeText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: game.displayData.gameHeight / 4 * 1 + 300,
        name: 'player_2_type_text',
    });
    player2TypeText.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "Player 2:",
        font: "30px Consolas",
        color: "white",
        align: "left",
        baseline: "middle"
    }));
    game.gameObjects.menu.push(player2TypeText);

    const player2TypeNormalButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: (game.displayData.gameWidth - 80 * 6),
        y: game.displayData.gameHeight / 4 * 1 + 300,
        name: 'player_2_type_button',
        outline: {
            top: 30,
            left: 30,
            bottom: 30,
            right: 30
        },
        opponentType: OPPONENT_TYPE.HUMAN
    });

    player2TypeNormalButton.addShape(new GameShape('rectangle', {
        x: -30,
        y: -30,
        width: 60,
        height: 60,
        color: "gray"
    }));
    player2TypeNormalButton.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "Hum",
        font: "30px Consolas",
        color: "white",
        align: "center",
        baseline: "middle"
    }));
    player2TypeNormalButton.addShape(getSelectedIndicator());
    game.gameObjects.menu.push(player2TypeNormalButton);

    const player2TypeCpuButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: (game.displayData.gameWidth - 80 * 6) + 80,
        y: game.displayData.gameHeight / 4 * 1 + 300,
        name: 'player_2_type_button',
        outline: {
            top: 30,
            left: 30,
            bottom: 30,
            right: 30
        },
        opponentType: OPPONENT_TYPE.CPU
    });

    player2TypeCpuButton.addShape(new GameShape('rectangle', {
        x: -30,
        y: -30,
        width: 60,
        height: 60,
        color: "gray"
    }));
    player2TypeCpuButton.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "CPU",
        font: "30px Consolas",
        color: "white",
        align: "center",
        baseline: "middle"
    }));

    game.gameObjects.menu.push(player2TypeCpuButton);

}

export function getSelectedIndicator(){
    return new GameShape('line', {
        x: -20,
        y: 17,
        x2: 20,
        y2: 17,
        color: "red",
        lineWidth: 5,      
        name: 'selected_indicator'
    });
}