const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

const persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];



app.get('/', (req, res) => {
  return res.send('Hello World! express');
});

app.get('/api/persons', (req, res) => {
  return res.json(persons);
});

app.get('/info', (req, res) => {
  return res.send(`Phonebook has info for ${persons.length} people <br><br> ${new Date()}`);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(p => p.id === id);
  if (person) {
    return res.json(person);
  } else {
    return res.status(404).send('Person not found');
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const remainingPersons = persons.filter(p => p.id !== id);
  if (remainingPersons.length < persons.length) {
    return res.status(204).end();
  } else {
    return res.status(404).send('Person not found');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});