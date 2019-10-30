import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'current-weather-info',
  templateUrl: './current-weather-info.component.html',
  styleUrls: ['./current-weather-info.component.css']
})
export class CurrentWeatherInfoComponent implements OnInit {
  @Input() currentTemp: number
  @Input() currentWind: number
  @Input() currentDescription: string
  @Input() currentWeatherIcon: string
  temps: { '°C': number; '°F': number; };
  degrees: any = {value: "°C", label: "°F"}
  constructor( ) { }

  ngOnInit() {
    this.prepareTemps()
  }

  prepareTemps(temp = this.currentTemp) {
    let fahrenheitTemp = Math.round((temp * 9 / 5 + 32) /0.5) * 0.5
    this.temps = {
      '°C': temp,
      '°F': fahrenheitTemp
    }
  }

  changeTemperature() {
    if (this.degrees.value == "°C") this.degrees = {value: "°F", label: "°C"}
    else this.degrees = {value: "°C", label: "°F"}
  }

  getIconPath() {
    return `../../assets/icons/${this.currentWeatherIcon}`
  }

}
