import React from 'react';
import styled from 'styled-components';

// Header
export default ({}) => {
    return (
        <Container>
            <PlayButton><i className="fas fa-pause"/></PlayButton>
        </Container>
    );
};

const Container = styled.div`
    background: #e5020b;
    height: 30px;
    padding: 8px;
`;

const PlayButton = styled.div`
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background: #e5020b;
    color: white;
    margin: 0 auto;
    border-radius: 30px;
    left: 0;
    right: 0;
    box-shadow: 0 4px 6px #00000045;
`;
