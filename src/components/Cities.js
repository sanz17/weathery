

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import AirIcon from '@mui/icons-material/Air';
import Autosuggest from 'react-autosuggest';

const API_KEY = '187669da64d04d299f365811231602';
const WeatherCard = ({ sunrise, sunset }) => (
    <div>
        <p>Sunrise: {sunrise}</p>
        <p>Sunset: {sunset}</p>
    </div>
);

function WeatherForecast() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [searchOptions, setSearchOptions] = useState([]);
    const [savedCity, setSavedCity] = useState(localStorage.getItem('savedCity') || '');
    const [currentLocation, setCurrentLocation] = useState('');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [savedLocations, setSavedLocations] = useState([]);

    useEffect(() => {
        // fetch user's current location and weather data on component mount
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=11`);
            setCurrentLocation(response.data.location.name);
            setCurrentWeather(response.data.forecast.forecastday[0]);
        });
    }, []);

    const handleLocationChange = async (event, { newValue }) => {
        // fetch weather data for selected location
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${newValue}&days=11`);
        setCurrentLocation(response.data.location.name);
        setCurrentWeather(response.data.forecast.forecastday[0]);
    };

    const handleLocationSave = () => {
        // save selected location to LocalStorage and update state
        const locations = JSON.parse(localStorage.getItem('savedLocations')) || [];
        if (!locations.includes(currentLocation)) {
            locations.push(currentLocation);
            localStorage.setItem('savedLocations', JSON.stringify(locations));
            setSavedLocations(locations);
        }
    };

    const handleLocationRemove = (location) => {
        // remove saved location from LocalStorage and update state
        const locations = JSON.parse(localStorage.getItem('savedLocations')) || [];
        const index = locations.indexOf(location);
        if (index !== -1) {
            locations.splice(index, 1);
            localStorage.setItem('savedLocations', JSON.stringify(locations));
            setSavedLocations(locations);
        }
    };

    const renderSuggestion = (suggestion) => (
        <div>{suggestion.name}</div>
    );

    const getSuggestions = async (value) => {
        // fetch autocomplete suggestions from weatherapi.com API
        const response = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${value}`);
        return response.data.map((result) => ({
            name: result.name,
        }));
    };



    useEffect(() => {
        async function fetchSearchOptions() {
            if (savedCity) {
                const response = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${savedCity}`);
                setSearchOptions(response.data);
            }
        }
        fetchSearchOptions();
    }, [savedCity]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=10`);
        setWeatherData(response.data.forecast.forecastday);
        setSearchOptions([]);
        localStorage.setItem('savedCity', city);
    };

    const handleAutofill = async (event) => {
        setCity(event.target.value);
        if (event.target.value) {
            const response = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${event.target.value}`);
            setSearchOptions(response.data);
        } else {
            setSearchOptions([]);
        }
    };

    return (
        <div className='cities'>
            {currentWeather && (
                <div style={{'marginLeft':'20px','borderBottom': '1px solid rgba(32, 32, 32, 0.32)', 'color': '#2d2929'}}>
                    <h1>Today's</h1>
                    <WeatherCard
                        sunrise={currentWeather.astro.sunrise}
                        sunset={currentWeather.astro.sunset}
                    />
                </div>
            )}
            <NavBar />
            <form onSubmit={handleSubmit}>
                <span style={{ 'cursor': 'pointer' }}>
                    <DeviceThermostatIcon
                        style={{ 'marginTop': '50px', 'marginLeft': '550px', 'fontSize': '35px' }} />
                    <p style={{ 'marginTop': '-40px', 'marginLeft': '600px', 'fontSize': '35px' }}>Change temperature scale C or F
                    </p>
                </span>
                <span style={{ 'cursor': 'pointer' }}>
                    <p className="location" style={{ 'marginTop': '100px', 'marginLeft': '650px', 'fontSize': '35px' }}>
                        <label htmlFor="city">Enter your city name:</label>
                        <input type="text" id="city" value={city} style={{ 'marginLeft': '35px', 'width': '20%', 'borderRadius': '10%', 'textAlign': 'center' }} onChange={handleAutofill} />
                    </p>
                </span>
            </form>

            <table>
                <thead>

                    <tr >
                        <th style={{
                            'paddingLeft': '190px', 'fontSize': '30px', 'paddingTop': '20px', 'paddingRight': '50px',
                            'borderBottom': '1px solid rgba(32, 32, 32, 0.32)', 'color': '#2d2929'
                        }}>Date <CalendarTodayIcon /></th>
                        <th style={{
                            'paddingLeft': '80px', 'fontSize': '30px', 'paddingTop': '20px', 'paddingRight': '50px',
                            'borderBottom': '1px solid rgba(32, 32, 32, 0.32)', 'color': '#2d2929'
                        }}>Temperature (??C)<ThermostatAutoIcon /></th>
                        <th style={{
                            'paddingLeft': '80px', 'fontSize': '30px', 'paddingTop': '20px', 'paddingRight': '50px',
                            'borderBottom': '1px solid rgba(32, 32, 32, 0.32)', 'color': '#2d2929'
                        }}>Humidity (%) <NightsStayIcon /></th>
                        <th style={{
                            'paddingLeft': '80px', 'fontSize': '30px', 'paddingTop': '20px', 'paddingRight': '50px',
                            'borderBottom': '1px solid rgba(32, 32, 32, 0.32)', 'color': '#2d2929'
                        }}>Wind Speed (km/h) <AirIcon /></th>
                    </tr>
                </thead>
                <tbody>
                    {weatherData.map((data) => (
                        <tr key={data.date}>
                            <td style={{ 'paddingLeft': '190px', 'fontSize': '25px', 'paddingTop': '20px', 'paddingRight': '50px' }}>{data.date}</td>
                            <td style={{ 'paddingLeft': '110px', 'fontSize': '25px', 'paddingTop': '20px', 'paddingRight': '50px' }}>{data.day.avgtemp_c}</td>
                            <td style={{ 'paddingLeft': '110px', 'fontSize': '25px', 'paddingTop': '20px', 'paddingRight': '50px' }}>{data.day.avghumidity}</td>
                            <td style={{ 'paddingLeft': '110px', 'fontSize': '25px', 'paddingTop': '20px', 'paddingRight': '50px' }}>{data.day.maxwind_kph}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WeatherForecast;
