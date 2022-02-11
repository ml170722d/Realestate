import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListOwnerComponent } from './post-list-owner.component';

describe('PostListOwnerComponent', () => {
  let component: PostListOwnerComponent;
  let fixture: ComponentFixture<PostListOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
