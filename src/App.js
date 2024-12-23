import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [countriesData, setCountriesData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchedLetter, setSearchedLetter] = useState("");
  const [error, setError] = useState(null);

  // console.log("countriesData", countriesData);
  // console.log("filterData", filterData);
  // console.log("searchedLetter", searchedLetter);
  
  // Fetching all data 
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountriesData(res.data);
        setFilterData(res.data);
      })
      .catch((error) => {
        setError(error);
        console.error("Error while fetching countries", error); 
      });
  }, []);

  // filtering Search Country
  useEffect(()=>{
    if(!searchedLetter){
      setFilterData(countriesData);
      return;
    }
    const filteredCountry = countriesData.filter((country) => country.name.common.toLowerCase().includes(searchedLetter.toLowerCase()));
    setFilterData(filteredCountry);
  }, [countriesData, searchedLetter]);


  return (
    <div className="App">

      <div className="searchBar">
        <input type="text" value={searchedLetter} className="search_input" onChange={(e)=>setSearchedLetter(e.target.value)} placeholder="Search for country" />
      </div>


      {error !== null ? (
        error && <div className="error">Error: {error.message}</div>
      ) : (
        <div className="countries_container">
        {filterData.map((country)=> 
          <div className={`countryCard${country.name.common.toLowerCase() === searchedLetter.toLowerCase() ? " centered" : ""}`} key={country.name.common}>
            <img src={country.flags.png} alt={country.name.common} className="country_flag"/>
            <div className="country_name">{country.name.common}</div>
          </div>
        )}
      </div>
      )}
     
      

     
      {/* {filterData.length === 0 && !error ? (
        <div className="noData">No Country found. Try another Search!</div>
      ) : error ? (
        error && <div className="error">Error: {error.message}</div>
      ) : (
        <div className="contries_container">
        {filterData.map((country)=> 
          <div className={`countryCard${country.name.common.toLowerCase() === searchedLetter.toLowerCase() ? "centered" : ""}`} key={country.name.common}>
            <img src={country.flags.png} alt={country.name.common} className="country_flag"/>
            <div className="country_name">{country.name.common}</div>
          </div>
        )}
      </div>
      )} */}

     

    </div>
  );
}

export default App;
