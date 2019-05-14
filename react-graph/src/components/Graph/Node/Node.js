import React from 'react';
import styled from 'styled-components';
// Node

export default ({step}) => {
    return <Container>{step}</Container>
}

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
    margin: 8px 0;
    background: white;
`;