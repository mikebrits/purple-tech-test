import React from 'react';
import styled from 'styled-components';
import Edge from './Edge';
//Node Links
export default function({ nodes, lastNodes, activeNodes }) {
    return nodes ? (
        <Container>
            <svg width="950" height="228" style={{ zIndex: 0 }}>
                {Object.keys(lastNodes).map((key, index) => {
                    return (
                        <g key={index}>
                            {lastNodes[key].map((nodeKey, index) => {
                                const startNode = nodes[nodeKey].current;
                                const endNode = nodes[key].current;
                                return (
                                    <Edge
                                        key={index}
                                        startNode={startNode}
                                        startNodeValue={nodeKey}
                                        endNode={endNode}
                                        endNodeValue={key}
                                        active={activeNodes.indexOf(nodeKey) > -1}
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
