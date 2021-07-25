import React from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} />
        );
    });
    return(
        <div className="ui container">
            <h2>
                Contact list
                <Link to="/add">
                    <button className="ui right floated button blue">Add Contact</button>
                </Link>
            </h2>
            <div className="ui celled list">{renderContactList}</div>
        </div>
    );
};

export default ContactList;