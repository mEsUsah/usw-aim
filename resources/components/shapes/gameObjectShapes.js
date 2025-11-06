import GameShape from "../classes/GameShape.js";
import GameShapeAnimation from "../classes/GameShapeAnimation.js";

export function gameboardCross(game, gameObject){
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
        direction: GameShapeAnimation.BACKWARD,
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

export function gameboardCircle(game, gameObject){
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

export function menuSelectionText(text){
    return new GameShape('text', {
        x: 0,
        y: 0,
        text: text,
        font: "30px Consolas",
        color: "white",
        align: "left",
        baseline: "middle"
    });
}

export function menuButtonOutline(){
    return new GameShape('rectangle', {
        x: -30,
        y: -30,
        width: 60,
        height: 60,
        color: "gray"
    });
}

export function menuButtonText(text){
    return new GameShape('text', {
        x: 0,
        y: 0,
        text: text,
        font: "30px Consolas",
        color: "white",
        align: "center",
        baseline: "middle"
    });
}

export function menuSelectedIndicator(){
    return new GameShape('line', {
        x: -20,
        y: 17,
        x2: 20,
        y2: 17,
        color: "red",
        lineWidth: 5,      
        name: 'selected_indicator'
    });
}