import GameShape from "../classes/GameShape.js";
import GameShapeAnimation from "../classes/GameShapeAnimation.js";

/**
 * Adds pause text with an animated underline to a game object.
 * @param {GameObject} gameObject - The game object the pause text will be added to.
 */
export function addPauseText(gameObject) {
    gameObject.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "Pause",
        font: "84px Consolas",
        align: "center",
        baseline: "middle",
        color: "white"
    }));

    const pauseLine = new GameShape('line', {
        x: -130,
        y:  30,
        x2: 130,
        y2: 30,
        color: "white",
        lineWidth: 4
    });

    pauseLine.addAnimation(new GameShapeAnimation({
        duration: 1000,
        loop: GameShapeAnimation.INFINITE,
    }));

    gameObject.addShape(pauseLine);
}