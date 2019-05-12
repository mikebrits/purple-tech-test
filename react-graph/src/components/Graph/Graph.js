import React from 'react';
import styled from 'styled-components';
// import {findEmptyNodes} from '../../../../src/functions';

const graphData = [
    [
        {
            label: "C",
        },
    ],
    [
        {
            label: "A",
        },
        {
            label: "B",
        },
    ]
]

export default ({forwardMap, backwardMap}) => {

    // const emptyNodes = findEmptyNodes(forwardMap);
    const forwardCopy = {...forwardMap};

    return(
        <Container>
        {
            graphData.map((group, index) => {
            return <NodeGroup key={index}>
                {
                    group.map((node, index) => {
                        return <Node key={index}>{node.label}</Node> 
                    })
                }
            </NodeGroup>
        })
        }
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const NodeGroup = styled.div`
    padding: 20px;
    background-color: #fafafa;
    height: 100%;
`;

const Node = styled.div`
    margin: 20px 0;
`;