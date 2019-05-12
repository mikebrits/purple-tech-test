import _ from 'lodash';

export const getGraph = (state) => state.graph;
export const managerBusy = (state) => state.manager.isBusy;
export const getWorkers = state => state.manager.workers;
export const getWorkerById = (id) => state => _.find(state.manager.workers, {id});
