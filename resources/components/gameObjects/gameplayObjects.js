import GameObject from "../classes/GameObject";
import GameShape from "../classes/GameShape";
import GameShapeAnimation from "../classes/GameShapeAnimation";

/**
 * Adds a line to indicate that caused a win on the game board.
 * @param {object} game - The game instance.
 * @param {object} winLineCoordinates - The coordinates of the winning line.
 */
export function addWinLine(game, winLineCoordinates){
    const winLineObject = new GameObject({
        variant: GameObject.VARIANT.ILLUSTRATION,
        x: 0,
        y: 0,
        name: `win_line`,
    });

    const winLineShape = new GameShape('line', {
        x: winLineCoordinates.x,
        y: winLineCoordinates.y,
        x2: winLineCoordinates.x2,
        y2: winLineCoordinates.y2,
        color: "red",
        lineWidth: 15,
    });

    winLineShape.addAnimation(new GameShapeAnimation({
        duration: 300,
    }));
    
    winLineObject.addShape(winLineShape);
    game.state.gameObjects.gameplay.push(winLineObject);
}

/**
 * Adds a game over text to the top of the gameplay scene.
 * @param {object} game - The game instance.
 * @param {string} text - The text to display.
 */
export function addGameOverText(game, text){
    const gameOverTextObject = new GameObject({
        variant: GameObject.VARIANT.ILLUSTRATION,
        x: game.displayData.gameWidth / 2,
        y: 32,
        name: `gameover_text`,
    });
    
    gameOverTextObject.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: text,
        font: "48px Consolas",
        color: "red",
        align: "center",
        baseline: "middle",
    }));

    game.state.gameObjects.gameplay.push(gameOverTextObject);
}