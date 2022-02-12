import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBasicInfoComponent } from './location-basic-info.component';

describe('LocationBasicInfoComponent', () => {
  let component: LocationBasicInfoComponent;
  let fixture: ComponentFixture<LocationBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
