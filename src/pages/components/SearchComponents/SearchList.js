// //To render the list of medicines(which has been searched) 
// //using the brandList array on clicking the submit button
// import React from 'react';
// import SelectedMedicine from './SelectedMedicine';
// import Accordion from 'react-bootstrap/Accordion';
// import { ListGroup, Card } from 'react-bootstrap';

// class SearchList extends React.Component{

//     constructor(props){
//         super(props);
//         this.state = {
//             selectedMedicines: [],
//             isSelected: false
//         }
//     }

//     componentDidUpdate(prevProps){
//         if(!(this.props.brandList == prevProps.brandList)) // Check if it's a new medicine
//         {
//             this.setState({isSelected: false});
//         }
//     }

//     onClickHandler = (event,item) => {
//         // console.log(e,v);
//         //item = item which has been clicked by the user
//         //We need to expand that medicine to show it's dosage type
//         //medicineList contains the list of all the medicines which share the same generic
//         const {medicineList} = this.props;

//         //Fetching all the medicines in medicineList which have the same brand name but have different dosage form
//         let results = medicineList.filter(medicine => {
//             return medicine.name === item.name ;
//         });

//         console.log("Selected Medicine: ", results);
//         this.setState({selectedMedicines: results, isSelected: true});
//     }


//     render(){

//         let list = [];
//         const brandList = this.props.brandList;
//         list = brandList.map((item , i) => {
//             //Mapping each list item in BrandList as a different medicine
//             return (     
//                 //Passing the item in brandlist to onClickHandler
//                 // <Accordion className = "list-item" key = {item.id}>
//                 //     <Card style ={{borderRadius: "10px"}} className = "card-item" onClick = {(e)=> {this.onClickHandler(e,item)}}>
//                 //         <Accordion.Toggle as={Card.Header} eventKey={i}>
//                 //             <Card.Title className = "med-name">{item.name}</Card.Title>
//                 //             <Card.Subtitle className = "company-name">{item.manufacturer}</Card.Subtitle>
//                 //             {this.state.isSelected && <SelectedMedicine selectedMedicines = {this.state.selectedMedicines} eventKey = {i}/>}
//                 //         </Accordion.Toggle>
//                 //     </Card>
//                 // </Accordion>
//                 <Card  key = {item.id} style ={{borderRadius: "10px"}} className = "card-item" onClick = {(e)=> {this.onClickHandler(e,item)}}>
//                     <Accordion.Toggle as={Card.Header} eventKey={i}>
//                         <Card.Title className = "med-name">{item.name}</Card.Title>
//                         <Card.Subtitle className = "company-name">{item.manufacturer}</Card.Subtitle>
//                         {this.state.isSelected && <SelectedMedicine selectedMedicines = {this.state.selectedMedicines} eventKey = {i}/>}
//                     </Accordion.Toggle>
//                 </Card>
//             );
//         });

//         return (
//             //Rendering the list
//             <>
//             <ListGroup className = "medicine-list">
//                 <Accordion className = "list-item">
//                     {list}
//                 </Accordion>
//             </ListGroup>
//             </>
//         );
//     }
// }

// export default SearchList ;

//To render the list of medicines(which has been searched) 
//using the brandList array on clicking the submit button

import React from 'react';
import SelectedMedicine from './SelectedMedicine';
import Accordion from 'react-bootstrap/Accordion';
import { ListGroup, Card } from 'react-bootstrap';

class SearchList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            // brandList: [],
            // medicineList:[],
            selectedMedicines: [],
            isSelected: false
        }
    }

    componentDidUpdate(prevProps){
        if(!(this.props.brandList == prevProps.brandList)) // Check if it's a new medicine
        {
            this.setState({isSelected: false});
        }
    }

    onClickHandler = (event,item) => {
        // console.log(e,v);
        //item = item which has been clicked by the user
        //We need to expand that medicine to show it's dosage type
        //medicineList contains the list of all the medicines which share the same generic
        const {medicineList} = this.props;

        //Fetching all the medicines in medicineList which have the same brand name but have different dosage form
        let results = medicineList.filter(medicine => {
            return medicine.name === item.name ;
        });

        this.setState({selectedMedicines: results, isSelected: true});
    }


    render(){

        let list = [];
        const brandList = this.props.brandList;
        list = brandList.map((item , i) => {
            //Mapping each list item in BrandList as a different medicine
            return (     
                //Passing the item in brandlist to onClickHandler
                    <Card key = {item.id} style ={{borderRadius: "10px"}} className = "card-item" onClick = {(e)=> {this.onClickHandler(e,item)}}>
                        <Accordion.Toggle as={Card.Header} eventKey={i}>
                            <Card.Title className = "med-name">{item.name}</Card.Title>
                            <Card.Subtitle className = "company-name">{item.manufacturer}</Card.Subtitle>
                        </Accordion.Toggle>
                        {this.state.isSelected && <SelectedMedicine selectedMedicines = {this.state.selectedMedicines} eventKey = {i}/>}
                    </Card>
            );
        });

        return (
            //Rendering the list
            <>
            <ListGroup className = "medicine-list">
                <Accordion className = "list-item">
                    {list}
                </Accordion>
            </ListGroup>
            </>
        );
    }
}

export default SearchList ;