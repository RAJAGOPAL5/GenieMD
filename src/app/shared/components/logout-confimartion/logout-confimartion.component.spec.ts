import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutConfimartionComponent } from './logout-confimartion.component';

describe('LogoutConfimartionComponent', () => {
  let component: LogoutConfimartionComponent;
  let fixture: ComponentFixture<LogoutConfimartionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutConfimartionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutConfimartionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
