import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchInfoPageComponent } from './match-info-page.component';

describe('MatchInfoPageComponent', () => {
  let component: MatchInfoPageComponent;
  let fixture: ComponentFixture<MatchInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchInfoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
