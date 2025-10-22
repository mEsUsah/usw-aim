import GameObject from "./GameObject.js";
import GameShape from "./GameShape.js";

export function create(game){
    const continueButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: game.displayData.gameWidth / 2,
        y: game.displayData.gameHeight / 2,
        name: 'continue_button',
        outline: {
            top: 60,
            left: 60,
            bottom: 60,
            right: 60
        }
    });
    continueButton.addShape(new GameShape('rectangle', {
        x: -60,
        y: -60,
        width: 120,
        height: 120,
        color: "red"
    }));
    continueButton.addShape(new GameShape('polygon', {
        x: -0,
        y: -0,
        points: [
            {x: -30, y: -40},
            {x: 40, y: 0},
            {x: -30, y: 40}
        ],
        color: "red",
        fillColor: "red"
    }));
    game.gameObjects.paused.push(continueButton);
}