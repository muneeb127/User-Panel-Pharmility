import React, {useState, useEffect} from 'react';
import {connect, useSelector} from "react-redux";

import * as order from "../store/ducks/order.duck";

import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import { List, Icon } from 'semantic-ui-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from '@material-ui/lab/Alert';

import '../css/styles.css';

function OrderPage(props) {

    const user = useSelector(state => state.auth.user);
    const orders = useSelector(state => state.order.list);

    useEffect(()=>{
        props.readOrderAction(user.userid);
    }, [])

    useEffect(()=> {
        console.log("Orders: ", orders);
    }, [orders]);

    let list;
    if(orders.length > 0){
        list = orders.map((item)=> {
            return (
                <List.Item>
                    <List.Content floated='right'>
                        <List.Header as='a'>Qty: {item.quantity}</List.Header>
                        <Chip
                            label={item.status}
                            color="primary"
                            variant="outlined"
                        />
                    </List.Content>
                    <List.Icon name='medkit' size='big' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>{item.retailerId}</List.Header>
                        <List.Description as='a'>{item.retailerAddress}</List.Description>
                        <List.Description as='a'>{item.orderDate}</List.Description>
                        <List.Description as='a'>{item.brandName}, {item.dosageFormName}</List.Description>
                    </List.Content>
                </List.Item>
            );
        })
    }
    else{
        list = <Alert severity="info">You have no order history with us</Alert>;
    }

    return (
        <Container component="main" maxWidth="md" className = "order-container">
            <h1>Orders</h1>
            <List divided verticalAlign='middle'>
                {list}
            </List>
        </Container>
    );
}

export default connect(
    null,
    order.actions
)(OrderPage);