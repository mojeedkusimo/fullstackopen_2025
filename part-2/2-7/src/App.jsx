import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]); 
  const [newName, setNewName] = useState('');

  const handleNameChange = (e) => setNewName(e.target.value);

  const addName = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName
    };

    const isNameExist = persons.find(el => el.name === newName);

    if (isNameExist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    
    setPersons(persons.concat(personObject));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form  onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App;