import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherInfoComponent } from './current-weather-info.component';

describe('CurrentWeatherInfoComponent', () => {
  let component: CurrentWeatherInfoComponent;
  let fixture: ComponentFixture<CurrentWeatherInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentWeatherInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
