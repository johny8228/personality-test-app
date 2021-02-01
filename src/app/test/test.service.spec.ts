import { TestBed } from '@angular/core/testing';
import { TestService } from './test.service';

let testService: TestService;

describe('TestService', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers:[
          TestService
      ],
    })
    testService = TestBed.inject(TestService);
  });

  it('should create service', () => {
    expect(testService).toBeTruthy();
  });

  it('should add a question answer with a score of 2', () => {
    const userAnswer = {
        questionId: 1,
        answer:{
            id: 1,
            text: "answer 1",
            score: 2
        }
    };

    testService.addOrUpdateAnswer(userAnswer);
    expect(testService.getQuestionAnswer(1)).toBeTruthy();
    expect(testService.getScore()).toBe(2);
  });

  it('should update question answer with a score of 4', () => {
    const userAnswer = {
        questionId: 1,
        answer:{
            id: 1,
            text: "answer 1",
            score: 1
        }
    };

    testService.addOrUpdateAnswer(userAnswer);
    expect(testService.getQuestionAnswer(1)).toBeTruthy();
    expect(testService.getScore()).toBe(1);

    userAnswer.answer.score = 4;
    testService.addOrUpdateAnswer(userAnswer);

    expect(testService.getQuestionAnswer(1)).toBeTruthy();
    expect(testService.getScore()).toBe(4);
  });

  it('should have a total score of 5', () => {
    const userAnswer1 = {
        questionId: 1,
        answer:{
            id: 1,
            text: "answer 1",
            score: 1
        }
    };

    const userAnswer2 = {
        questionId: 2,
        answer:{
            id: 1,
            text: "answer 1",
            score: 4
        }
    };

    testService.addOrUpdateAnswer(userAnswer1);
    testService.addOrUpdateAnswer(userAnswer2);
    expect(testService.getScore()).toBe(5);
  });

  it('should have no answer for id 1000', () => {
    expect(testService.getQuestionAnswer(1000)).toBeFalsy();
  });

  it('should have a score of 0', () => {
    expect(testService.getScore()).toBe(0);
  });

  it('should reset test', () => {
    const userAnswer = {
        questionId: 1,
        answer:{
            id: 1,
            text: "answer 1",
            score: 1
        }
    };

    testService.addOrUpdateAnswer(userAnswer);
    testService.reset();

    expect(testService.getQuestionAnswer(1)).toBeFalsy();
    expect(testService.getScore()).toBe(0);
  });
});
