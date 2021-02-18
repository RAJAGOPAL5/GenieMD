import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertPatientComponent } from './upsert-patient.component';

describe('UpsertPatientComponent', () => {
  let component: UpsertPatientComponent;
  let fixture: ComponentFixture<UpsertPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
