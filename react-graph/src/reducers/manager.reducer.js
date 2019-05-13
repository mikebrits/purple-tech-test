import { INIT_MANAGER, INIT_WORKER, WORK, ASSIGN_STEP, RESET_WORKER } from '../actionsTypes';
import workerReducer from './worker.reducer';

const defaultState = {
    workers: [],
    isBusy: true,
    initialised: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case INIT_MANAGER:
            const { workerCount } = action.payload;
            let workers = [];
            for (let i = 0; i < workerCount; i++) {
                workers[i] = workerReducer(null, {
                    type: INIT_WORKER,
                    payload: {
                        profilePicture: `https://randomuser.me/api/portraits/lego/${i}.jpg`,
                        name: `Worker ${i + 1}` 
                    },
                });
            }

            return {
                ...state,
                initialised: true,
                workers,
            };
        case ASSIGN_STEP:
            let isAssigned = false;
            return {
                ...state,
                workers: state.workers.map(worker => {
                    if (!isAssigned && worker.timeRemaining == null) {
                        isAssigned = true;
                        return workerReducer(worker, action);
                    }
                    return worker;
                }),
            };
        case RESET_WORKER:
            return {
                ...state,
                workers: state.workers.map(worker =>
                    worker.id === action.payload ? workerReducer(worker, action) : worker,
                ),
            };
        case WORK:
        default:
            return {
                ...state,
                workers: state.workers.map(worker => workerReducer(worker, action)),
            };
    }
};