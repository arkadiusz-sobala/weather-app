import { Component, OnInit, Input, AfterViewInit, Inject } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { WeatherService } from '../../services/weather.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DAYS_OF_THE_WEEK } from '../../constants/constants';

@Component({
  selector: 'forecast-dialog',
  templateUrl: './forecast-dialog.component.html',
  styleUrls: ['./forecast-dialog.component.css']
})
export class ForecastDialogComponent implements OnInit, AfterViewInit {
  forecastData: any
  sortedData: any[];
  degrees: string = '°C'
  constructor(
    public loader: NgxUiLoaderService,
    public weatherService: WeatherService,
    public dialogRef: MatDialogRef<ForecastDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  async ngOnInit() { }

  async ngAfterViewInit() {
    setTimeout(async () => {
      this.startLoader()
      await this.getForecastInfo()
      this.stopLoader()
    }, 0);


  }

  async getForecastInfo() {
    try {
      this.forecastData = await this.weatherService.getForecastWeather(this.data.cityName)      
      let processedData = this.changeDates(this.forecastData.list);
      let sortedObject = this.sortByDates(processedData)    
      this.sortedData = this.parseObjectToArray(sortedObject)   
    } catch (error) { }
  }

  changeDates(data) {
    for (let object of data){    
      object.date = new Date(object.dt_txt.substring(0,10))}
    return data
  }

  sortByDates(data) {
    let date = new Date(new Date().setHours(23, 59, 59))
    let currentKey
    let object = {}
    for (let record of data) {
      if (new Date(record.date) > date) {        
        if (currentKey != record.dt_txt.substring(0,10)) currentKey = record.dt_txt.substring(0,10)
        if (!object[currentKey]) object[currentKey] = []
        object[currentKey].push(record)
      }
    }
    return object
  }

  parseObjectToArray(object) {
    let array = []
    for (let key in object) 
      array.push({date: key, data: this.simplifyData(object[key], key)})
    return array
  }

  simplifyData(array, date) {
    let simplifiedData: any = {
      minTemp: 350,
      maxTemp: 0,
      icon: []
    }
    for(let element of array) {
      if (element.main.temp_min < simplifiedData.minTemp) simplifiedData.minTemp = element.main.temp_min
      if (element.main.temp_max > simplifiedData.maxTemp) simplifiedData.maxTemp = element.main.temp_max
      simplifiedData.icon.push(element.weather[0].icon)
    }
    simplifiedData = this.getProperValues(simplifiedData, date)
    return simplifiedData    
  }

  getProperValues(simplifiedData, date) {
    simplifiedData.icon = this.getMostFrequentIcon(simplifiedData.icon)
    simplifiedData.minTemp = this.prepareTemps(this.getCelsiusTemp(simplifiedData.minTemp))
    simplifiedData.maxTemp = this.prepareTemps(this.getCelsiusTemp(simplifiedData.maxTemp))
    simplifiedData.day = DAYS_OF_THE_WEEK[new Date(date).getDay()]
    return simplifiedData
  }

  getMostFrequentIcon(icons) {
    let iconsCount = {}
    for (let icon of icons) {
      if (!(icon in iconsCount)) iconsCount[icon] = 1
      else iconsCount[icon]++
    }
    let mostOccurencesIcon = {count: 0, icon: '04n'}
    for (let icon in iconsCount)
      if (iconsCount[icon] > mostOccurencesIcon.count) {
        mostOccurencesIcon.count = iconsCount[icon]
        mostOccurencesIcon.icon = icon
      }   
    if (mostOccurencesIcon.icon.includes('n'))       
      mostOccurencesIcon.icon = mostOccurencesIcon.icon.replace('n', 'd')    
    return mostOccurencesIcon.icon
  }

  prepareTemps(celsiusTemp) {
    let fahrenheitTemp = Math.round((celsiusTemp * 9 / 5 + 32) /0.5) * 0.5
    return {
      '°C': celsiusTemp,
      '°F': fahrenheitTemp
    }
  }

  getCelsiusTemp(kelvinTemp) {
    return Math.round((kelvinTemp - 273) / 0.5) * 0.5
  }

  getImageSource(icon) {
    return `../../../assets/icons/${icon}.png`
  }

  changeTemperature() {
    if (this.degrees == "°C") this.degrees = "°F"
    else this.degrees = "°C"
  }

  getClassBasedOnScreenWidth() {
    if (window.innerWidth < 700) return 'table-caption' 
    return "flex"
  }

  startLoader() {
    let loader = this.loader.getLoader()
    this.loader.startLoader(loader.loaderId)
  }

  stopLoader() {
    let loader = this.loader.getLoader()
    this.loader.stopLoader(loader.loaderId)
  }

  close() {
    this.dialogRef.close();
  }
}
