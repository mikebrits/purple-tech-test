import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getWorkerByStep } from '../../selectors';

export default ({ startNode, endNode, active, startNodeValue, endNodeValue }) => {
    const path = useRef();
    const worker = useSelector(getWorkerByStep(startNodeValue));
    const percentageComplete = worker ? (worker.timeRemaining / worker.currentStepValue) : 0;
    return (
        <g>
            <path
                className="edge-path"
                stroke={'#cdcdcd'}
                fill="none"
                ref={path}
                d={`M ${startNode.offsetLeft + 25}, ${startNode.offsetTop + 13}
                C ${startNode.offsetLeft + 50}, ${startNode.offsetTop + 13}
                ${endNode.offsetLeft - 25}, ${endNode.offsetTop + 13}
                ${endNode.offsetLeft}, ${endNode.offsetTop + 13}`}
            />
            <Path
                percentageComplete={percentageComplete}
                className={active ? 'edge-path' : ''}
                stroke={active ? '#41b141' : 'transparent'}
                fill="none"
                ref={path}
                strokeWidth={2}
                totalLength={(path && path.current && path.current.getTotalLength()) || 0}
                d={`M ${startNode.offsetLeft + 25}, ${startNode.offsetTop + 13}
                C ${startNode.offsetLeft + 50}, ${startNode.offsetTop + 13}
                ${endNode.offsetLeft - 25}, ${endNode.offsetTop + 13}
                ${endNode.offsetLeft}, ${endNode.offsetTop + 13}`}
            />
        </g>
    );
};

const Path = styled.path`
    stroke-dasharray: ${({ totalLength }) => totalLength};
    //stroke-dasharray: 10px ;
    stroke-dashoffset: ${({ percentageComplete, totalLength }) => totalLength * percentageComplete};
    animation: dash 10s linear infinite;
    animation-fill-mode: forwards;
    //stroke-dashoffset: ${({ totalLength }) => totalLength};
    //@keyframes dash {
    //    to {
    //        stroke-dashoffset: 0;
    //    }
    //}
`;
