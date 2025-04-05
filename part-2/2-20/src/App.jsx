import { useState } from 'react';
import axios from 'axios';

const api_key = import.meta.env.VITE_SOME_KEY;

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
          filteredCountries.length === 1 ? null :
            filteredCountries.map(country =>
              <p key={country.name.common}>{country.name.common}
                <button onClick={() => selectOneCountry(country.name.common)}>more</button>
              </p>)
      }
    </div>
  )
}

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  if (!country) return null;
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`)
    .then(response => {
      setWeather(response.data);
    }
    );
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
      <h3>Weather in {country.capital}</h3>

      {weather && (
        <div>
          <p>Temperature: {weather.main.temp} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

const App = () => {

  const [oneCountryView, setOneCountryView] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleSearch = (event) => {
    setSearchName(event.target.value);
    setOneCountryView(null);

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
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(response => {
        console.log(response);
        setOneCountryView(response.data);
      })
      .catch(error => {
        console.error("Error fetching country details: ", error);
      });
  }
  return (
    <div>
      <h1>Countries</h1>
      <CountrySearch searchName={searchName} handleSearch={handleSearch} />
      <DisplayData filteredCountries={filteredCountries}
        selectOneCountry={selectOneCountry} />
      {
        filteredCountries.length === 1 ?
          <CountryDetails country={filteredCountries[0]} /> :
          <CountryDetails country={oneCountryView} />
      }
    </div>
  )
}

export default App;