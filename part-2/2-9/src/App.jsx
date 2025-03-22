import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Hassan Jude', number: '08012345678' },
    { name: 'Rebecca Fatimah', number: '08098765432' },
    { name: 'Frank Akpan', number: '08056784321' },
    { name: 'Folashade Mutiu', number: '08034567890' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleSearchName = (e) => {
    setSearchName(e.target.value);

    const filteredPersonsObj = persons.filter(person => {
      return person.name.toLowerCase().includes(searchName.toLowerCase());
    }
    );

    setFilteredPersons(filteredPersonsObj);
    
  };

  const addUserDetails = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };

    const isNameExist = persons.find(el => el.name === newName);

    if (isNameExist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <div>
        search by: <input
          value={searchName}
          onChange={handleSearchName}
        />
      </div>
      <h2>Phonebook</h2>
      <form onSubmit={addUserDetails}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          phoneNumber: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { 
      filteredPersons.length > 0 ?
      filteredPersons.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      ) :
      persons.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App;