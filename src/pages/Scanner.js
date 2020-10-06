import React, {Component, useState, useEffect} from 'react';
import QrReader from 'react-qr-reader';
import Container from '@material-ui/core/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/styles.css';


function Scanner(props){

    const [delay, setDelay] = useState();
    const [result, setResult] = useState('No result');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         delay: 100,
    //         result: 'No result'
    //     }

    //     this.handleScan = this.handleScan.bind(this);
    //     // this.openImageDialog = this.openImageDialog.bind(this);
    // }
  
 
    const handleScan = data => {
        if (data){
            setResult(data);
            // this.setState({
            //     result: data
            // })
            handleShow();
        }
    }

    const handleError = err => {
        console.error(err)
    }
  
    return (
        <div className = 'scanner-layout'>
            <Container component="main" maxWidth="xs" className = "search-container">
                <QrReader
                    delay={delay}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%'}}
                    facingMode = {"environment"}
                />
                {/* <p>{result}</p> */}
                {/* <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button> */}

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                    <Modal.Title>QR Code Result</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{result}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                {/* <button style = {{marginTop: '20px'}} onClick = {this.openImageDialog}>Insert QR</button> */}
            </Container>
        </div>
    )
}

export default Scanner;

