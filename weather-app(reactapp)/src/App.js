import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import{get} from "./axios"
import './App.css'

function App() {
  const [cityData, setCityData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const getData = async (city) => {
    await get(`${'/weather'}/${city}`).then((response) => {
      setCityData(response);
    }).catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    getData('Coimbatore');
  }, []);
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    getData(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="box-container">
      <div className="box-header">
        <h1 style={{ textAlign: 'center' }}>
          Weather Application
        </h1>
        <div className="topright">
          <input
            className="box-input"
            type="search"
            placeholder="Enter City Name..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <button className="box-searchButton" onClick={handleSearchClick}>🔍</button>
        </div>
      </div>

      <div className="box-cardContainer">
        <Card {...cityData} />
      </div>
    </div>
  );
}

export default App;