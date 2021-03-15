import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertAlertComponent } from './upsert-alert.component';

describe('UpsertAlertComponent', () => {
  let component: UpsertAlertComponent;
  let fixture: ComponentFixture<UpsertAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
