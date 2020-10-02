import React, {useState, useEffect} from 'react';
import {useSelector, connect} from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import { useForm, Controller } from "react-hook-form";
import * as order from '../../../store/ducks/order.duck';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';


function CheckOutModal(props) {

    const methods = useForm({
        validateCriteriaMode: "all"
    });
    const { handleSubmit, control, reset, errors } = methods;

    useEffect(()=> {
        console.log("Data: ", props.inventoryData);
        console.log("User: ", user);
    }, []);

    // useEffect(() => {
    //     return function cleanup() {
    //         API.unsubscribe()
    //     }
    // })

    const [show, setShow] = useState(true);
    const handleClose = () => {
        props.disableModal();
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleModalSubmit = (data) => {
        let orderData = {
            inventoryId: inventoryData.id,
            statusId: 2,
            date : new Date().toLocaleDateString("en-GB", {year: 'numeric', month: 'short', day: 'numeric'}),
            quantity: data.quantity,
            userId: user.userid
        }

        console.log("Order Data: ", orderData);
        props.createOrderAction(orderData);

        setShow(false);
        props.disableModal();
    }

    const {inventoryData} = props;
    const user = useSelector(state => state.auth.user);

    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(handleModalSubmit)} autoComplete="off">
                <Modal.Body  className="show-grid">
                    <Row>
                        <Col xs={12} md={6}>
                            <h1>{inventoryData.brandName}</h1>
                            <hr></hr>
                            <h3>{inventoryData.retailerName}</h3>
                            <h4>{inventoryData.retailerAddress}</h4>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <Controller 
                                    as={<TextField label="Quantity" margin="normal" error={errors.quantity}/>} 
                                    name="quantity" 
                                    control={control} 
                                    rules={{required: 'Quantity is required', pattern: {value: /^[0-9]+$/ , message: "This input is number only"}}}
                                    defaultValue = '0'
                                />
                                <ErrorMessage errors={errors} name="quantity">
                                    {({ messages }) =>
                                    messages &&
                                    Object.entries(messages).map(([type, message]) => (
                                        <p key={type}>{message}</p>
                                    ))
                                    }
                                </ErrorMessage>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" type = "submit">
                     Submit
                    </Button>
                </Modal.Footer>
            </form>
            </Modal>
        </>
    )
}

export default connect(
    null,
    order.actions
)(CheckOutModal);
