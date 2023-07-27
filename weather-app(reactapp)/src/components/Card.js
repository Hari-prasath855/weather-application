import React from "react";
import "./Card.css";
import cloudyIcon from '../image/pcloudy.png';
import rainyIcon from '../image/Rain.png';
import sunnyIcon from '../image/sunny.png';
import defaultIcon from '../image/moon.png';
import dayBackground from '../image/day.jpg'; 
import nightBackground from '../image/night.jpg'; 

function isNightOrDay(timezone) {
    const now = new Date();
    const timezoneOffsetMilliseconds = timezone * 1000;
    const adjustedTime = new Date(now.getTime() + timezoneOffsetMilliseconds);
    const adjustedHour = adjustedTime.getHours();
    const nightThresholdStart = 19; // 7 PM (24-hour format)
    const nightThresholdEnd = 6;    // 6 AM (24-hour format)
    if (adjustedHour >= nightThresholdStart || adjustedHour < nightThresholdEnd) {
    return "night";
    } else {
    return "day";
    }
}

const weatherIcons = {
  Clouds: cloudyIcon,
  Rain: rainyIcon,
  Drizzle: rainyIcon,
  Thunderstorm: rainyIcon,
  Clear: sunnyIcon,
  // Add more weather conditions and their corresponding icons here
};

const Card = (props) => {
  if (!props.coord || !props.weather) {
    return <div className="container">Loading...</div>;
  }

  const weatherCondition = props.weather[0]?.main || "";
  const weatherIcon = weatherIcons[weatherCondition] || defaultIcon;

  const timezoneOffset = props.timezone || 0;
  const dayOrNight = isNightOrDay(timezoneOffset);

  const backgroundStyle = {
    backgroundImage: `url("${dayOrNight === "day" ? dayBackground : nightBackground}")`,
  };
  const fontColorStyle = {
    color: dayOrNight === "day" ? "black" : "white",
  };

  return (
    <div className="container" style={backgroundStyle}>
      <div className="cardContent" style={fontColorStyle}>
        {props.name}, {props.sys.country}
      </div>
      <div className="weatherIconContainer">
        <img src={weatherIcon} alt="Weather Icon" className="weatherIcon" />
      </div>
      <center className="temperature" style={fontColorStyle}>
        {(props.main.temp - 273.15).toFixed(1)}°C
      </center>
      <center style={fontColorStyle}>{props.weather[0]?.main}</center>
      <center style={fontColorStyle}>
        Feels Like {(props.main.feels_like - 273.15).toFixed(0)}°
      </center>

      <center className="infoContainer" style={fontColorStyle}>
        <div className="infoBlock">
          <div>Humidity</div>
          {props.main.humidity}
        </div>
        <div className="infoBlock">
          <div>Wind</div>
          {props.wind.speed} Km/h
        </div>
        <div className="infoBlock">
          <div>Pressure</div>
          {props.main.pressure} mb
        </div>
        <div className="infoBlock">
          <div>Visibility</div>
          {props.visibility}
        </div>
      </center>
    </div>
  );
};

export default Card;