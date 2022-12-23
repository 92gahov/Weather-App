import React, { useEffect, useState } from 'react';
import cloud from '../icons/cloud.png';
import fog from '../icons/fog.png';
import rain from '../icons/rain.png';
import snow from '../icons/snow.png';
import storm from '../icons/storm.png';
import sunny from '../icons/sunny.png';
import cal from '../icons/cal.png';

const Output = ({ cityName,
    countryCode,
    humidity,
    description,
    pressure,
    tempToFahr,
    tempToCel,
    feelsLikeToFahr,
    feelsLikeToCel,
    minToFahr,
    minToCel,
    maxToFahr,
    maxToCel,
    windSpeed,
    visibility,
    icon }) => {

    const [iconStatus, setIconStatus] = useState(null);

    const addZero = (i) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekday[new Date().getDay()];
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    hour = addZero(hour);
    minutes = addZero(minutes);

    useEffect(() => {
        if (icon === "storm") {
            setIconStatus(storm);
        } else if (icon === "rain") {
            setIconStatus(rain);
        } else if (icon === "snow") {
            setIconStatus(snow);
        } else if (icon === "fog") {
            setIconStatus(fog);
        } else if (icon === "sun") {
            setIconStatus(sunny);
        } else if (icon === "cloud") {
            setIconStatus(cloud);
        }
    }, [icon]);

    return (
        <div className='output'>
            <div className='date'>
                <img src={cal} alt=''></img>
                <span>{day} {hour}:{minutes}</span>
            </div>
            <div className='grid'>
                <div>
                    <p>{cityName}, {countryCode}</p>
                </div>
                <div>
                    <div className='icon'>
                        <img src={iconStatus} alt=""></img>
                    </div>
                    <div className='description'>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div>
                    <p style={{ fontSize: '22px', fontWeight: 'bold' }}>{tempToFahr} <span>&#8457;</span> <span>|</span> {tempToCel} <span>&#8451;</span></p>
                    <p><span style={{ fontWeight: 'bold' }}>Feels like:</span> {feelsLikeToFahr} <span>&#8457;</span> <span>|</span> {feelsLikeToCel} <span>&#8451;</span></p>
                    <div className='max-min'>
                        <div>
                            <p><span style={{ fontWeight: 'bold' }}>Max:</span> {maxToFahr} <span>&#8457;</span> <span>|</span> {maxToCel} <span>&#8451;</span></p>
                        </div>
                        <div>
                            <p><span style={{ fontWeight: 'bold' }}>Min:</span> {minToFahr} <span>&#8457;</span> <span>|</span> {minToCel} <span>&#8451;</span></p>
                        </div>
                    </div>
                </div>
                <div>
                    <p><span style={{ fontWeight: 'bold' }}>Humidity:</span> <span>{humidity} %</span></p>
                    <p><span style={{ fontWeight: 'bold' }}>Wind:</span> <span>{windSpeed} </span>km/h</p>
                    <p><span style={{ fontWeight: 'bold' }}>Visibility:</span> <span>{visibility}</span> km</p>
                    <p><span style={{ fontWeight: 'bold' }}>Pressure:</span> <span>{pressure}</span> hPa</p>
                </div>
            </div>
        </div>
    )
};

export default Output;