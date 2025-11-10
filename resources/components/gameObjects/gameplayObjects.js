import GameObject from "../classes/GameObject";
import GameShape from "../classes/GameShape";
import GameShapeAnimation from "../classes/GameShapeAnimation";

/**
 * Adds a line to indicate what caused a win on the game board.
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
        color: "white",
        lineWidth: 15,
        ttl: 300,
    });

    winLineShape.addAnimation(new GameShapeAnimation({
        duration: 300,
        direction: GameShapeAnimation.FORWARD,
    }));
    winLineObject.addShape(winLineShape);
    
    const winLineShape2 = new GameShape('line', {
        x: winLineCoordinates.x,
        y: winLineCoordinates.y,
        x2: winLineCoordinates.x2,
        y2: winLineCoordinates.y2,
        color: "white",
        lineWidth: 15,
        ttl: 1000,
    });

    winLineShape2.addAnimation(new GameShapeAnimation({
        duration: 300,
        direction: GameShapeAnimation.BACKWARD,
        startDelay: 600,
        displayDelay: 300,
    }));
    winLineObject.addShape(winLineShape2);

    game.state.gameObjects.gameplay.push(winLineObject);
}

/**
 * Adds cross to indicate that the game ended in a draw.
 * @param {object} game - The game instance.
 */
export function addDrawLine(game){
    console.log("Adding draw line");
    const drawLineObject = new GameObject({
        variant: GameObject.VARIANT.ILLUSTRATION,
        x: 0,
        y: 0,
        name: `win_line`,
    });

    // First line
    const drawLineShape1fw = new GameShape('line', {
        x: 100,
        y: 100,
        x2: game.displayState.gameWidth - 100,
        y2: game.displayState.gameHeight - 100,
        color: "white",
        lineWidth: 15,
        ttl: 300,
    });
    drawLineShape1fw.addAnimation(new GameShapeAnimation({
        duration: 300,
        direction: GameShapeAnimation.FORWARD,
        
    }));
    drawLineObject.addShape(drawLineShape1fw);
    
    const drawLineShape1re = new GameShape('line', {
        x: 100,
        y: 100,
        x2: game.displayState.gameWidth - 100,
        y2: game.displayState.gameHeight - 100,
        color: "white",
        lineWidth: 15,
        ttl: 1000,
    });
    drawLineShape1re.addAnimation(new GameShapeAnimation({
        duration: 300,
        startDelay: 600,
        displayDelay: 300,
        direction: GameShapeAnimation.BACKWARD,
    }));
    drawLineObject.addShape(drawLineShape1re);
    
    // Second line
    const drawLineShape2fw = new GameShape('line', {
        x: game.displayState.gameWidth - 100,
        y: 100,
        x2: 100,
        y2: game.displayState.gameHeight - 100,
        color: "white",
        lineWidth: 15,
        ttl: 300,
    });
    drawLineShape2fw.addAnimation(new GameShapeAnimation({
        duration: 300,
        direction: GameShapeAnimation.FORWARD,
        
    }));
    drawLineObject.addShape(drawLineShape2fw);
    
    const drawLineShape2re = new GameShape('line', {
        x: game.displayState.gameWidth - 100,
        y: 100,
        x2: 100,
        y2: game.displayState.gameHeight - 100,
        color: "white",
        lineWidth: 15,
        ttl: 1000,
    });
    drawLineShape2re.addAnimation(new GameShapeAnimation({
        duration: 300,
        startDelay: 600,
        displayDelay: 300,
        direction: GameShapeAnimation.BACKWARD,
    }));
    drawLineObject.addShape(drawLineShape2re);
    
   
    game.state.gameObjects.gameplay.push(drawLineObject);
}

/**
 * Adds a game over text to the top of the gameplay scene.
 * @param {object} game - The game instance.
 * @param {string} text - The text to display.
 */
export function addGameOverText(game, text){
    const gameOverTextObject = new GameObject({
        variant: GameObject.VARIANT.ILLUSTRATION,
        x: game.displayState.gameWidth / 2,
        y: game.displayState.gameHeight / 2,
        name: `gameover_text`,
    });

    const gameOverTextShape = new GameShape('text', {
        x: 0,
        y: 0,
        text: text,
        font: "84px GameFont",
        color: "white",
        align: "center",
        baseline: "middle",
    });
    gameOverTextShape.addAnimation(new GameShapeAnimation({
        displayDelay: 900,
    }));
    gameOverTextObject.addShape(gameOverTextShape);
    

    game.state.gameObjects.gameplay.push(gameOverTextObject);
}