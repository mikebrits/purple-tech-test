import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    initManager,
    work,
    assignStep,
    removeNode,
    completeNode,
    resetWorker,
} from '../../actions';
import Worker from '../Worker/Worker';
import {
    getWorkers,
    getEmptyNodes,
    getFreeWorkers,
    managerInitialised,
    getWorkersJustFinished,
    getCompletedNodes,
    getTimerActive,
} from '../../selectors';
import styled from 'styled-components';
import Timer from './Timer';

// Manager
export default ({ workerCount }) => {
    const dispatch = useDispatch();
    const workers = useSelector(getWorkers);
    let justFinished = useSelector(getWorkersJustFinished);
    const emptyNodes = useSelector(getEmptyNodes);
    const freeWorkers = useSelector(getFreeWorkers);
    const [nodeOrder, setNodeOrder] = useState('');
    const [count, setCount] = useState(0);
    const timerActive = useSelector(getTimerActive);
    const completedNodes = useSelector(getCompletedNodes);

    const doWork = () => {
        if (emptyNodes.length || workers.length !== freeWorkers.length) {
            dispatch(work());
            setCount(count + 1);
        }
    };

    // Initialise the manager
    useEffect(
        () => {
            dispatch(initManager(workerCount));
        },
        [dispatch, workerCount],
    );

    // Every time there is a free worker, assign it work
    useEffect(
        () => {
            if (emptyNodes[0] && freeWorkers.length) {
                dispatch(assignStep(emptyNodes[0]));
                dispatch(removeNode(emptyNodes[0]));
            }
        },
        [freeWorkers],
    );

    //Track workers who are about to finish
    useEffect(
        () => {
            justFinished.forEach(worker => {
                dispatch(completeNode(worker.currentStep));
                setNodeOrder(nodeOrder + worker.currentStep);
                dispatch(resetWorker(worker.id));
            });
        },
        [justFinished, dispatch],
    );

    return (
        <Container>
            {timerActive && <Timer onTick={doWork} delay={500} />}

            <WorkerWrapper>
                <WorkerBench>
                    <h4 style={{margin: 0}}>Active</h4>
                    {workers
                        .filter(w => !w.ready)
                        .map(worker => (
                            <Worker key={worker.id} id={worker.id} />
                        ))}
                </WorkerBench>
                <WorkerBench>
                    <h4 style={{margin: 0}}>Inactive</h4>
                    {workers
                        .filter(w => w.ready)
                        .map(worker => (
                            <Worker key={worker.id} id={worker.id} />
                        ))}
                </WorkerBench>
            </WorkerWrapper>
        </Container>
    );
};

const WorkerBench = styled.div`
    padding: 0 20px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    position: relative;
    max-width: 400px;
    margin: 0 auto;
`;

const WorkerWrapper = styled.div`
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
`;
