import GameShapeAnimation from './GameShapeAnimation.js';

export default class GameShape {
    constructor(type, config) {
        this.type = type;
        this.config = config;
        this.animation = null;
        this.lifetime = 0;
    }

    addAnimation(animation) {
        this.animation = animation;
    }

    update(deltaTime) {
        this.lifetime += deltaTime;
        if(this.animation) {
            this.animation.updateProgress(deltaTime);
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.config.x, this.config.y);
        let progress = 1;
        let direction = GameShapeAnimation.FORWARD;
        if (this.animation) {
            progress = this.animation.getProgress();
            direction = this.animation.config.direction;
        }

        if(this.type === 'circle') {
            ctx.beginPath();
            if(direction === GameShapeAnimation.FORWARD) {
                ctx.arc(0, 0, this.config.radius, 0, (2 * Math.PI * progress), false);
            } else {
                if(progress === 1) progress = 0; // To avoid full circle when finished
                ctx.arc(0, 0, this.config.radius, (2 * Math.PI * progress), 0, false);
            }
            ctx.stroke();
        }


        if(this.type == 'line') {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo((this.config.x2 - this.config.x) * progress, (this.config.y2 - this.config.y) * progress);
            ctx.stroke();
        }

        ctx.restore();
    }
}