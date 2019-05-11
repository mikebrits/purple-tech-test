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

        manager.assignStep('B');
        manager.assignStep('D');
        manager.assignStep('E');

        expect(manager.getAvailableWorkers().length).toBe(3);
    })
})