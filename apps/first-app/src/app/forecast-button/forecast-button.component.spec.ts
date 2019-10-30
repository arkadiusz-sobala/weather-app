import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastButtonComponent } from './forecast-button.component';

describe('ForecastButtonComponent', () => {
  let component: ForecastButtonComponent;
  let fixture: ComponentFixture<ForecastButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
