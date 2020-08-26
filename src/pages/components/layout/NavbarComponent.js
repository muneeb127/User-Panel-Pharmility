import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

function NavbarComponent() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Medi Quick</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>    
                    <Nav.Link href="/search">Search</Nav.Link>    
                    <Nav.Link href="#contact">Contact</Nav.Link>     
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarComponent;