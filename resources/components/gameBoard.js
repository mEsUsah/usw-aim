import Game from "./classes/Game.js";
import GameObject from "./classes/GameObject.js";
import GameShape from "./classes/GameShape.js";

export function create(game){
    // Clear win lines from previous games
    game.state.gameObjects.gameplay = game.state.gameObjects.gameplay.filter(obj => obj.config.name != "win_line");

    // Clear game over text
    game.state.gameObjects.gameplay = game.state.gameObjects.gameplay.filter(obj => obj.config.name != "gameover_text");
    
    // Clear existing game board objects
    game.state.gameObjects.gameplay = game.state.gameObjects.gameplay.filter(obj => obj.config.variant !== GameObject.VARIANT.BOARD);
    game.state.gameFields = [];

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
            game.state.gameObjects.gameplay.push(gameObject);
            gameFieldRow.push(gameObject);
        }
        game.state.gameFields.push(gameFieldRow);
    }

    // GameType Blocked
    if(game.state.gameType === Game.TYPE.BLOCKED){
        const cellsToBlock = game.state.boardSize - 2; // 2 less than board size to ensure that winning is not too hard
        for (let i = 0; i < cellsToBlock; i++){
            while(true){ // Keep trying until an unoccupied cell is found
                const randX = Math.floor(Math.random() * game.state.boardSize);
                const randY = Math.floor(Math.random() * game.state.boardSize);
                const gameObject = game.state.gameFields[randX][randY];
                if(gameObject.state.occupiedBy == null){
                    gameObject.state.occupiedBy = 0; // Blocked
                    gameObject.addShape(new GameShape('rectangle', {
                        x: -game.config.cellWidth / 2 + 4,
                        y: -game.config.cellHeight / 2 + 4,
                        width: game.config.cellWidth - 8,
                        height: game.config.cellHeight - 8,
                        color: "black",
                        fillColor: "gray",
                    }));
                    gameObject.addShape(new GameShape('text', {
                        x: 0,
                        y: 0,
                        text: "blocked",
                        font: `${game.config.cellWidth / 8}px Consolas`,
                        color: "black",
                        align: "center",
                        baseline: "middle"
                    }));
                    break;
                }
            }
            game.state.occupiedSpaces++;
        }
    }
}