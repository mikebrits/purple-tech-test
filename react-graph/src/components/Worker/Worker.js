import React from 'react';
import { useSelector } from 'react-redux';
import { getWorkerById } from '../../selectors';
import styled from 'styled-components';

// Worker
export default ({ id }) => {
    const worker = useSelector(getWorkerById(id));
    return (
        <Container>
            <div>ID: {id.split('-')[3]}</div>
            <div>Active Step: {worker.currentStep}</div>
            <div>Time Left: {!worker.timeRemaining ? 'N/A' : worker.timeRemaining}</div>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
`;
