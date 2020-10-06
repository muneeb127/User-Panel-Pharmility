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
    let orders = useSelector(state => state.order.list);

    useEffect(()=>{
        props.readOrderAction(user.userid);
    }, [])

    useEffect(()=> {
        console.log("Orders: ", orders);
    }, [orders]);

    const CustomDate = (date) => {
        console.log("Date: ", date);
        console.log(typeof(date));
        const dateObj = new Date(date);
        return(
            <>
            <span>{dateObj.toLocaleDateString("en-GB", {year: 'numeric', month: 'short', day: 'numeric'})}</span>
            {/* <span>, {dateObj.toLocaleTimeString("en-US")}</span> */}
            </>
        )
    }

    let list;
    if(orders.length > 0){
        orders = orders.reverse();
        list = orders.map((item)=> {
            return (
                <List.Item>
                    <List.Content floated='right'>
                        <List.Header className = "order-quantity">Qty: {item.quantity}</List.Header>
                        <Chip
                            label={item.status}
                            color= {item.status == 'Fulfilled'?"primary":(item.status == 'Cancelled'?"secondary":"default")}
                            variant="outlined"
                            className = {item.status === 'Pending'?"pending-order":""}
                        />
                    </List.Content>
                    <List.Icon name='medkit' size='big' verticalAlign='middle' />
                    <List.Content>
                        <List.Header className = "retailer-name">{item.retailerId}</List.Header>
                        <List.Description as='a'>{item.retailerAddress}</List.Description>
                        {/* <List.Description as='a'>{item.orderDate}</List.Description> */}
                        <List.Description as='a'>{CustomDate(item.orderDate)}</List.Description>
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