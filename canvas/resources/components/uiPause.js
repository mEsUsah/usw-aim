import GameObject from "./GameObject.js";
import GameShape from "./GameShape.js";

export function create(game){
    const continueButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: game.displayData.gameWidth / 2,
        y: game.displayData.gameHeight / 2,
        name: 'continue_button',
        outline: {
            top: 30,
            left: 60,
            bottom: 30,
            right: 60
        }
    });
    continueButton.addShape(new GameShape('rectangle', {
        x: -60,
        y: -30,
        width: 120,
        height: 60,
        color: "green"
    }));
    game.gameObjects.paused.push(continueButton);
}