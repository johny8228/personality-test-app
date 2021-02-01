import { TestBed } from '@angular/core/testing';
import { TestService } from '../test/test.service';
import { TestResultService } from './test-result.service';

let testService: TestService;
let testResultService: TestResultService;

describe('TestResultService', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers:[
          TestService,
          TestResultService
      ],
    })
    testService = TestBed.inject(TestService);
    testResultService = TestBed.inject(TestResultService);

    const userAnswer = {
        questionId: 1,
        answer:{
            id: 1,
            text: "answer 1",
            score: 5
        }
    };

    testService.addOrUpdateAnswer(userAnswer);
  });

  it('should create service', () => {
    expect(testResultService).toBeTruthy();
  });

  it('should be an introvert if score is less or equal to 10', () => {
    const userAnswer = {
        questionId: 2,
        answer:{
            id: 1,
            text: "answer 2",
            score: 5
        }
    };
    testService.addOrUpdateAnswer(userAnswer);
    expect(testResultService.isExtrovert()).toBeFalse();
  });

  it('should be an extrovert if score is greater than 10', () => {
    const userAnswer = {
        questionId: 2,
        answer:{
            id: 1,
            text: "answer 2",
            score: 6
        }
    };
    testService.addOrUpdateAnswer(userAnswer);
    expect(testResultService.isExtrovert()).toBeTrue();
  });
});
