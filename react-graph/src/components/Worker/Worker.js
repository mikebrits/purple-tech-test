import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getWorkerById } from '../../selectors';
import styled from 'styled-components';
import { NodeContainer } from '../Graph/Node/Node';

// Worker
export default ({ id }) => {
    const {
        name,
        ready,
        timeRemaining,
        currentStep,
        currentStepValue,
        profilePicture,
        history,
    } = useSelector(getWorkerById(id));

    return (
        <Container ready={ready}>
            <ProfilePic src={profilePicture} alt={name}>
                {ready ? '' : <NodeContainer small>{currentStep}</NodeContainer>}
            </ProfilePic>
            <div style={{width: '100%'}}>
                <Name>{name}</Name> {'  '}
                {!ready ? (
                    <TimerContainer>
                        <TimerValue value={(timeRemaining / currentStepValue) * 100} />
                    </TimerContainer>
                ) : null}
                <Steps>
                    Steps Worked On:{' '}
                    {history.map(step => (
                        <NodeContainer small>{step}</NodeContainer>
                    ))}{' '}
                </Steps>
            </div>
        </Container>
    );
};

const Container = styled.div`
    padding: 8px;
    width: 400px;
    opacity: ${({ ready }) => (ready ? '0.3' : '1')};
    display: flex;
    border: 1px solid black;
    //border-radius: 5px;
    margin: 8px 0;
    max-width: 400px;
`;

const TimerWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const ProfilePic = styled.div`
    background-image: url('${({ src }) => src}');
    background-position: center center;
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #dddddd;
    margin-right: 16px;
`;

const TimerContainer = styled.div`
    height: 5px;
    border-radius: 2px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const TimeRemaining = styled.div`
    //justify-self: flex-end;
    text-align: right;
    font-size: 11px;
    margin-top: 4px;
`;

const TimerValue = styled.div`
    height: 5px;
    background-color: #e5020b;
    border-radius: 2px;
    width: ${({ value }) => value + '%'};
`;

const Name = styled.h3`
    margin: 4px 0;
`;

const Steps = styled.div`
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-top: 4px;

    .node {
        font-weight: bold;
    }
`;
