const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

app.use((morgan(function (tokens, req, res) {
  const body = req.body;
  console.log(tokens);
  console.log(tokens.req(req, res,'content-length'));
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
})));

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

app.post('/api/persons', (req, res) => {
  const newPerson = req.body;
  const exists = persons.find(p => p.name === newPerson.name);

  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ error: 'Name or number is missing' });
  } else if (exists) {
    return res.status(400).json({ error: 'Name must be unique' });
  }
  newPerson.id = (Math.random() * 1000).toString();
  persons.push(newPerson);
  return res.status(201).json(newPerson);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});