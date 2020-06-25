import React from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import Jumbotron from './Jumbotron';

export default function Layout(props) {
    return (
        <> 
            <NavigationBar />
            <Jumbotron />
            <Container>
                {props.children}
            </Container>
        </>
    )
}