export class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.animations = [];
    }
    addAnimation(length, loop, startDelay) {
        const animation = new GameObjectAnimation(length, loop, startDelay);
        this.animations.push(animation);
    }

}

class GameObjectAnimation {
    static INFINITE = -1;
    constructor(duration, loop, startDelay) {
        this.duration = duration;
        this.progress = 0;
        this.lifetime = 0;
        this.loop = loop; // -1 inifinitely, 0 no loop, n times
        this.loopCount = 1;
        this.startDelay = startDelay || 0;

    }

    updateProgress(deltaTime) {
        this.progress += deltaTime;
        this.lifetime += deltaTime;

        // Not started yet
        if(this.lifetime < this.startDelay) {
            this.progress = 0;
            return;
        }

        // Looping logic
        if(this.progress > this.duration 
            && (this.loop === GameObjectAnimation.INFINITE || this.loopCount < this.loop)
        ) {
            this.loopCount++;
            this.progress = this.progress % this.duration;
        }

        // Stop at duration if not looping
        if( this.progress > this.duration 
            && this.loop === 0
        ) {
            this.progress = this.duration;
        }        
    }

    getProgress() {
        return this.progress / this.duration;
    }
}