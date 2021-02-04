import React from 'react';
import './App.css';
import "weather-icons/css/weather-icons.css";
import Weather from "./app_component/weather.component";
import Form from './app_component/form.component';
import "bootstrap/dist/css/bootstrap.min.css";


//api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
const API_key='4775a296cba45773f12c93fb3b017c3f'

class App extends React.Component {
  constructor(){
    super();
    this.state={
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm:"we-thunderstorm",
      Drizzle:"wi-sweet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      clear:"wi-day-sunny",
      clouds:"wi-day-fog"
    };

  }


  calCelsius(temp){
    let cell = Math.floor(temp - 273.15);
    return cell;
    }

    get_WeatherIcon(icons, rangeid){
      switch (true) {
        case rangeid => 200 && rangeid <=232:
          this.setState({icon:this.weatherIcon.Thunderstorm})
        break;
        case rangeid => 300 && rangeid <=321:
          this.setState({icon:this.weatherIcon.Drizzle})
        break;
        case rangeid => 500 && rangeid <=531:
          this.setState({icon:this.weatherIcon.Rain})
        break;
        case rangeid => 600 && rangeid <=622:
          this.setState({icon:this.weatherIcon.Snow})
        break;
        case rangeid => 701 && rangeid <=781:
          this.setState({icon:this.weatherIcon.Atmosphere})
        break;
        case rangeid = 800:
          this.setState({icon:this.weatherIcon.Clear})
        break;
        case rangeid => 801 && rangeid <=804:
          this.setState({icon:this.weatherIcon.Clouds})
        break;
        default:
          this.setState({icon:this.weatherIcon.Clouds})

      }
    }

  getWeather= async(e)=> {

e.preventDefault();

 const city = e.target.elements.city.value;
 const country = e.target.elements.country.value;

    if(city&&country){
      const api_call= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}uk&appid=${API_key}`);
  
      const response = await api_call.json();
    
      console.log(response);
    
      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error:false
      });
    
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    
    } else (
      this.setState({error: true})
    )

  };

  render(){
    return(
      <div className="App">
      <Form loadweather={this.getWeather} error={this.state.error}/>
      <Weather 
        city={this.state.city} 
        country={this.state.country}
        temp_celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min} 
        description={this.state.description}
        weatherIcon={this.state.icon}
        />
      </div>  
     );
  }
}

export default App;
