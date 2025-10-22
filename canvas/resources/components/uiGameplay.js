import GameObject from "./GameObject.js";
import GameShape from "./GameShape.js";

export function createGameBoard(game){
    // Initialize board cells
    for (let i = 0; i < game.gameConfig.boardSize; i++) {
        for (let j = 0; j < game.gameConfig.boardSize; j++) {
            const gameObject = new GameObject({
                variant: GameObject.VARIANT.BOARD,
                x: game.gameConfig.cellWidth / 2 + i * game.gameConfig.cellWidth + game.gameConfig.boardMargin,
                y: game.gameConfig.cellHeight / 2 + j * game.gameConfig.cellHeight + game.gameConfig.boardMargin,
                name: `board_${i}_${j}`,
                outline: {
                    top: game.gameConfig.cellHeight / 2,
                    left: game.gameConfig.cellWidth / 2,
                    bottom: game.gameConfig.cellHeight / 2,
                    right: game.gameConfig.cellWidth / 2
                }
            });
            const shape = new GameShape('rectangle', {
                x: -game.gameConfig.cellWidth / 2,
                y: -game.gameConfig.cellHeight / 2,
                width: game.gameConfig.cellWidth,
                height: game.gameConfig.cellHeight,
                color: "gray"
            });
            gameObject.addShape(shape);
            game.gameObjects.gameplay.push(gameObject);
        }
    }
}

export function createGameplayUI(game){
    // Menu button
    const menuButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: game.displayData.gameWidth - 30,
        y: 30,
        name: 'menu_button',
        outline: {
            top: 20,
            left: 20,
            bottom: 20,
            right: 20
        }
    });
    menuButton.addShape(new GameShape('rectangle', {
        x: -20,
        y: -20,
        width: 40,
        height: 40,
        color: "red"
    }));
    menuButton.addShape(new GameShape('line', {
        x: -12,
        y: -10,
        x2: 12,
        y2: -10,
        color: "red"
    }));
    menuButton.addShape(new GameShape('line', {
        x: -12,
        y: 0,
        x2: 12,
        y2: 0,
        color: "red"
    }));
    menuButton.addShape(new GameShape('line', {
        x: -12,
        y: 10,
        x2: 12,
        y2: 10,
        color: "red"
    }));
    game.gameObjects.gameplay.push(menuButton);
}