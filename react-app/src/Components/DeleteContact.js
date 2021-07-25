import React from 'react';
import { Link } from 'react-router-dom';

const DeleteContact = (props) => {
    const back = () => {
        props.history.push('/');
    };
    const remove = () => {
        props.getContactId(props.location.state.contact.id);
        props.history.push('/');
    };
    return(
        <div class="ui container centered">
            <h2>Are you sure you want to remove {props.location.state.contact.name} from you contacts?</h2>
            <button className='ui button red left aligned' onClick={back}>Cancel</button>
            <button className='ui button green right aligned' onClick={remove}>Yes</button>
        </div>
    );
}

export default DeleteContact;