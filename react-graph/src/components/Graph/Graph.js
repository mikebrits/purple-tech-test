import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { initGraph } from '../../actions';
import { getGraph } from '../../selectors';
// import {findEmptyNodes} from '../../../../src/functions';

export default ({ input }) => {
    const { forward, backward } = useSelector(getGraph);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initGraph(input));
    }, []);

    // const emptyNodes = findEmptyNodes(forwardMap);

    const graphData = useMemo(generateGraphData, [forward, backward]);
    return (
        <Container>
            {/*
            graphData.map((group, index) => {
            return <NodeGroup key={index}>
                {
                    group.map((node, index) => {
                        return <Node key={index}>{node.label}</Node> 
                    })
                }
            </NodeGroup>
        })
    */}
        </Container>
    );
};

const generateGraphData = (forward, backward) => [
    [
        {
            label: 'C',
        },
    ],
    [
        {
            label: 'A',
        },
        {
            label: 'B',
        },
    ],
];

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
