import GameObject from "../classes/GameObject.js";
import GameShape from "../classes/GameShape.js";
import GameShapeAnimation from "../classes/GameShapeAnimation.js";

/**
 * Adds a cross shape with dynamic size to the game object with a draw animation.
 * @param {Object} game - The game instance.
 * @param {GameObject} gameObject - The game object the cross shape will be added to.
 */
export function addGameboardCross(game, gameObject){
    const line1 = new GameShape('line', {
        x: game.config.cellPadding - game.config.cellWidth/2,
        y: game.config.cellPadding - game.config.cellHeight/2,
        x2: game.config.cellWidth/2 - game.config.cellPadding,
        y2: game.config.cellHeight/2 - game.config.cellPadding,
        color: "rgba(40, 151, 255, 1)",
        lineWidth: 4,
    });
    line1.addAnimation(new GameShapeAnimation({
        duration: 150,
    }));
    gameObject.addShape(line1);
    
    const line2 = new GameShape('line', {
        x: game.config.cellPadding - game.config.cellWidth/2,
        y: game.config.cellHeight/2 - game.config.cellPadding,
        x2: game.config.cellWidth/2 - game.config.cellPadding,
        y2: -game.config.cellHeight/2 + game.config.cellPadding,
        color: "rgba(40, 151, 255, 1)",
        lineWidth: 4,
    });
    line2.addAnimation(new GameShapeAnimation({
        duration: 150,
        startDelay: 150
    }));
    gameObject.addShape(line2);
}

/**
 * Adds a circle shape with dynamic size to the game object with a draw animation.
 * @param {Object} game - The game instance.
 * @param {GameObject} gameObject - The game object the circle shape will be added to.
 */
export function addGameboardCircle(game, gameObject){
    const circle = new GameShape('circle', {
        x: 0,
        y: 0,
        radius: (game.config.cellWidth/2) - game.config.cellPadding,
        color: "rgba(248, 66, 66, 1)",
        lineWidth: 4,
    });
    circle.addAnimation(new GameShapeAnimation({
        duration: 300,
    }));

    gameObject.addShape(circle);
}

export function addTurnIndicator(gameObject){
    gameObject.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "Player:",
        font: "30px GameFont",
        color: "white"
    }));
}

/**
 * Adds a small cross shape to game object.
 * @param {GameObject} gameObject - The game object the turn symbol will be added to.
 */
export function addTurnSymbolCross(gameObject){
    gameObject.addShape(new GameShape('line', {
        x: -15,
        y: -15,
        x2: 15,
        y2: 15,
        color: "rgba(40, 151, 255, 1)",
        lineWidth: 4,
    }));
    gameObject.addShape(new GameShape('line', {
        x: 15,
        y: -15,
        x2: -15,
        y2: 15,
        color: "rgba(40, 151, 255, 1)",
        lineWidth: 4,
    }));
}

/** 
 * Adds a small circle shape to game object.
 * @param {GameObject} gameObject - The game object the turn symbol will be added to.
 */
export function addTurnSymbolCircle(gameObject){
    gameObject.addShape(new GameShape('circle', {
        x: 0,
        y: 0,
        radius: 15,
        color: "rgba(248, 66, 66, 1)",
        lineWidth: 4,
    }));
}

