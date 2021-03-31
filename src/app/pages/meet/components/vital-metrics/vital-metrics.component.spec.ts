import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalMetricsComponent } from './vital-metrics.component';

describe('VitalMetricsComponent', () => {
  let component: VitalMetricsComponent;
  let fixture: ComponentFixture<VitalMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalMetricsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
