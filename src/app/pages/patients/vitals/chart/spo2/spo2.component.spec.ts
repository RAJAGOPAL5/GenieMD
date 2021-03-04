import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spo2Component } from './spo2.component';

describe('Spo2Component', () => {
  let component: Spo2Component;
  let fixture: ComponentFixture<Spo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Spo2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Spo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
