import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSOPageComponent } from './sso-page.component';

describe('SSOPageComponent', () => {
  let component: SSOPageComponent;
  let fixture: ComponentFixture<SSOPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SSOPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SSOPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
