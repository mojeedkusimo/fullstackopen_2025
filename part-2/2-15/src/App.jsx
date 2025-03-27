import { useState, useEffect } from 'react';
import apiService from './services/api';

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


const Person = ({ person, deleteUser }) => {
  return (
    <p>
      {person.name} {person.number}{' '}
      <button onClick={() => deleteUser(person)}>delete</button>
    </p>
  )
}
const PersonsDisplay = ({ filteredPersons, persons, deleteUser }) => {
  return (
    <div>

      {filteredPersons.length > 0 ?
        filteredPersons.map(person => <Person key={person.name} person={person} deleteUser={deleteUser} />) :
        persons.map(person => <Person key={person.name} person={person} deleteUser={deleteUser} />)
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

    apiService
      .getAllUsers()
      .then(personInitialData => setPersons(personInitialData))
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
      if (window.confirm(`${newName} is already added to phonebook, do you want to update the number?`)) {
        apiService
        .updateUserData(isNameExist.id, personObject)
        .then(updatedData => {
          setPersons(persons.map(person => person.id !== isNameExist.id ? person : updatedData))
          setNewName('');
          setNewNumber('');
        })
        .catch(error => console.log("Error: ", error));
      }
      return;
    }

    apiService
      .registerUser(personObject)
      .then(personData => {
        setPersons(persons.concat(personData));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => console.log("Error: ", error));

  }

  const deleteUser = (e) => {

    if (window.confirm(`Delete ${e.name} ?`)) {
      apiService
        .deleteUser(e.id)
        .then(deletedData => {
          setPersons(persons.filter(person => person.id !== deletedData.id))
          // apiService
          //   .getAllUsers()
          //   .then(personsData => setPersons(personsData))
        })
        .catch(error => console.log("Error: ", error));
    }
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
        deleteUser={deleteUser}
      />

    </div>
  )
}

export default App;