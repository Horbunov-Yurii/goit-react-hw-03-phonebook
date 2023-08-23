import { Component } from 'react';
import { nanoid } from 'nanoid';
export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  hendleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  hendleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const id = nanoid();
    const newContact = { id, name, number };
    this.props.onSubmit(newContact);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.hendleSubmit}>
        <h2>Phoneboock</h2>
        <label>
          Name
          <input
            onChange={this.hendleChange}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <br />
        <label>
          Number
          <input
            onChange={this.hendleChange}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <br />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
