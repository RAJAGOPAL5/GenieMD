import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareCircleComponent } from './care-circle.component';

describe('CareCircleComponent', () => {
  let component: CareCircleComponent;
  let fixture: ComponentFixture<CareCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
