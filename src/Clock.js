export default class Clock {
    
    constructor(tickHandler = () => {}) {
        this.tickHandler = tickHandler;
        this.count = 0;
        this.active = true;
    }

    start() {
        while (this.active) {
            this.tick();
        }
    }

    stop() {
        this.active = false;
        return this.count;
    }

    tick() {
        this.count++;
        this.tickHandler(this.count);
    }
}
