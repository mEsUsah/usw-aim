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
        ctx.strokeStyle = this.config.color || "red";
        ctx.lineWidth = this.config.lineWidth || 2;
        
        ctx.save();
        ctx.translate(this.config.x, this.config.y);
        let progress = 1;
        let direction = GameShapeAnimation.FORWARD;
        if (this.animation) {
            progress = this.animation.getProgress();
            direction = this.animation.config.direction;
        }

        switch(this.type) {
            case 'rectangle':
                ctx.beginPath();
                if(direction === GameShapeAnimation.FORWARD) {
                    ctx.rect(0, 0, this.config.width * progress, this.config.height * progress);
                } else {
                    ctx.rect(this.config.width * (1 - progress), this.config.height * (1 - progress), this.config.width * progress, this.config.height * progress);
                }
                ctx.stroke();

                if(this.config.fillColor) {
                    ctx.fillStyle = this.config.fillColor;
                    ctx.fill();
                }
                break;
            
            case 'circle':
                ctx.beginPath();
                if(direction === GameShapeAnimation.FORWARD) {
                    ctx.arc(0, 0, this.config.radius, 0, (2 * Math.PI * progress), false);
                } else {
                    if(progress === 1) progress = 0; // To avoid full circle when finished
                    ctx.arc(0, 0, this.config.radius, (2 * Math.PI * progress), 0, false);
                }
                ctx.stroke();
                break;
            
            case 'line':
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo((this.config.x2 - this.config.x) * progress, (this.config.y2 - this.config.y) * progress);
                ctx.stroke();
                break;

            case 'polygon':
                if(!this.config.points || this.config.points.length < 2) break;
                ctx.beginPath();
                ctx.moveTo(this.config.points[0].x, this.config.points[0].y);
                this.config.points.forEach((point, index) => {
                    ctx.lineTo(point.x, point.y);
                });
                ctx.closePath();
                ctx.stroke();

                if(this.config.fillColor) {
                    ctx.fillStyle = this.config.fillColor;
                    ctx.fill();
                }
                break;

            default:
                console.warn(`GameShape::draw - Unknown shape type: ${this.type}`);
                break;
        }

        ctx.restore();
    }
}