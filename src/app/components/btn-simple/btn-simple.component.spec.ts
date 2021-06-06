import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSimpleComponent } from './btn-simple.component';

describe('BtnSimpleComponent', () => {
  let component: BtnSimpleComponent;
  let fixture: ComponentFixture<BtnSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
