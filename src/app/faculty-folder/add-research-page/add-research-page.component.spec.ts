import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResearchPageComponent } from './add-research-page.component';

describe('AddResearchPageComponent', () => {
  let component: AddResearchPageComponent;
  let fixture: ComponentFixture<AddResearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResearchPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
