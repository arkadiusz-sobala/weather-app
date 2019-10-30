import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForecastDialogComponent } from '../dialogs/forecast-dialog/forecast-dialog.component';

@Component({
  selector: 'forecast-button',
  templateUrl: './forecast-button.component.html',
  styleUrls: ['./forecast-button.component.css']
})
export class ForecastButtonComponent implements OnInit {
  @Input() label: string = ""
  @Input() currentCity: string

  constructor(
    public dialogService: MatDialog
  ) { }

  ngOnInit() {
  }

  openForecastDialog() {    
      this.dialogService.open(ForecastDialogComponent, {
        width: '700px',
        data: {cityName: this.currentCity}
      })          
  }
}
