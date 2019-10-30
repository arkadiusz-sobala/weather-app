import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LOADER_CONFIGURATION } from './constants/loader-configuration';
import { LocationService } from './services/location.service';
import { IMAGES_MAP } from './constants/images-map';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import { CurrentWeatherInfoComponent } from './current-weather-info/current-weather-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('currentWeatherInfoComponent', {static: false}) currentWeatherInfoComponent : CurrentWeatherInfoComponent
  loaderConfig = LOADER_CONFIGURATION
  currentPosition: any;
  backgroundImageName: string
  currentWeather: {};
  currentTemp: number;
  currentWind: number;
  currentDescription: string;
  currentCity: string = "No location chosen"
  currentWeatherIcon: string;
  chooseCityButtonLabel: string = "see forecast"

  constructor(
    public weatherService: WeatherService,
    public locationService: LocationService,
    public loader: NgxUiLoaderService,
    public snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    await this.getCurrentPositionAndWeather()   
  }

  // testBackgroundsAndIconsFunction() {
  //   setTimeout(() => {
  //     let time = 3000
  //     let i = 1
  //     for (let icon in IMAGES_MAP) {
  //       setTimeout(() => {
  //         this.backgroundImageName = this.getBackgroundImage(icon)                      
  //       }, time * i);
  //       i++
  //     }
  //   }, 1000);
  // }

  async getCurrentPositionAndWeather() {
    await this.getPosition()
    this.getCurrentWeather()
  }

  async getPosition() {
    try {
      this.currentPosition = await this.locationService.getPosition()
    } catch (error) { 
      this.handleError({message: 'no geolocation'})
    }
  }

  async getCurrentWeather(position = this.currentPosition) {
    this.startLoader()
    try {
      let result = await this.weatherService.getCurrentWeather(position)
      this.extractImportantWeatherData(result)
    } catch (error) {
      this.handleError(error)
    }
    this.stopLoader()
  }

  extractImportantWeatherData(result) {
    this.currentTemp = this.getCelsiusTemp(result.main.temp)
    if (this.currentWeatherInfoComponent) this.currentWeatherInfoComponent.prepareTemps(this.currentTemp)
    this.currentCity = result.name
    this.currentWind = this.getWindSpeed(result.wind.speed)
    this.currentDescription = result.weather[0].description
    this.backgroundImageName = this.getBackgroundImage(result.weather[0].icon)
  }

  getBackgroundImage(icon) {
    this.currentWeatherIcon = `${icon}.png`
    return IMAGES_MAP[icon] ? IMAGES_MAP[icon] : 'placeholder.jpg'
  }

  getCelsiusTemp(kelvinTemp) {
    return Math.round((kelvinTemp - 273) / 0.5) * 0.5
  }

  getWindSpeed(speed) {
    return Math.round(speed / 0.5) * 0.5
  }


  startLoader() {
    let loader = this.loader.getLoader()
    this.loader.startLoader(loader.loaderId)
  }

  stopLoader() {
    let loader = this.loader.getLoader()
    this.loader.stopLoader(loader.loaderId)
  }

  handleError(error) {
    if (!environment.production) console.log(error);    
    if (error && error.message == "city not found")
      this.snackBar.open('City not found', 'close', {duration: 5000})
    else if (error && error.message == "no geolocation")
      this.snackBar.open('Please enable geolocation', 'close', {duration: 5000})
    else if (error && error.message != "initial")
      this.snackBar.open('Something went wrong', 'close', {duration: 5000})
  }
}
