
import {useState} from "react";
import axios from "axios";

function App() {
  const weather_key = "" //Add your openweathermap API key here
  const[data, setData] = useState({})
  const[location, setLocation] = useState("")
  const[playlist, setPlaylist] = useState("https://open.spotify.com/embed/playlist/37i9dQZF1EIhkGftn1D0Mh?utm_source=generator")
  const spotify_playlist = {
    600: 'https://open.spotify.com/embed/playlist/37i9dQZF1EIh3V0E1LJL3p?utm_source=generator',//rain
    700: 'https://open.spotify.com/embed/playlist/37i9dQZF1EIgy8enUfNX0u?utm_source=generator', //snow
    800: 'https://open.spotify.com/embed/playlist/37i9dQZF1EIgxHuuVqSn9D?utm_source=generator',// >800 clouds
    1000: 'https://open.spotify.com/embed/playlist/37i9dQZF1EIhkGftn1D0Mh?utm_source=generator' //mix
  }

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      const geo_url = `http://api.openweathermap.org/geo/1.0/direct?q=${location},&appid=${weather_key}`
  
      axios.get(geo_url).then((response) =>{
        const{lat, lon} = response.data[0]

      const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_key}`
  
      axios.get(weather_url).then((Response) => {
        setData(Response.data)
        if (Response.data.weather[0].id < 600){
          setPlaylist(spotify_playlist[600])
        }
        else if (Response.data.weather[0].id < 700){
          setPlaylist(spotify_playlist[700])
        }
        else if (Response.data.weather[0].id > 800){
          setPlaylist(spotify_playlist[800])
        }
        else{
          setPlaylist(spotify_playlist[1000])
        }
        // console.log(Response.data)
      })
    })
    setLocation('')
    }
  }
  
  return (
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder="Enter Location"
        type="text"/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <img src = {`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon"/> : null}
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="music">
          <p> A random playlist for today's mood?</p>
          <iframe title="spotify-embed" className="spotify-embed"
          data-testid="embed-iframe" 
          src={`${playlist}`}
          frameBorder="0" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"></iframe>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p>{data.main.feels_like}</p> : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p>{data.wind.speed} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
