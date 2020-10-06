import React, {useState, useEffect} from 'react';
import {useSelector, connect} from 'react-redux';
import { useHistory } from "react-router-dom";
import { ErrorMessage } from '@hookform/error-message';
import { useForm, Controller } from "react-hook-form";
import * as order from '../../../store/ducks/order.duck';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap';
import { Card } from 'semantic-ui-react';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons';

function CheckOutModal(props) {

    let history = useHistory();
    const methods = useForm({
        validateCriteriaMode: "all"
    });
    const { handleSubmit, control, reset, errors } = methods;

    useEffect(()=> {
        console.log("Data: ", props.inventoryData);
        console.log("User: ", user);
    }, []);

    const [show, setShow] = useState(true);
    const handleClose = () => {
        props.disableModal();
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleModalSubmit = (data) => {
        let orderData = {
            inventoryId: inventoryData.id,
            statusId: 12,
            date : new Date().toLocaleDateString("en-GB", {year: 'numeric', month: 'short', day: 'numeric'}),
            quantity: data.quantity,
            userId: user.userid
        }

        console.log("Order Data: ", orderData);
        props.createOrderAction(orderData);

        setShow(false);
        props.disableModal();
        history.push('/order')
    }

    const {inventoryData} = props;
    const user = useSelector(state => state.auth.user);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Reserve Order</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(handleModalSubmit)} autoComplete="off">
                <Modal.Body className="show-grid">
                    <Card className = "checkout-card">
                        <Card.Content>
                            <FontAwesomeIcon className = "icon-right" size = "4x" icon={faPills} />
                            <Card.Header>{inventoryData.brandName}</Card.Header>
                            {/* <Card.Meta>{inventoryData.manufacturerName}</Card.Meta> */}
                            <Card.Description  style = {{textTransform : "Capitalize"}}>
                                Retailer: <strong>{inventoryData.retailerName}</strong> <br></br>
                                Address: <strong>{inventoryData.retailerAddress}</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Card.Description>
                                Donot chew or crush, swollow whole<br></br>
                                For external use only<br></br>
                                For oral use only<br></br>
                                Keep medicine out of children's reach<br></br>
                                Call your doctor for medical advice about side effects
                            </Card.Description>
                            <div className = "qty-input">
                                <Controller 
                                    as={<TextField id="filled-number" label="Quantity" type="number" InputLabelProps={{shrink: true,}} variant="outlined" margin="normal" error={errors.quantity}/>} 
                                    name="quantity" 
                                    control={control} 
                                    // style={{ width: 400, marginBottom: 10 }}
                                    rules={{required: 'Quantity is required', pattern: {value: /^[0-9]+$/ , message: "This input is number only"}, pattern: {value: /^0*[1-9]\d*$/ , message: "Quantity should be greater than zero"}}}
                                    defaultValue = '1'
                                    className = "qty-input-textbox"
                                />
                                <ErrorMessage errors={errors} name="quantity">
                                    {({ messages }) =>
                                    messages &&
                                    Object.entries(messages).map(([type, message]) => (
                                        <p key={type} >{message}</p>
                                    ))
                                    }
                                </ErrorMessage>
                            </div>
                        </Card.Content>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" type = "submit">
                     Reserve
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
