import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendAssessmentComponent } from './send-assessment.component';

describe('SendAssessmentComponent', () => {
  let component: SendAssessmentComponent;
  let fixture: ComponentFixture<SendAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
