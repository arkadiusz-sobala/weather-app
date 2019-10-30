import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChooseCityDialogComponent } from '../dialogs/choose-city-dialog/choose-city-dialog.component';

@Component({
  selector: 'city-info',
  templateUrl: './city-info.component.html',
  styleUrls: ['./city-info.component.css']
})
export class CityInfoComponent implements OnInit {
  @Input() currentCity: string

  @Output() cityChange = new EventEmitter
  @Output() backToCurrentPosition = new EventEmitter

  constructor(
    public dialogService: MatDialog
  ) { }

  ngOnInit() {
  }

  openChangeLocationModal() {
    this.dialogService.open(ChooseCityDialogComponent, {
      width: '300px'
    }).afterClosed().toPromise().then(res => {      
      if (res && res.currentLocation) this.backToCurrentPosition.emit()
      else if (res) this.cityChange.emit({cityName: res})
      
    })
  }
}
