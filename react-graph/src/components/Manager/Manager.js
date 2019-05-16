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
    const [timerActive, setTimer] = useState(false);
    const completedNodes = useSelector(getCompletedNodes);

    const doWork = () => {
        if (emptyNodes.length || workers.length !== freeWorkers.length) {
            dispatch(work());
            setCount(count + 1);
        }
    };

    // Initialise the manager
    useEffect(() => {
        dispatch(initManager(workerCount));
    }, [dispatch, workerCount]);

    // Every time there is a free worker, assign it work
    useEffect(() => {
        if (emptyNodes[0] && freeWorkers.length) {
            dispatch(assignStep(emptyNodes[0]));
            dispatch(removeNode(emptyNodes[0]));
        }
    }, [freeWorkers]);

    //Track workers who are about to finish
    useEffect(() => {
        justFinished.forEach(worker => {
            dispatch(completeNode(worker.currentStep));
            setNodeOrder(nodeOrder + worker.currentStep);
            dispatch(resetWorker(worker.id));
        });
    }, [justFinished, dispatch]);

    return (
        <div>
            {timerActive && <Timer onTick={doWork} delay={500} />}

            <WorkerBench>
                <Header>
                    <Button
                        onClick={() => {
                            setTimer(!timerActive);
                        }}
                    >
                        {timerActive ? 'Pause' : 'Start'} Working
                    </Button>
                    <div style={{textAlign: "center"}}><small>Time</small><br/><b>{count || '-'}</b></div>
                    <div style={{textAlign: "right"}}><small>Steps</small><br/><b>{completedNodes.length ? completedNodes : '-'}</b></div>
                </Header>
                {workers.map(worker => (
                    <Worker key={worker.id} id={worker.id} />
                ))}
            </WorkerBench>
        </div>
    );
};

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const WorkerBench = styled.div`
    padding: 20px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    position: relative;
    max-width: 600px;
    margin: 0 auto;
`;

const Header = styled.div`
    padding: 20px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const Button = styled.div`
    padding: 8px 16px;
    background-color: #41b141;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 13px;
`;

