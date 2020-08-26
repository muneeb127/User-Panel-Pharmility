// //To render each medicines further types
// import React from 'react';
// import Accordion from 'react-bootstrap/Accordion';
// import { ListGroup, Card, Row, Col } from 'react-bootstrap';

// class SelectedMedicine extends React.Component {

//     onCLickHandler = (e, item, medicine) => {
//         console.log(item);
//         console.log(medicine);
//     }

//     componentDidMount = () =>{
//         console.log("Props: ", this.props);
//     }

//     // componentWillReceiveProps(nextProps){
//     //     if(nextProps){
//     //         this.setState({brandList: nextProps.brandList, medicineList: nextProps.medicineList});
//     //     }
//     // }

//     // componentDidUpdate(prevProps) {
//     //     if(!(this.props.selectedMedicines == prevProps.currentLocation)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
//     //     {
//     //       this.calculateDistances();
//     //     }
//     // }


//     render(){
//         let dosageFormList = [];
//         let description;
//         const {selectedMedicines} = this.props;
//         console.log(this.props);

//         //Selecting the unique dosage form
//         dosageFormList = [...new Set(selectedMedicines.map(item => item.dosage))];

//         description = dosageFormList.map((form, i) => {
//             return (
//                 //Creating segments for different dosage form
//                 <Accordion.Collapse className = "dosage-segment" key = {i} eventKey={this.props.eventKey}>
//                     <Card style = {{padding:20, cursor:"pointer"}}>
//                         <Card.Title className = "dosage-form" >{form}</Card.Title>
//                         <hr></hr>
//                         {selectedMedicines.map((medicine, j) =>{
//                             if(medicine.dosage === form){
//                                 return (
//                                     <a key = {medicine.id} href = {`location?id=${medicine.id}`}>
//                                         <Row className = "med-form" style = {{marginTop: 20}}>
//                                             <Col className = "left-col" lg = {6} md = {6} sm={6}>
//                                                 <Card.Text>{medicine.packaging}</Card.Text>
//                                             </Col>
//                                             <Col lg = {6} md = {6} sm={6}>
//                                                 {medicine.generics.map((item, k)=>{
//                                                     return (
//                                                         <Row key = {k}>
//                                                             <Col lg = {12} md = {12} sm={12}>
//                                                                 <Card.Text style = {{textTransform: "capitalize"}}>
//                                                                     {item.drugname} : {item.strength}
//                                                                 </Card.Text>
//                                                             </Col>
//                                                         </Row>
//                                                     );
//                                                 })}
//                                             </Col>
//                                         </Row>
//                                     </a>
//                                 )
//                             }
//                         })}
//                     </Card>
//                 </Accordion.Collapse>
//             );
//         })

//         return(
//             <ListGroup className = "medicine-list-item">
//                 {description}
//             </ListGroup>
//         ); 
//     }
// }

// export default SelectedMedicine;

//To render each medicines further types
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { ListGroup, Card, Row, Col } from 'react-bootstrap';

class SelectedMedicine extends React.Component {

    onCLickHandler = (e, item, medicine) => {
        console.log(item);
        console.log(medicine);
    }

    // componentWillReceiveProps(nextProps){
    //     if(nextProps){
    //         this.setState({brandList: nextProps.brandList, medicineList: nextProps.medicineList});
    //     }
    // }

    // componentDidUpdate(prevProps) {
    //     if(!(this.props.selectedMedicines == prevProps.currentLocation)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    //     {
    //       this.calculateDistances();
    //     }
    // }


    render(){
        let dosageFormList = [];
        let description;
        const {selectedMedicines} = this.props;
        console.log(this.props.selectedMedicines);
        console.log(this.props.eventKey);

        //Selecting the unique dosage form
        dosageFormList = [...new Set(selectedMedicines.map(item => item.dosage))];

        console.log("Dosage: ", dosageFormList);

        description = dosageFormList.map((form, i) => {
            return (
                //Creating segments for different dosage form
                <Accordion.Collapse className = "dosage-segment" key = {i} eventKey={this.props.eventKey}>
                    <Card style = {{padding:20, cursor:"pointer"}}>
                        <Card.Title className = "dosage-form" >{form}</Card.Title>
                        <hr></hr>
                        {selectedMedicines.map((medicine, j) =>{
                            if(medicine.dosage === form){
                                return (
                                    <a key = {medicine.id} href = {`location?id=${medicine.id}`}>
                                        <Row className = "med-form" style = {{marginTop: 20}}>
                                            <Col className = "left-col" lg = {6} md = {6} sm={6}>
                                                <Card.Text>{medicine.packaging}</Card.Text>
                                            </Col>
                                            <Col lg = {6} md = {6} sm={6}>
                                                {medicine.generics.map((item, k)=>{
                                                    return (
                                                        <Row key = {k}>
                                                            <Col lg = {12} md = {12} sm={12}>
                                                                <Card.Text style = {{textTransform: "capitalize"}}>
                                                                    {item.drugname} : {item.strength}
                                                                </Card.Text>
                                                            </Col>
                                                        </Row>
                                                    );
                                                })}
                                            </Col>
                                        </Row>
                                    </a>
                                )
                            }
                        })}
                    </Card>
                </Accordion.Collapse>
            );
        })

        return(
            <ListGroup className = "medicine-list-item">
                {description}
            </ListGroup>
        ); 
    }
}

export default SelectedMedicine;