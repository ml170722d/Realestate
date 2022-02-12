import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBasicInfoComponent } from './post-basic-info.component';

describe('PostBasicInfoComponent', () => {
  let component: PostBasicInfoComponent;
  let fixture: ComponentFixture<PostBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostBasicInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
