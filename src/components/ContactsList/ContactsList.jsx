export const ContactsList = ({ contacts, deleteContacts }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          {name} : {number}
          <button onClick={() => deleteContacts(id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};
