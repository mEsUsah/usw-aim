import GameShape from "../classes/GameShape.js";

/**
 * Adds a play button shape to a game object.
 * @param {GameObject} gameObject - The game object the play button shape will be added to.
 */
export function addPlayButton(gameObject) {
    gameObject.addShape(new GameShape('rectangle', {
        x: -20,
        y: -20,
        width: 40,
        height: 40,
        color: "red"
    }));
    gameObject.addShape(new GameShape('polygon', {
        points: [
            {x: -10, y: -10},
            {x: 10, y: 0},
            {x: -10, y: 10}
        ],
        color: "red",
        fillColor: "red"
    }));    
}

/**
 * Adds a stop button shape to a game object.
 * @param {GameObject} gameObject - The game object the stop button shape will be added to.
 */
export function addStopButton(gameObject) {
    gameObject.addShape(new GameShape('rectangle', {
        x: -20,
        y: -20,
        width: 40,
        height: 40,
        color: "red"
    }));
    gameObject.addShape(new GameShape('rectangle', {
        x: -10,
        y: -10,
        width: 20,
        height: 20,
        color: "red",
        fillColor: "red"
    }));
}