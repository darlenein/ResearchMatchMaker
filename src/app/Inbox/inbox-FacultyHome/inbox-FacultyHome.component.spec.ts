import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxHomeComponent } from './inbox-FacultyHome.component';

describe('InboxHomeComponent', () => {
  let component: InboxHomeComponent;
  let fixture: ComponentFixture<InboxHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboxHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
