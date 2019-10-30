import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCityDialogComponent } from './choose-city-dialog.component';

describe('ChooseCityDialogComponent', () => {
  let component: ChooseCityDialogComponent;
  let fixture: ComponentFixture<ChooseCityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
