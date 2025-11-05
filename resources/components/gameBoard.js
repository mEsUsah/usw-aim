import GameObject from "./classes/GameObject.js";
import GameShape from "./classes/GameShape.js";

export function create(game){
    // Clear win lines from previous games
    game.gameObjects.gameplay = game.gameObjects.gameplay.filter(obj => obj.config.name != "win_line");

    // Clear game over text
    game.gameObjects.gameplay = game.gameObjects.gameplay.filter(obj => obj.config.name != "gameover_text");
    
    // Clear existing game board objects
    game.gameObjects.gameplay = game.gameObjects.gameplay.filter(obj => obj.config.variant !== GameObject.VARIANT.BOARD);
    game.gameFields = [];

    // Initialize new board cells
    for (let x = 0; x < game.config.boardSize; x++) {
        let gameFieldRow = [];
        for (let y = 0; y < game.config.boardSize; y++) {
            const gameObject = new GameObject({
                variant: GameObject.VARIANT.BOARD,
                x: game.config.cellWidth / 2 + x * game.config.cellWidth + game.config.boardMargin,
                y: game.config.cellHeight / 2 + y * game.config.cellHeight + game.config.boardMargin,
                name: `board_tile`,
                outline: {
                    top: game.config.cellHeight / 2,
                    left: game.config.cellWidth / 2,
                    bottom: game.config.cellHeight / 2,
                    right: game.config.cellWidth / 2
                },
                location: {
                    x: x,
                    y: y,
                },
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
            gameFieldRow.push(gameObject);
        }
        game.gameFields.push(gameFieldRow);
    }
}