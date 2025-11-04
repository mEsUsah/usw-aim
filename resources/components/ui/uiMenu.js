import GameObject from "../classes/GameObject.js";
import GameShape from "../classes/GameShape.js";

export function create(game){
    // Start button
    const startButton = new GameObject({
        variant: GameObject.VARIANT.BUTTON,
        x: game.displayData.gameWidth / 2,
        y: game.displayData.gameHeight / 4 * 3,
        name: 'start_button',
        outline: {
            top: 60,
            left: 60,
            bottom: 60,
            right: 60
        }
    });
    startButton.addShape(new GameShape('rectangle', {
        x: -60,
        y: -60,
        width: 120,
        height: 120,
        color: "red"
    }));
    startButton.addShape(new GameShape('polygon', {
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
    game.gameObjects.menu.push(startButton);


    // Size buttons
    const sizeText = new GameObject({
        variant: GameObject.VARIANT.TEXT,
        x: 50,
        y: game.displayData.gameHeight / 4 * 1,
        name: 'size_text',
    });
    sizeText.addShape(new GameShape('text', {
        x: 0,
        y: 0,
        text: "Board Size:",
        font: "30px Consolas",
        color: "white",
        align: "left",
        baseline: "middle"
    }));
    game.gameObjects.menu.push(sizeText);

    for(let i = 3; i <= 8; i++){
        const sizeButton = new GameObject({
            variant: GameObject.VARIANT.BUTTON,
            x: (game.displayData.gameWidth - 80 * 6) + (i - 3) * 80,
            y: game.displayData.gameHeight / 4 * 1,
            name: `size_button`,
            outline: {
                top: 30,
                left: 30,
                bottom: 30,
                right: 30
            },
            boardSize: i
        });

        sizeButton.addShape(new GameShape('rectangle', {
            x: -30,
            y: -30,
            width: 60,
            height: 60,
            color: "red"
        }));
        sizeButton.addShape(new GameShape('text', {
            x: 0,
            y: 0,
            text: `${i}x${i}`,
            font: "30px Consolas",
            color: "white",
            align: "center",
            baseline: "middle"
        }));

        if(i === game.state.boardSize){
            sizeButton.addShape(getSelectedSizeIndicator());
        }
        game.gameObjects.menu.push(sizeButton);
    }
}

export function getSelectedSizeIndicator(){
    return new GameShape('rectangle', {
        x: -30,
        y: -30,
        width: 60,
        height: 60,
        fillColor: "rgba(0, 255, 0, 0.2)",
        color: "rgba(0, 0, 0, 0)",
        name: 'selected_size_indicator'
    });
}