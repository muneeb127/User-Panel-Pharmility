//Displaying the list of alternate medicines on the location page
import React from 'react';
import { List } from 'semantic-ui-react';

class AlternateMedicines extends React.Component{

    render (){
        const {alternateMedicines} = this.props;
        // console.log("Alternate: ",alternateMedicines);
        const list = alternateMedicines.map((medicine)=> {
            return(
                <a key = {medicine.id} href = {`location?id=${medicine.id}`}>
                    <List.Item>
                        <List.Icon name='plus circle' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>{medicine.brandName}</List.Header>
                            <List.Description as='a'>{medicine.manufacturerName}</List.Description>
                        </List.Content>
                    </List.Item>
                </a>
            );
        })

        return(
            <List divided relaxed>
                <h1>Alternate Medicines</h1>
                {list}
            </List>
        )
    }
}

export default AlternateMedicines;