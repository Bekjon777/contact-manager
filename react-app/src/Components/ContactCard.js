import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/user.png';

const ContactCard = (props) => {
    const {id, name, email} = props.contact;
    return(
        <div className="item">
            <img className="ui avatar image" src={user} alt="user" />
            <div className="content">
                <Link to={{pathname: `/content/${id}`, state: {contact: props.contact}}}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            <Link to={{pathname: `/delete`, state: {contact: props.contact}}}>
                <i 
                    className="trash alternate outline icon"
                    style={{color:'red', marginTop: '7px', float:'right'}}>
                </i>
            </Link>
            <Link to={{pathname: `/update`, state: {contact: props.contact}}}>
                <i 
                    className="edit alternate outline icon"
                    style={{color:'green', marginTop: '7px', float:'right'}}>
                </i>
            </Link>
        </div>
    );
}

export default ContactCard;