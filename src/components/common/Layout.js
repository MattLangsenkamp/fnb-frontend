import React from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import Jumbotron from './Jumbotron';
import styled from 'styled-components';

const Styles = styled.div`
    height: 100%;
    padding-bottom: 20px;
    .layout-container {
        height: 800px;
        position: relative;
        
    }

`;

export default function Layout(props) {

    return (
        <Styles> 
            <NavigationBar />
            <Jumbotron title={props.title} description={props.description}/>
            <Container className="layout-container" >
                {props.children}
            </Container>
        </Styles>
    )
}