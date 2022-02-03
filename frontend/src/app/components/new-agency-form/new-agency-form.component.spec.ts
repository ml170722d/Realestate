import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAgencyFormComponent } from './new-agency-form.component';

describe('NewAgencyFormComponent', () => {
  let component: NewAgencyFormComponent;
  let fixture: ComponentFixture<NewAgencyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAgencyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAgencyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
