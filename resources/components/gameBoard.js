import GameObject from "./GameObject.js";
import GameShape from "./GameShape.js";

export function create(game){
    // Clear existing game board objects
    game.gameObjects.gameplay = game.gameObjects.gameplay.filter(obj => obj.config.variant !== GameObject.VARIANT.BOARD);
    game.gameFields = [];

    // Initialize board cells
    for (let i = 0; i < game.config.boardSize; i++) {
        for (let j = 0; j < game.config.boardSize; j++) {
            const gameObject = new GameObject({
                variant: GameObject.VARIANT.BOARD,
                x: game.config.cellWidth / 2 + j * game.config.cellWidth + game.config.boardMargin,
                y: game.config.cellHeight / 2 + i * game.config.cellHeight + game.config.boardMargin,
                name: `board_${i}_${j}`,
                outline: {
                    top: game.config.cellHeight / 2,
                    left: game.config.cellWidth / 2,
                    bottom: game.config.cellHeight / 2,
                    right: game.config.cellWidth / 2
                }
            });
            const shape = new GameShape('rectangle', {
                x: -game.config.cellWidth / 2,
                y: -game.config.cellHeight / 2,
                width: game.config.cellWidth,
                height: game.config.cellHeight,
                color: "gray"
            });
            gameObject.addShape(shape);
            game.gameObjects.gameplay.push(gameObject);
            game.gameFields.push(gameObject);
        }
    }
}