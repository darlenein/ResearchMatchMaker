import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerNoButtonsComponent } from './banner-no-buttons.component';

describe('BannerNoButtonsComponent', () => {
  let component: BannerNoButtonsComponent;
  let fixture: ComponentFixture<BannerNoButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerNoButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerNoButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
