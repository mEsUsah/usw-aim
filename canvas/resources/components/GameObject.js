export default class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.animations = [];
        this.shapes = [];
    }

    addShape(shape) {
        this.shapes.push(shape);
    }

    update(deltaTime) {
        this.shapes.forEach(shape => {
            shape.update(deltaTime);
        });

        // Remove shapes with longer lifetime than ttl
        this.shapes = this.shapes.filter(shape => {
            if(shape.config.ttl) {
                return shape.lifetime < shape.config.ttl;
            }
            return true;
        });
    }

    draw(ctx) {
        if(!this.shapes.length) return;
        ctx.save();
        this.shapes.forEach(shape => {
            shape.draw(ctx);
        });
        ctx.restore();
    }
}
