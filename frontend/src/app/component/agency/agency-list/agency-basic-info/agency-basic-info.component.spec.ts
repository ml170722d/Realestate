import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyBasicInfoComponent } from './agency-basic-info.component';

describe('AgencyBasicInfoComponent', () => {
  let component: AgencyBasicInfoComponent;
  let fixture: ComponentFixture<AgencyBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
