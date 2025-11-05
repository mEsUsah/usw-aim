import GameShape from "../classes/GameShape.js";
import GameShapeAnimation from "../classes/GameShapeAnimation.js";

export function addCrossShape(game, gameObject){
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

export function addCircleShape(game, gameObject){
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