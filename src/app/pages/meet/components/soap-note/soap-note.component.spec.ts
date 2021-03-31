import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoapNoteComponent } from './soap-note.component';

describe('SoapNoteComponent', () => {
  let component: SoapNoteComponent;
  let fixture: ComponentFixture<SoapNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoapNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoapNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
