import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePostDataComponent } from './change-post-data.component';

describe('ChangePostDataComponent', () => {
  let component: ChangePostDataComponent;
  let fixture: ComponentFixture<ChangePostDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePostDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePostDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
