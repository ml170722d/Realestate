import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavBtnComponent } from './fav-btn.component';

describe('FavBtnComponent', () => {
  let component: FavBtnComponent;
  let fixture: ComponentFixture<FavBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
