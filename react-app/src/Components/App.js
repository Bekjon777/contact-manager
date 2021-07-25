import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import api from '../api/contacts.js';
import './App.css';
import AddContact from './AddContact';
import ContactList from './ContactList';
import Header from './Header';
import CardDetail from './CardDetail';
import DeleteContact from './DeleteContact';
import UpdateContact from './UpdateContact.js';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const retrieveContacts = async () => {
    const retrieve = await api.get('/contacts');
    return retrieve.data;
  };
  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact
    };
    const response = await api.post('/contacts', request);
    setContacts([...contacts, response.data]);
  };
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(contacts.map((contact) => {
      return contact.id === id ? {...response.data} : contact;
    }));
  };
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };
  useEffect(() => {
    const retrieveAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    }
    retrieveAllContacts();
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route 
            path="/" 
            exact 
            render={(props) => (
              <ContactList 
                {...props} 
                contacts={contacts} 
              />
            )} 
          />
          <Route 
            path="/add" 
            render={(props) => (
              <AddContact
                {...props} 
                addContactHandler={addContactHandler} 
              />
            )} 
          />
          <Route 
            path="/update" 
            render={(props) => (
              <UpdateContact
                {...props} 
                updateContactHandler={updateContactHandler} 
              />
            )} 
          />
          <Route 
            path="/delete" 
            render={(props) => (
              <DeleteContact
                {...props} 
                getContactId={removeContactHandler} 
              />
            )} 
          />
          <Route path='/content/:id' component={CardDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
