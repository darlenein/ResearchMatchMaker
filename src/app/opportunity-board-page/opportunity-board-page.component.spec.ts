import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopMenuBarComponent } from '../student-top-menu-bar/student-top-menu-bar.component';

import { OpportunityBoardPageComponent } from './opportunity-board-page.component';

describe('OpportunityBoardPageComponent', () => {
  let component: OpportunityBoardPageComponent;
  let fixture: ComponentFixture<OpportunityBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityBoardPageComponent, TopMenuBarComponent ],
      imports: [
        HttpClientModule,
        MatToolbarModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule
      ]
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
