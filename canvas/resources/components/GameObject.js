export class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.animations = [];
    }
    addAnimation(length, loop) {
        const animation = new GameObjectAnimation(length, loop);
        this.animations.push(animation);
    }

}

class GameObjectAnimation {
    static INFINITE = -1;
    constructor(duration, loop) {
        this.duration = duration;
        this.progress = 0;
        this.loop = loop; // -1 inifinitely, 0 no loop, n times
        this.loopCount = 1;
    }

    updateProgress(deltaTime) {
        this.progress += deltaTime;
        
        // Looping logic
        if(this.progress > this.duration && (this.loop === GameObjectAnimation.INFINITE || this.loopCount < this.loop)) {
            this.loopCount++;
            this.progress = this.progress % this.duration;
            return;
        }

        // Stop at duration if not looping
        if(this.progress > this.duration) {
            this.progress = this.duration;
        }
    }

    getProgress() {
        return this.progress / this.duration;
    }
}