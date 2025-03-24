import { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ searchName, handleSearchName }) => {
  return (
    <div>
      search by: <input
        value={searchName}
        onChange={handleSearchName}
      />
    </div>
  )
}

const PhonebookForm = ({ addUserDetails, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
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
  )
}

const PersonsDisplay = ({ filteredPersons, persons }) => {
  return (
    <div>

      {filteredPersons.length > 0 ?
        filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>) :
        persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
      }

    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data))
      .catch(error => console.log("Error: ", error));

  }, []);

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

    axios
      .post("http://localhost:3001/persons", personObject)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => console.log("Error: ", error));

  }

  return (
    <div>

      <h2>Filter</h2>
      <Filter
        searchName={searchName}
        handleSearchName={handleSearchName}
      />

      <h2>Phonebook</h2>
      <PhonebookForm
        addUserDetails={addUserDetails}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <PersonsDisplay
        persons={persons}
        filteredPersons={filteredPersons}
      />

    </div>
  )
}

export default App;