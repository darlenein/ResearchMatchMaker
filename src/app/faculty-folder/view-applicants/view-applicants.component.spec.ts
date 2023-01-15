import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NEVER, never, Observable, observable, of } from 'rxjs';
import { TopMenuBarComponent } from 'src/app/student-folder/student-top-menu-bar/student-top-menu-bar.component';
import { ViewApplicantsComponent } from './view-applicants.component';
import { MatStepperHarness, MatStepperNextHarness } from '@angular/material/stepper/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('ViewApplicantsComponent', () => {
  let component: ViewApplicantsComponent;
  let fixture: ComponentFixture<ViewApplicantsComponent>;
  let loader : any

  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ ViewApplicantsComponent, TopMenuBarComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: {
              research_id : 1
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApplicantsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('move steppers', async () => {
    const stepper = await loader.getHarness(MatStepperHarness);
    expect(component).toBeTruthy();
  });

});
