import React from 'react';
import styled from 'styled-components';
//Node Links
export default function({ nodes, backwardMap }) {
    return nodes ? (
        <Container>
            <svg width="950" height="228" style={{zIndex: 0}}>
                {Object.keys(backwardMap).map((key, index) => {
                    return (
                        <g key={index}>
                            {backwardMap[key].map((nodeKey, index) => {
                                const startNode = nodes[nodeKey].current;
                                const endNode = nodes[key].current;
                                return (
                                    <line
                                        key={index}
                                        x1={startNode.offsetLeft}
                                        y1={startNode.offsetTop + 12.5}
                                        x2={endNode.offsetLeft + 25}
                                        y2={endNode.offsetTop + 12.5}
                                        stroke="gray"
                                    />
                                );
                            })}
                        </g>
                    );
                })}
            </svg>
        </Container>
    ) : (
        'Loading...'
    );
}

const Container = styled.div`
    position: absolute;
    //z-index: -1;
`;
