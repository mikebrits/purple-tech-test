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
            <ProfilePic src={profilePicture} alt={name} />
            <div style={{ width: 500 }}>
                <Name>{name}</Name>
                {!ready ? (
                    <React.Fragment>
                        <TimerWrapper>
                            <div style={{ width: 150 }}>
                                Active Step: <b>{currentStep}</b>
                            </div>

                            <TimerContainer>
                                <TimerValue value={(timeRemaining / currentStepValue) * 100} />
                                <TimeRemaining>
                                    Time Left: <b>{!timeRemaining ? 'N/A' : timeRemaining}</b>
                                </TimeRemaining>
                            </TimerContainer>
                        </TimerWrapper>
                    </React.Fragment>
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
    width: 100%;
    opacity: ${({ ready }) => (ready ? '0.3' : '1')};
    display: flex;
    background: white;
    border: 1px solid #dddddd;
    border-radius: 5px;
    margin: 8px 0;
    max-width: 615px;
`;

const TimerWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    color: gray;
`;

const ProfilePic = styled.div`
    background-image: url('${({ src }) => src}');
    background-position: center center;
    background-size: cover;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    border: 1px solid #dddddd;
    margin-right: 16px;
`;

const TimerContainer = styled.div`
    height: 5px;
    border-radius: 2px;
    background-color: #dddddd;
    width: 500px;
`;

const TimeRemaining = styled.div`
    justify-self: flex-end;
    text-align: right;
    font-size: 11px;
    margin-top: 4px;
`;

const TimerValue = styled.div`
    height: 5px;
    background-color: #41b141;
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
    
    .node{
        font-weight: bold;
    }
`;
