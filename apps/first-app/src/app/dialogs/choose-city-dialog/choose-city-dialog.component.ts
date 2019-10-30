import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'choose-city-dialog',
  templateUrl: './choose-city-dialog.component.html',
  styleUrls: ['./choose-city-dialog.component.css']
})
export class ChooseCityDialogComponent implements OnInit {
  city: string
  current: {} = {currentLocation: true}
  constructor(
    public dialogRef: MatDialogRef<ChooseCityDialogComponent>
  ) { }

  ngOnInit() {
  }

  close(city?) {
    this.dialogRef.close(city);
  }

}
