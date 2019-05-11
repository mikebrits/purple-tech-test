import WorkerManager from './WorkerManager';

describe('Worker Manager', () => {

    it('Has at least one worker', () => {
        const manager1 = new WorkerManager(0, () => {});
        expect(manager1.workers.length).toBe(1);

        const manager2 = new WorkerManager(5, () => {});
        expect(manager2.workers.length).toBe(6);
    });

    it('Returns a worker, when there is one free', () => {
        const manager = new WorkerManager(5, () => {});
        expect(manager.getAvailableWorkers().length).toBe(6);

    })

    it('Assigns tasks to workers', () => {
        const manager = new WorkerManager(5, () => {});
        const workerOne = manager.getAvailableWorkers()[0];

        let a = manager.assignStep('B');
        let b = manager.assignStep('D');
        let c = manager.assignStep('E');

        expect(a).toBe(true);
        expect(b).toBe(true);
        expect(c).toBe(true);

        expect(manager.getAvailableWorkers().length).toBe(3);
        expect(workerOne.ready).toBe(false);
        expect(workerOne.currentStep).toBe('B');
    });

    it('Returns false when there are no available workers to assign', () => {
        const manager = new WorkerManager(0, () => {});
        let a = manager.assignStep('B');
        let b = manager.assignStep('D');
        expect(a).toBe(true);
        expect(b).toBe(false);
    })

    it('Passes on a given function for a completed step', () => {
        let done = false;
        const flipDone = () => {done = true};

        const manager = new WorkerManager(0, flipDone);
        manager.assignStep('A');

        expect(done).toBe(false);

        manager.work();

        expect(done).toBe(true);   
    });

    
})