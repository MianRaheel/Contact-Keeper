import React, { useReducer } from 'react';
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT, 
    DELETE_CONTACT,
    SET_CURRENT ,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CONTACT_ERROR,
    FILTER_CONTACTS, 
    CLEAR_FILTER,
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts : null,
        current: null,
        filtered: null,
        error: null
    };
    const [state, dispatch] = useReducer(contactReducer, initialState);

    // GET CONTACTS 
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            // contact.id = uuid();
            dispatch({type: GET_CONTACTS, payload: res.data});
            console.log('Contact Fetched');
        } catch (err) {
            dispatch({type: CONTACT_ERROR, payload: err.response.msg});
        }
    
    }

    // ADD CONTACT 
    const addContact = async contact => {
        const config = {
            header: {
                'Content-Type' : 'application-json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({type: ADD_CONTACT, payload: res.data});
            console.log('Contact Saved');
        } catch (err) {
            dispatch({type: CONTACT_ERROR, payload: err.response.msg});
        }
    
    }

    // DELETE CONTACT
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({type: DELETE_CONTACT, payload: id});
            console.log('Contact Deleted');
        } catch (err) {
            dispatch({type: CONTACT_ERROR, payload: err.response.msg});
        }
        dispatch({type: DELETE_CONTACT, payload: id});
    }

    // SET CURRENT 
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact});
    }

    // CLEAR CURRENT
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    }

    // UPDATE CONTACT 
    const updateContact = async contact => {
        const config = {
            header: {
                'Content-Type' : 'application-json'
            }
        }
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({type: UPDATE_CONTACT, payload: res.data});
            console.log('Contact Updated');
        } catch (err) {
            dispatch({type: CONTACT_ERROR, payload: err.response.msg});
        }
    }

    // FILTER CONTACTS 
    const filterContacts = text => {
        dispatch({type: FILTER_CONTACTS, payload: text});
    }

    // CLEAR FILTER
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER});
    }

    // CLEAR CONTACTS
    const clearContacts = () => {
        dispatch({type: CLEAR_CONTACTS});
    }

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;