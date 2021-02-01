import { Injectable } from '@angular/core';
import { TestService } from '../test/test.service';

@Injectable()
export class TestResultService {
  private readonly EXTROVERT_MIN_SCORE: number = 11;

  constructor(private _testService: TestService) {}

  isExtrovert(): boolean {
    return this._testService.getScore() >= this.EXTROVERT_MIN_SCORE;
  }
}
