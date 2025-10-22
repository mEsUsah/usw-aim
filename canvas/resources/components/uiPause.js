import GameObject from "./GameObject.js";
import GameShape from "./GameShape.js";

export function create(game){
    const continueButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: game.displayData.gameWidth - 30,
        y: 30,
        name: 'continue_button',
        outline: {
            top: 20,
            left: 20,
            bottom: 20,
            right: 20
        }
    });
    continueButton.addShape(new GameShape('rectangle', {
        x: -20,
        y: -20,
        width: 40,
        height: 40,
        color: "red"
    }));
    continueButton.addShape(new GameShape('polygon', {
        points: [
            {x: -10, y: -10},
            {x: 10, y: 0},
            {x: -10, y: 10}
        ],
        color: "red",
        fillColor: "red"
    }));
    game.gameObjects.paused.push(continueButton);


    const stopButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: game.displayData.gameWidth - 80,
        y: 30,
        name: 'stop_button',
        outline: {
            top: 20,
            left: 20,
            bottom: 20,
            right: 20
        }
    });
    stopButton.addShape(new GameShape('rectangle', {
        x: -20,
        y: -20,
        width: 40,
        height: 40,
        color: "red"
    }));
    stopButton.addShape(new GameShape('rectangle', {
        x: -10,
        y: -10,
        width: 20,
        height: 20,
        color: "red",
        fillColor: "red"
    }));
    game.gameObjects.paused.push(stopButton);
}