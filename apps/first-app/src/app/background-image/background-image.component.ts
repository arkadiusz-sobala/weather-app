import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'weather-background-image',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.css']
})
export class BackgroundImageComponent implements OnInit {
  @Input() imageName: string = "placeholder.jpg"
  assetsPath = '../../assets/weather/'
  altImage = '../../assets/weather/placeholder.jpg'
  constructor() { }

  ngOnInit() {
  }

  getImagePath() {
    if (!this.imageName) this.imageName = 'placeholder.jpg'
    return `${this.assetsPath}${this.imageName}`
  }

}
