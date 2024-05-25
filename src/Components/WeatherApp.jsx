/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { WiDayCloudy, WiDayRain, WiDaySunny } from 'react-icons/wi';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const apiKey = '8b0790f632ce002826708c2e528f4b89';

    const handleSearch = () => {
        getWeather(city);
    };

    const getWeather = async (cityName) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
            setWeather(response.data);
            setError('');
        } catch (err) {
            setError('City not found');
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getWeather('Dhaka');
    }, []);

    const getWeatherIcon = (weatherCode) => {
        if (weatherCode === 'Clear') return <WiDaySunny size={64} />;
        if (weatherCode === 'Rain') return <WiDayRain size={64} />;
        return <WiDayCloudy size={64} />;
    };

    const formatTemperature = (temp) => {
        const roundedTemp = Math.round(temp);
        return `${roundedTemp}°C`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4 text-white">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 font-mono">Weather App</h1>
                <div className="form-control mb-6 flex flex-col items-center">
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="input input-bordered w-full  py-2 rounded-xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-200"
                    />
                    <button
                        onClick={handleSearch}
                        className="btn btn-primary mt-4 w-full"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Search'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {weather && (
                    <div className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center justify-center">
                                {getWeatherIcon(weather.weather[0].main)}
                                <h2 className="card-title text-2xl font-bold ml-2">{weather.name}, {weather.sys.country}</h2>
                            </div>
                            <p className="text-center text-lg">{weather.weather[0].description}</p>
                            <p className="text-center text-4xl my-4">{formatTemperature(weather.main.temp)}</p>
                            <div className="flex justify-around text-lg">
                                <p>Humidity: {weather.main.humidity}%</p>
                                <p>Wind: {weather.wind.speed} m/s</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherApp;
