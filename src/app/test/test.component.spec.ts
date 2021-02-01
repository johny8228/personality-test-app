import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from "../app-routes";
import { Location } from "@angular/common";
import { TestComponent } from './test.component';
import { TestService } from './test.service';
import { TestDataService } from '../_shared/services';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';

const mockQuestions = [
  {
    id: 1,
    text: 'question 1',
    answers: [
      { id: 1, text: 'answer 1', score: 1 },
      { id: 2, text: 'answer 2', score: 2 },
    ],
  },{
    id: 2,
    text: 'question 2',
    answers: [
      { id: 3, text: 'answer 3', score: 1 },
      { id: 4, text: 'answer 4', score: 2 },
    ],
  },
];

describe('TestComponent', () => {
  let testDataService: TestDataService;
  let location: Location;
  let fixture;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
        MatRadioModule
      ],
      providers:[
          TestDataService,
          TestService
      ],
      declarations: [
        TestComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    testDataService = TestBed.inject(TestDataService);
    location = TestBed.inject(Location);
  });

  it('should create test component', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty screen if no questions', async() => {
    spyOn(testDataService, "getQuestions").and.returnValue(of(null));
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector(".question-container");
    await fixture.whenStable();
    expect(container).toBeFalsy();
  });

  it('should display first question', async() => {
    spyOn(testDataService, "getQuestions").and.returnValue(of(mockQuestions));
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    await fixture.whenStable();
    const container = compiled.querySelector(".question-container");
    expect(container).toBeTruthy();
    const progressTitle = compiled.querySelector('.progress .details .title');
    expect(progressTitle.textContent).toContain('Question 1 of 2');
    const progressPercentage = compiled.querySelector('.progress .details .percentage');
    expect(progressPercentage.textContent).toContain('50%');
    const questionText = compiled.querySelector('.question .text');
    expect(questionText.textContent).toContain('question 1');
    const answersElements = compiled.querySelectorAll('.answer');
    expect(Array.from(answersElements).length).toBe(2);
    const previousBtn = compiled.querySelector('.previous');
    expect(previousBtn).toBeFalsy();
    const nextBtn = compiled.querySelector('.next');
    expect(nextBtn).toBeTruthy();
    const finishBtn = compiled.querySelector('.previous');
    expect(finishBtn).toBeFalsy();
  });

  it('should go to next question when clicking next', async() => {
    spyOn(testDataService, "getQuestions").and.returnValue(of(mockQuestions));
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    await fixture.whenStable();
    const nextBtn = compiled.querySelector('.next');
    nextBtn.click();

    fixture.detectChanges();

    const progressTitle = compiled.querySelector('.progress .details .title');
    expect(progressTitle.textContent).toContain('Question 2 of 2');
    const progressPercentage = compiled.querySelector('.progress .details .percentage');
    expect(progressPercentage.textContent).toContain('100%');
    const questionText = compiled.querySelector('.question .text');
    expect(questionText.textContent).toContain('question 2');
  });

  it('should display only finish and previous button on last question', async() => {
    spyOn(testDataService, "getQuestions").and.returnValue(of(mockQuestions));
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    await fixture.whenStable();

    const nextBtn = compiled.querySelector('.next');
    nextBtn.click();
    fixture.detectChanges();

    const previousBtn = compiled.querySelector('.previous');
    expect(previousBtn).toBeTruthy();
    const nextBtnLastQuestion = compiled.querySelector('.next');
    expect(nextBtnLastQuestion).toBeFalsy();
    const finishBtn = compiled.querySelector('.previous');
    expect(finishBtn).toBeTruthy();
  });

  it('should go to previous question', async() => {
    spyOn(testDataService, "getQuestions").and.returnValue(of(mockQuestions));
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    await fixture.whenStable();

    const nextBtn = compiled.querySelector('.next');
    nextBtn.click();
    fixture.detectChanges();

    const previousBtn = compiled.querySelector('.previous');
    previousBtn.click();
    fixture.detectChanges();

    const progressTitle = compiled.querySelector('.progress .details .title');
    expect(progressTitle.textContent).toContain('Question 1 of 2');
    const progressPercentage = compiled.querySelector('.progress .details .percentage');
    expect(progressPercentage.textContent).toContain('50%');
    const questionText = compiled.querySelector('.question .text');
    expect(questionText.textContent).toContain('question 1');
  });

  it('should add to score when user selects an answer', async() => {
    const testService = TestBed.inject(TestService);

    spyOn(testDataService, "getQuestions").and.returnValue(of(mockQuestions));
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    await fixture.whenStable();

    const firstAnswerElement = compiled.querySelector('.mat-radio-container');
    firstAnswerElement.click();
    fixture.detectChanges();

    expect(testService.getScore()).toBe(1);
  });

  it('should go to result screen', async() => {
    spyOn(testDataService, "getQuestions").and.returnValue(of(mockQuestions));
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    await fixture.whenStable();

    const nextBtn = compiled.querySelector('.next');
    nextBtn.click();
    fixture.detectChanges();

    const previousBtn = compiled.querySelector('.finish');
    previousBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(location.path()).toBe("/result");
  });
});
