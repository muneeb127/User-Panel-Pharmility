//Displaying the list of alternate medicines on the location page
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { Loader, Card, List } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons';
import Alert from '@material-ui/lab/Alert';

function AlternateMedicines(props){

    const [alternateMedicines, setAlternateMedicines] = useState([]);
    const [loading, setLoading] = useState(true);

    let alternateMedicinesList = [];
    alternateMedicinesList = useSelector(state => state.medicine.alternateMedicines);

    useEffect(()=>{
        console.log("AM: ", alternateMedicinesList);
        fetchingList();
    }, [alternateMedicinesList]);


    function fetchingList(){
        let list;
        if(alternateMedicinesList.length > 0){
            list = alternateMedicinesList.map((medicine)=> {
                return(
                        <List.Item>
                            <List.Icon name='plus circle' size='big' verticalAlign='middle' />
                            <List.Content>
                                <a className = "alternate-meds" href = {`location?id=${medicine.id}`}>
                                    <List.Header>{medicine.brandName}</List.Header>
                                </a>                    
                                <List.Description>{medicine.manufacturerName}</List.Description>
                            </List.Content>
                        </List.Item>
                );
            })
        }
        else{
            list = <Alert severity="info">There are no alternates available for this product</Alert>;
        }
        setAlternateMedicines(list);
        setLoading(false);
    }

    return(
        <Card>
            <Card.Content>
                <FontAwesomeIcon className = "icon-right" size = "4x" icon={faPills} rotation = {180} />
                <Card.Header>Alternate Medicines</Card.Header>
            </Card.Content>
            <Card.Content extra className = "overflow-list">
                <List divided relaxed >
                    {loading ? <Loader size='massive' active inline='centered' /> : alternateMedicines}
                </List>
            </Card.Content>
        </Card>
    );
}

export default AlternateMedicines;