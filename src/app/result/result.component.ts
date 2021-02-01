import { Component } from '@angular/core';
import { TestResultService } from './test-result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent{
  constructor(private _testResultService: TestResultService){
  }

  get isExtrovert(): boolean{
    return this._testResultService.isExtrovert();
  }
}
