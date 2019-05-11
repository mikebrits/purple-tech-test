import Worker from './Worker';

export default class WorkerManager{
    workers = [];
    totalTime = 0;

    constructor(workerCount = 0, onStepComplete = () => {}, workerBaseTime = 60){

        for(let i =0; i < workerCount + 1; i++){
            this.workers[i] = new Worker(onStepComplete, workerBaseTime);
        }
    }

    getAvailableWorkers = () => {
        return this.workers.filter((item) => item.ready);
    }

    work = () => {
        this.workers.forEach(worker => worker.work());
        this.totalTime++;
    }

    assignStep = (step) => {
        const w = this.getAvailableWorkers()[0];
        if(w){
            w.assignStep(step);
            return true;
        }
        return false;
    }

    isBusy = () => {
        return this.getAvailableWorkers().length < this.workers.length;
    }

}