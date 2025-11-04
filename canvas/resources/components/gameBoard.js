import GameObject from "./GameObject.js";
import GameShape from "./GameShape.js";

export function create(game){
    // Clear existing game board objects
    game.gameObjects.gameplay = game.gameObjects.gameplay.filter(obj => obj.config.variant !== GameObject.VARIANT.BOARD);
    game.gameFields = [];
    
    // Initialize board cells
    for (let i = 0; i < game.gameConfig.boardSize; i++) {
        for (let j = 0; j < game.gameConfig.boardSize; j++) {
            const gameObject = new GameObject({
                variant: GameObject.VARIANT.BOARD,
                x: game.gameConfig.cellWidth / 2 + j * game.gameConfig.cellWidth + game.gameConfig.boardMargin,
                y: game.gameConfig.cellHeight / 2 + i * game.gameConfig.cellHeight + game.gameConfig.boardMargin,
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
            game.gameFields.push(gameObject);
        }
    }
}