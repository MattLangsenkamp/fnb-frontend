import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';
import {gql, useQuery } from '@apollo/client';
import  cache  from './../../index';

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    a, .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;

        &:hover {
            color: white;
        }
    }
    .navlink {
        margin: auto 5px auto 5px;
    }
    
`;
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const logOut = () => {
    localStorage.removeItem("AccessToken")
    localStorage.removeItem("RefreshToken")
    cache.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: !!localStorage.getItem("AccessToken") && !!localStorage.getItem("RefreshToken"),
        },
      });
}

export default function NavigationBar() {
    const { data } = useQuery(IS_LOGGED_IN)
    
    return (
        <Styles>
            <Navbar expand="lg">
                <Navbar.Brand href="/">Roc Food Not Bombs</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Item className="navlink">
                        <Link to="/">Home</Link>
                    </Nav.Item>
                    <Nav.Item className="navlink">
                        <Link to="/locations">Locations</Link>    
                    </Nav.Item>
                    {data.isLoggedIn ? 
                    <>
                        <Nav.Item className="navlink">
                            <Link to="/addlocation">Add a Location</Link>
                        </Nav.Item>
                        <Nav.Item className="navlink">
                            <Button onClick = {logOut}>Sign out</Button>
                        </Nav.Item>
                    </>
                    :
                    <>
                        <Nav.Item className="navlink">
                            <Link to="/getinvolved">Get Involved</Link>
                        </Nav.Item>
                        <Nav.Item className="navlink">
                            <Link to="/signup">Sign Up</Link>
                        </Nav.Item>
                        <Nav.Item className="navlink">
                            <Link to="/signin">Sign In</Link>
                        </Nav.Item>
                    </> }               
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    )
}
