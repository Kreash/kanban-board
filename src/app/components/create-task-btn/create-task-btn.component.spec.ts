import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskBtnComponent } from './create-task-btn.component';

describe('CreateTaskBtnComponent', () => {
  let component: CreateTaskBtnComponent;
  let fixture: ComponentFixture<CreateTaskBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaskBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
