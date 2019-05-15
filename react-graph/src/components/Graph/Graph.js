import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { initGraph } from '../../actions';
import {getGraph, getGraphNodeRefs} from '../../selectors';
import Node from './Node/Node';
import NodeLinks from "./NodeLinks";
// import {findEmptyNodes} from '../../../../src/functions';

export default ({ input }) => {
    const { originalForward, originalBackward } = useSelector(getGraph);
    const refs = useSelector(getGraphNodeRefs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initGraph(input));
    }, []);

    const graphData = useMemo(() => generateGraphData(originalForward, originalBackward), [
        originalForward,
        originalBackward,
    ]);

    return graphData ? (
        <Container>
            <NodeLinks nodes={refs} backwardMap={originalBackward} />
            {graphData.map((group, index) => {
                return (
                    <NodeGroup key={index}>
                        {group.map((node, index) => {
                            return <Node key={index} step={node} />;
                        })}
                    </NodeGroup>
                );
            })}

        </Container>
    ) : (
        'Loading Graph...'
    );
};

const generateGraphData = (f, backward) => {
    let nodeArray = [];
    let indexCount = 0;
    let emptyNodes = getEmptyNodes(f);
    let forward = { ...f };
    while (emptyNodes.length) {
        nodeArray[indexCount] = emptyNodes;
        emptyNodes.forEach(node => {
            delete forward[node];
            backward[node].forEach(b => {
                forward[b] = forward[b].filter(item => item !== node);
            });
        });
        emptyNodes = getEmptyNodes(forward);
        indexCount++;
    }

    return nodeArray;
};

const getEmptyNodes = forward => {
    return Object.keys(forward)
        .filter(item => forward[item].length === 0)
        .sort();
};

const Container = styled.div`
    display: flex;
    align-items: center;
    z-index: 10;
    position: relative;
`;

const NodeGroup = styled.div`
    padding: 20px;
    background-color: #fafafa;
    height: 100%;
    //z-index: 100;
`;
