import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addNodeRef } from '../../../actions';
import { getWorkerByStep, getCompletedNodes } from '../../../selectors';

// Node Component
export default ({ step }) => {
    const dispatch = useDispatch();
    const nodeRef = useRef(null);
    const activeWorker = useSelector(getWorkerByStep(step));
    const completedNodes = useSelector(getCompletedNodes);

    useEffect(() => {
        dispatch(addNodeRef(nodeRef, step));
    }, []);
    return (
        <NodeContainer className="node" ref={nodeRef} active={completedNodes.indexOf(step) === -1}>
            {step}
            {activeWorker && <ProfilePic src={activeWorker.profilePicture} />}
        </NodeContainer>
    );
};

export const NodeContainer = styled.div`
    border: 1px solid black;
    font-size: ${({small}) => small ? '9px' : '12px'};
    border-radius: 50px;
    height: ${({small}) => small ? '15px' : '25px'};
    width: ${({small}) => small ? '15px' : '25px'};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${({small}) => small ? '0 4px' : '16px 0'};
    position: relative;
    ${({active}) => (!active && `
        background: black;
        color: white;
    `)}
    //z-index: 100;
`;

const ProfilePic = styled.div`
    background-image: url('${({ src }) => src}');
    background-position: center center;
    background-size: cover;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #dddddd;
    position: absolute;
    right: -8px;
    bottom: -8px;
`;
