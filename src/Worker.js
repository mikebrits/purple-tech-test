import { getStepValue } from './functions';

export default class Worker {
    timeRemaining = 0;
    ready = true;
    currentStep;

    constructor(onComplete = () => {}) {
        this.onComplete = onComplete;
    }

    assignStep = step => {
        this.timeRemaining = getStepValue(step);
        this.ready = false;
        this.currentStep = step;
    };

    work = () => {
        if (!this.ready) {
            this.timeRemaining--;
            if (this.timeRemaining === 0) {
                this.ready = true;
                this.onComplete(this.currentStep);
                this.currentStep = null;
            }
        }
    };
}
