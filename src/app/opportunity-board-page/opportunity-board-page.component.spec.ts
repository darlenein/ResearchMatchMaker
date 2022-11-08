import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityBoardPageComponent } from './opportunity-board-page.component';

describe('OpportunityBoardPageComponent', () => {
  let component: OpportunityBoardPageComponent;
  let fixture: ComponentFixture<OpportunityBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityBoardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunityBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
