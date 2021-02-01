import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TestDataService } from './test-data.service';

describe('TestDataService', () => {
  let service: TestDataService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestDataService],
    });

    service = TestBed.inject(TestDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should get questions list when calling getQuestions()', () => {
    const questions = [
      {
        id: 1,
        text: 'question 1',
        answers: [
          { id: 1, text: 'answer 1', score: 1 },
          { id: 2, text: 'answer 2', score: 2 },
        ],
      },
    ];

    service.getQuestions().subscribe((result) => {
      expect(result).toEqual(questions);
    });

    const req = httpMock.expectOne('assets/questions.json');
    expect(req.request.method).toEqual('GET');
    req.flush(questions);
    httpMock.verify();
  });
});
