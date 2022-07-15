import { useState } from "react";

// import fetch from "node-fetch";
const api = {
  key: "ed01cc4f6c5d484c202e706f2269f0b6",
  base: "http://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});



  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log('result: ', result);
        });
    }
  }


  const dataBuilder = (d) => {



    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    /**
     * biến day lấy ra thứ trong tuần
     * tham số d lấy về từ hàm Date(), d.getDay() trả về number từ 0 đến 6 ứng với sun--> saturday
     * days[number] --> trả về giá trị trong mảng
     */
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();


    return ` ${day} ${date} ${month} ${year} `;

  }

  return (
    <div className={typeof weather.main !== 'undefined' ?
      (weather.main.temp > 25 ? 'app warm' : 'app')
      : 'app'


    }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(event) => {
              // console.log("ok");
              setQuery(event.target.value)
            }}
            value={query}
            onKeyPress={(event) => {
              search(event)
            }}
          />


        </div>
        {(typeof weather.main !== 'undefined') ? <>
          <div className="location-box">
            <div className="location">{weather.name},  {weather.sys.country} </div>
            <div className="date"> {dataBuilder(new Date())} </div>
          </div>
          <div className="weather-box" >
            <div className="temp" >
              {Math.round(weather.main.temp)}*c
            </div>
            <div className="weather" >
              {weather.weather[0].main}
            </div>
          </div>
        </>
          :
          ('')
        }






      </main>
    </div>
  );
}

export default App;
