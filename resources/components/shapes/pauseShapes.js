import GameShape from "../classes/GameShape.js";
import GameShapeAnimation from "../classes/GameShapeAnimation.js";

/**
 * Adds pause text with an animated underline to a game object.
 * @param {GameObject} gameObject - The game object the pause text will be added to.
 */
export function addPauseText(gameObject) {
    gameObject.addShape(new GameShape('text', {
        x: -150,
        y: 0,
        text: "Game Paused",
        font: "50px Consolas",
        color: "white"
    }));

    const pauseLine = new GameShape('line', {
        x: -150,
        y:  5,
        x2: 150,
        y2: 5,
        color: "white",
        lineWidth: 4
    });

    pauseLine.addAnimation(new GameShapeAnimation({
        duration: 1000,
        loop: GameShapeAnimation.INFINITE,
    }));

    gameObject.addShape(pauseLine);
}