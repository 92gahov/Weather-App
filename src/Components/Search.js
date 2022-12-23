import React, { useEffect, useState } from 'react';
import Output from './Output';
import Error from './Error';
import brokenClouds from '../backgrounds/broken_clouds.jpg';
import clearSky from '../backgrounds/clear_sky.jpg';
import fewClouds from '../backgrounds/few_clouds.jpg';
import fog from '../backgrounds/fog.jpg';
import rain from '../backgrounds/rain.jpg';
import snow from '../backgrounds/snow.jpg';
import storm from '../backgrounds/storm.jpg';

const Search = () => {

    const [background, setBackground] = useState(null);
    const [icon, setIcon] = useState("");
    const [error, setError] = useState(true);
    const [errmsg, setErrMsg] = useState("");
    const [cityName, setCityName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [humidity, setHumidity] = useState("");
    const [description, setDescription] = useState("");
    const [pressure, setPressure] = useState("");
    const [tempToFahr, setTempToFahr] = useState("");
    const [tempToCel, setTempToCel] = useState("");
    const [feelsLikeToFahr, setFeelsLikeToFahr] = useState("");
    const [feelsLikeToCel, setFeelsLikeToCel] = useState("");
    const [minToFahr, setMinToFahr] = useState("");
    const [minToCel, setMinToCel] = useState("");
    const [maxToFahr, setMaxToFahr] = useState("");
    const [maxToCel, setMaxToCel] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    const [visibility, setVisibility] = useState("");
    const [inputValue, setInputValue] = useState("");

    const apiKey = process.env.REACT_APP_API_KEY;

    const toCelsius = (t) => {
        const toCelsius = Math.round((t - 32) / 1.8000);
        return toCelsius;
    };

    const getWeatherData = (city, code) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${code}&appid=${apiKey}&units=imperial`)
            .then((res) => res.json())
            .then(data => {
                const { name, sys: { country }, main: { humidity, pressure, temp, feels_like, temp_min, temp_max }, wind: { speed }, visibility } = data;
                const id = data.weather[0].id;
                const mainDesc = data.weather[0].description;
                setDescription(mainDesc[0].toUpperCase() + mainDesc.substring(1));
                setCityName(name);
                setCountryCode(country);
                setHumidity(humidity);
                setPressure(pressure);
                setTempToFahr(Math.round(temp));
                setTempToCel(toCelsius(temp));
                setFeelsLikeToFahr(Math.round(feels_like));
                setFeelsLikeToCel(toCelsius(feels_like));
                setMinToFahr(Math.round(temp_min));
                setMinToCel(toCelsius(temp_min));
                setMaxToFahr(Math.round(temp_max));
                setMaxToCel(toCelsius(temp_max));
                setWindSpeed(Math.round(speed * 1.609344));
                setVisibility((visibility / 1000).toFixed(1));
                if (id >= 200 && id <= 232) {
                    setBackground(storm);
                    setIcon("storm");
                } else if (id >= 300 && id <= 531) {
                    setBackground(rain);
                    setIcon("rain");
                } else if (id >= 600 && id <= 622) {
                    setBackground(snow);
                    setIcon("snow");
                } else if (id >= 701 && id <= 781) {
                    setBackground(fog);
                    setIcon("fog");
                } else if (id === 800) {
                    setBackground(clearSky);
                    setIcon("sun");
                } else if (id === 801 || id === 802) {
                    setBackground(fewClouds);
                    setIcon("cloud");
                } else if (id === 803 || id === 804) {
                    setBackground(brokenClouds);
                    setIcon("cloud");
                }
                setError(true);
            })
            .catch((error) => {
                if (error) {
                    setError(false);
                    setBackground(clearSky);
                    setErrMsg("City not found! Try to be more specific by providing city name and country code, separated by comma.");
                }
            })
    };

    const inputHandler = (e) => {
        setInputValue(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (inputValue === "") {
            return false;
        } else {
            let newSearch = inputValue.split(",");
            getWeatherData(newSearch[0], newSearch[1]);
            setInputValue("");
        }
    };

    useEffect(() => {
        getWeatherData("Sofia", "BG");
        // eslint-disable-next-line
    }, []);


    return (
        <div className='App'>
            <img className='background' src={background} alt=''></img>
            <div className='main'>
                <div className='search'>
                    <form onSubmit={submitHandler}>
                        <input type="text"
                            value={inputValue}
                            onChange={inputHandler}
                            placeholder="Search for a city..."></input>
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
                {
                    error && <Output
                        cityName={cityName}
                        countryCode={countryCode}
                        humidity={humidity}
                        description={description}
                        pressure={pressure}
                        tempToFahr={tempToFahr}
                        tempToCel={tempToCel}
                        feelsLikeToFahr={feelsLikeToFahr}
                        feelsLikeToCel={feelsLikeToCel}
                        minToFahr={minToFahr}
                        minToCel={minToCel}
                        maxToFahr={maxToFahr}
                        maxToCel={maxToCel}
                        windSpeed={windSpeed}
                        visibility={visibility}
                        icon={icon}
                    />
                }
                {
                    !error && <Error errmsg={errmsg} />
                }
            </div>
        </div>
    )
};

export default Search;