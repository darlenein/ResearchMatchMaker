import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchListPageComponent } from './research-list-page.component';

describe('ResearchListPageComponent', () => {
  let component: ResearchListPageComponent;
  let fixture: ComponentFixture<ResearchListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
