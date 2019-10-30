import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from "@angular/http"
import { WeatherService } from './services/weather.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LocationService } from './services/location.service';
import { BackgroundImageComponent } from './background-image/background-image.component';
import { CurrentWeatherInfoComponent } from './current-weather-info/current-weather-info.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { CityInfoComponent } from './city-info/city-info.component';
import { ForecastButtonComponent } from './forecast-button/forecast-button.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChooseCityDialogComponent } from './dialogs/choose-city-dialog/choose-city-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ForecastDialogComponent } from './dialogs/forecast-dialog/forecast-dialog.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    HttpModule,
    NgxUiLoaderModule,
    MatGridListModule,
    MatCardModule,
    MatRippleModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
    
  ],
  declarations: [AppComponent, BackgroundImageComponent, CurrentWeatherInfoComponent, CityInfoComponent, ForecastButtonComponent, ChooseCityDialogComponent, ForecastDialogComponent],
  bootstrap: [AppComponent],
  providers: [WeatherService, LocationService],
  entryComponents: [ChooseCityDialogComponent, ForecastDialogComponent]
})
export class AppModule { }
