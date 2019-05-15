import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import {addNodeRef} from "../../../actions";

// Node Component
export default ({ step }) => {
    const dispatch = useDispatch();
    const nodeRef = useRef(null);
    useEffect(() => {
        dispatch(addNodeRef(nodeRef, step));
    }, []);
    return (
        <Container
            ref={nodeRef}
        >
            {step}
        </Container>
    );
};

const Container = styled.div`
    border: 1px solid gray;
    color: gray;
    font-size: 12px;
    border-radius: 50px;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px 0;
    background: white;
    //z-index: 100;
`;
