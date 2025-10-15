export default class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.animations = [];
        this.shapes = [];
    }

    // addAnimation(length, loop, startDelay, deleteTime) {
    //     const animation = new GameShapeAnimation(length, loop, startDelay, deleteTime);
    //     this.animations.push(animation);
    // }

    // deleteCompletedAnimations() {
    //     this.animations = this.animations.filter(animation => !animation.getIsPastDeleteTime());
    // }

    addShape(shape) {
        this.shapes.push(shape);
    }

    update(deltaTime) {
        this.shapes.forEach(shape => {
            shape.updateAnimation(deltaTime);
        });
    }

    draw(ctx) {
        if(!this.shapes.length) return;
        // console.log("GameObject Draw shapes", this.shapes.length);
        ctx.save();
        this.shapes.forEach(shape => {
            shape.draw(ctx);
        });
        ctx.restore();
    }
}
