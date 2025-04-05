import { useState } from 'react';
import axios from 'axios';

const CountrySearch = ({ searchName, handleSearch }) => {
  return (
    <div>
      find countries: <input value={searchName} onChange={handleSearch} />
    </div>
  )
}

const DisplayData = ({ filteredCountries, selectOneCountry }) => {
  return (
    <div>
      {
        filteredCountries.length > 10 ? <p>Too many matches, specify another filter</p> :
          filteredCountries.length === 1 ? <CountryDetails country={filteredCountries[0]} /> :
            filteredCountries.map(country =>
              <p key={country.name.common}>{country.name.common}
                <button onClick={() => selectOneCountry(country.name.common)}>more</button>
              </p>)
      }
    </div>
  )
}

const CountryDetails = ({ country }) => {
console.log(country);
  if (!country) return null;
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}


const App = () => {

  const [oneCountryView, setOneCountryView] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleSearch = (event) => {
    setSearchName(event.target.value);
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const filtered = response.data.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilteredCountries(filtered);
      })
      .catch(error => {
        console.error("Error fetching countries: ", error);
      });
  }

  const selectOneCountry = (country) => {
    console.log(country);
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(response => {
        console.log(response);
        setOneCountryView(response.data);
      })
      .catch(error => {
        console.error("Error fetching country details: ", error);
      });
    // setOneCountryView(country);
  }
  return (
    <div>
      <h1>Countries</h1>
      <CountrySearch searchName={searchName} handleSearch={handleSearch} />
      <DisplayData filteredCountries={filteredCountries} selectOneCountry={selectOneCountry} />
      <CountryDetails country={oneCountryView}/>
    </div>
  )
}

export default App;