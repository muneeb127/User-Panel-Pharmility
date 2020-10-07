import React, {Component, useState, useEffect} from 'react';
import QrReader from 'react-qr-reader';
import Container from '@material-ui/core/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/styles.css';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse} from '@fortawesome/free-solid-svg-icons';
import { faIndustry} from '@fortawesome/free-solid-svg-icons';
import { faClinicMedical } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Scanner(props){

    const classes = useStyles();


    const [delay, setDelay] = useState();
    const [result, setResult] = useState('No result');
    const [supplyChain, setSupplyChain] = useState([]);
    const [show, setShow] = useState(false);

    // useEffect(()=> {
    //     let information = "GTIN:12345,BatchNo:B11,SerialNumber:12";
    //     let infoArr = information.split(',');
    //     let result = information.split(',').map(s => s.split(':')).slice(0);
    //     const obj = Object.fromEntries(result);
    //     console.log("Info: ", infoArr);
    //     console.log("Res: ", result);
    //     console.log(obj);
    // });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    const handleScan = data => {
        if (data){
            setResult(data);

            let information = data;
            let infoArr = information.split(',');
            let result = information.split(',').map(s => s.split(':')).slice(0);
            const obj = Object.fromEntries(result);
            console.log("Info: ", infoArr);
            console.log("Res: ", result);
            console.log(obj);

            if(obj.GTIN!=null){
                axios.post("https://localhost:44319/api/qrcode/scanQR", obj)
            .then((res)=>{
                const movements = res.data
                setSupplyChain(movements);

            })
            }
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

                <Modal show={show} onHide={handleClose} centered size ="lg" >
                    <Modal.Header closeButton>
                    <Modal.Title>QR Code Result</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {result}
                        <Timeline align="alternate">
                            {
                                supplyChain.map((item)=>{
                                    return (<TimelineItem>
                                    <TimelineSeparator>
                                    <TimelineDot>
                                        <FontAwesomeIcon size = "2x" icon={faIndustry} />
                                    </TimelineDot>
                                    <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1">
                                        {item.text}
                                        </Typography>
                                        <Typography>{item.time}</Typography>
                                        <Typography>{item.latitude}</Typography>
                                        <Typography>{item.longitude}</Typography>
                                    </Paper>
                                    </TimelineContent>
                                </TimelineItem>)
                                })
                            }
                            {/* <TimelineItem>
                                <TimelineSeparator>
                                <TimelineDot>
                                    <FontAwesomeIcon size = "2x" icon={faIndustry} />
                                </TimelineDot>
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                    Eat
                                    </Typography>
                                    <Typography>Because you need strength</Typography>
                                </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                <TimelineDot>
                                    <FontAwesomeIcon size = "2x" icon={faWarehouse} />
                                </TimelineDot>
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                    Code
                                    </Typography>
                                    <Typography>Because it&apos;s awesome!</Typography>
                                </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                <TimelineDot>
                                    <FontAwesomeIcon size = "2x" icon={faWarehouse} />
                                </TimelineDot>
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                    Code
                                    </Typography>
                                    <Typography>Because it&apos;s awesome!</Typography>
                                </Paper>
                                </TimelineContent>
                            </TimelineItem> */}
                        </Timeline>
                    </Modal.Body>
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

