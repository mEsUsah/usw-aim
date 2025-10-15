import GameShapeAnimation from './GameShapeAnimation.js';

export default class GameShape {
    constructor(type, params) {
        this.type = type;
        this.params = params;
        this.animation = null;
    }

    addAnimation(animation) {
        this.animation = animation;
    }

    updateAnimation(deltaTime) {
        if(this.animation) {
            this.animation.updateProgress(deltaTime);
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.params.x, this.params.y);
        let progress = 1;
        let direction = GameShapeAnimation.FORWARD;
        if (this.animation) {
            progress = this.animation.getProgress();
            direction = this.animation.config.direction;
        }

        if(this.type === 'circle') {
            ctx.beginPath();
            //  arc(x, y, radius, startAngle, endAngle, counterclockwise)
            if(direction === GameShapeAnimation.FORWARD) {
                ctx.arc(0, 0, this.params.radius, 0, (2 * Math.PI * progress), false);
            } else {
                if(progress === 1) progress = 0; // To avoid full circle bug
                ctx.arc(0, 0, this.params.radius, (2 * Math.PI * progress), 0, false);
            }
            ctx.stroke();
        }
        ctx.restore();
    }
}