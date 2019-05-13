import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getWorkerById } from '../../selectors';
import styled from 'styled-components';

// Worker
export default ({ id }) => {
    const {name, ready, timeRemaining, currentStep, currentStepValue, profilePicture} = useSelector(getWorkerById(id));

    return (
        <Container>
            <ProfilePic src={profilePicture} alt={name} />
            <div>{name}</div>
            {!ready ? (
                <React.Fragment>
                    <div>Active Step: {currentStep}</div>
                    <div>Time Left: {!timeRemaining ? 'N/A' : timeRemaining}</div>
                    <TimerContainer>
                        <TimerValue value={timeRemaining / currentStepValue * 100 } />
                    </TimerContainer>
                </React.Fragment>
            ) : (
                <div>Ready</div>
            )}
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    max-width: 200px;

`;

const ProfilePic = styled.img`
    max-width: 100px;
    border-radius: 100px;
`;

const TimerContainer = styled.div`
    height: 5px;
    border-radius: 2px;
    background-color: #dddddd;
`;

const TimerValue = styled.div`
    height: 5px;
    background-color: green;
    border-radius: 2px;
    width: ${({value}) =>  value + '%'};
`;
