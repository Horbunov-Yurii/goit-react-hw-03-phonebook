import { Component } from 'react';
import { Form } from './Form/Form';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import storage from '../utils/storage';

const LOCALSTORAGE_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = storage.load(LOCALSTORAGE_KEY);
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      storage.save(LOCALSTORAGE_KEY, contacts);
    }
  }

  hendleSubmit = newContact => {
    const isExist = this.state.contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isExist) {
      alert('contact already exists');
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  hendleDelitContact = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== idContact),
    }));
  };

  hendleFilterdContacts = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    const FilteredContact = this.getFilteredContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={this.hendleSubmit} />

        <h2>Filter Contacts</h2>
        <Filter filterContact={this.hendleFilterdContacts} />
        <ContactsList
          contacts={FilteredContact}
          deleteContacts={this.hendleDelitContact}
        />
      </div>
    );
  }
}
