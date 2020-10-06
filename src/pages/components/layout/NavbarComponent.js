import React, {useEffect, useState} from 'react';
import { connect, useSelector } from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import * as auth from '../../../store/ducks/auth.duck';
import * as order from '../../../store/ducks/order.duck';
import * as retailerInventory from '../../../store/ducks/retailerInventory.duck';
import * as searchMedicine from '../../../store/ducks/searchMedicine.duck';


import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function NavbarComponent(props) {
    let history = useHistory();

    const {isAuthenticated} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.auth);

    useEffect(()=> {
        console.log("isAuthenticated: ", isAuthenticated);
        console.log("User", user);
    }, [isAuthenticated, user]);

    const onLogoutClick = () => {
        props.logoutAction();
        props.fulfillOrderData([]);
        props.fulfillRetailerData([]);
        props.fulfillMedicinesData([]);
        history.push('/');
    }

    const authLinks = (
        <>
            <Nav.Link href="#" onClick = {onLogoutClick}>
                {/* <i class="fas fa-user"></i> */}
                Logout
            </Nav.Link>
        </>
      );
  
      const guestLinks = (
        <>
            <Nav.Link href="/login" className = 'navbar-button'>
                {/* <ExitToAppIcon /> */}
                 Sign In 
            </Nav.Link>
            <Nav.Link href="/register" className = 'navbar-button'>
                {/* <PersonAddIcon /> */}
                 Sign Up
            </Nav.Link>
        </>
      );

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <img src={process.env.PUBLIC_URL + '/pharmility.png'}></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link href="/">Home</Nav.Link> */}
                    {/* <Nav.Link href="#about">About</Nav.Link>     */}
                    <Nav.Link href="/">Search Medicine</Nav.Link>
                    <Nav.Link href="/scanner">QR Scanner</Nav.Link>    
                    {isAuthenticated && <Nav.Link href="/order">Order History</Nav.Link>}
                    {/* <Nav.Link href="#contact">Contact</Nav.Link> */}
                </Nav>
                <Nav>
                    {isAuthenticated ? authLinks : guestLinks}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default connect(
    null,
    {...auth.actions, ...order.actions, ...retailerInventory.actions, ...searchMedicine.actions}
)(NavbarComponent);