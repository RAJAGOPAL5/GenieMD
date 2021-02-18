import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicPromptComponent } from './clinic-prompt.component';

describe('ClinicPromptComponent', () => {
  let component: ClinicPromptComponent;
  let fixture: ComponentFixture<ClinicPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
