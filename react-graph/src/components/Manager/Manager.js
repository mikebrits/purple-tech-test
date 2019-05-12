import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initManager, work, assignStep } from '../../actions';
import Worker from '../Worker/Worker';
import { getWorkers } from '../../selectors';
import styled from 'styled-components';

export default ({ workerCount, onStepComplete }) => {
    const dispatch = useDispatch();
    const workers = useSelector(getWorkers);
    useEffect(() => {
        dispatch(initManager(workerCount, onStepComplete));
    }, [workerCount, dispatch, onStepComplete]);

    const doWork = () => {
        console.log('Pew');
        dispatch(work());
    };

    const assignStepToWorker = () => {
        dispatch(assignStep('Z'));
    };

    return (
        <div>
            Manager
            <button onClick={doWork}>Work</button>
            <button onClick={assignStepToWorker}>Assign</button>
            <WorkerBench>
                {workers.map(worker => (
                    <Worker key={worker.id} id={worker.id} />
                ))}
            </WorkerBench>
        </div>
    );
};

const WorkerBench = styled.div`
    display: flex;
`;
