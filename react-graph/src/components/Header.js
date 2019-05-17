import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getCompletedNodes, getTimerActive, getTotalTime } from '../selectors';
import { toggleTimerActive } from '../actions';
import { NodeContainer } from './Graph/Node/Node';

// Header
export default ({}) => {
    const timerActive = useSelector(getTimerActive);
    const totalTime = useSelector(getTotalTime);
    const completedNodes = useSelector(getCompletedNodes);
    const dispatch = useDispatch();

    const toggle = () => {
        dispatch(toggleTimerActive());
    };

    return (
        <Container>
            <Steps>
                Steps:{' '}
                {completedNodes && completedNodes.length
                    ? completedNodes.map(step => <NodeContainer small>{step}</NodeContainer>)
                    : '-'}
            </Steps>
            <PlayButton onClick={toggle}>
                <i className={`fas fa-${timerActive ? 'pause' : 'play'}`} />
            </PlayButton>
            <Steps>Time: {totalTime}</Steps>
        </Container>
    );
};

const Container = styled.div`
    background: #e5020b;
    height: 30px;
    padding: 8px 16px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Steps = styled.div`
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const PlayButton = styled.div`
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background: #e5020b;
    color: white;
    margin: 0 auto;
    border-radius: 30px;
    left: 0;
    right: 0;
    box-shadow: 0 4px 6px #00000045;
    cursor: pointer;
    z-index: 20;
`;
