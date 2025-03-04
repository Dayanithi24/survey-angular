import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateSurveyComponent } from './generate-survey.component';

describe('GenerateSurveyComponent', () => {
  let component: GenerateSurveyComponent;
  let fixture: ComponentFixture<GenerateSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
