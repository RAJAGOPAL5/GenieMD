import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareTeamComponent } from './care-team.component';

describe('CareTeamComponent', () => {
  let component: CareTeamComponent;
  let fixture: ComponentFixture<CareTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
