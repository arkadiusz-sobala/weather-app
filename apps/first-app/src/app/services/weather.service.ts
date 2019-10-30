import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

export interface CurrentLocation {
  cityName?: string;
  lat?: number;
  lon?: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = '1d0b001f9db19ce009d6a978f0b620c7'
  currentWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather?'
  forecastWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?'
  constructor(
    public http: Http
  ) { }

  getCurrentWeather(locationObject: CurrentLocation) {
    return new Promise<any>((resolve, reject) => {
      let weatherLink = this.currentWeatherEndpoint
      if (locationObject && locationObject.cityName) weatherLink += `q=${locationObject.cityName}`
      else if (locationObject && locationObject.lon && locationObject.lat) weatherLink += `lat=${locationObject.lat}&lon=${locationObject.lon}`
      else {
        throw('')
      }  
      this.http.get(`${weatherLink}&APPID=${this.apiKey}`).toPromise().then(data => {
        if (data) resolve(data.json())
        else reject()
      }, error => {
        reject(error.json())
      })
    })
  }

  getForecastWeather(cityName: string) {    
    return new Promise<any>((resolve, reject) => {
      let weatherLink = this.forecastWeatherEndpoint
      if (cityName) weatherLink += `q=${cityName}`
      else {
        throw('')
      }  
      this.http.get(`${weatherLink}&APPID=${this.apiKey}`).toPromise().then(data => {
        if (data) resolve(data.json())
        else reject()
      }, error => {
        reject(error.json())
      })      
    })
  }
}
