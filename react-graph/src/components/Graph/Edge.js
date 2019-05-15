import React, {useRef} from 'react';
import styled from 'styled-components';

export default ({ startNode, endNode, active, progress }) => {
    const path = useRef();
    return (
        <g>
        <path
            className="edge-path"
            stroke="#ababab"
            fill="none"
            ref={path}
            d={`M ${startNode.offsetLeft + 25}, ${startNode.offsetTop + 13}
                C ${startNode.offsetLeft + 50}, ${startNode.offsetTop + 13}
                ${endNode.offsetLeft - 25}, ${endNode.offsetTop + 13}
                ${endNode.offsetLeft}, ${endNode.offsetTop + 13}`}
        />
            <Path
                className={active ? "edge-path" : ""}
                stroke={active ? "#41b141" : "transparent"}
                fill="none"
                ref={path}
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
    stroke-dasharray: ${({totalLength}) => totalLength};
    animation: dash 2s ease-in-out;
    animation-fill-mode: forwards;
    stroke-dashoffset: ${({totalLength}) => totalLength};
    @keyframes dash {
        to {
            stroke-dashoffset: 0;
        }
    }
`;
