import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from "@angular/material/radio";
import { AnswerModel, QuestionModel } from '../_shared/models';
import { TestDataService } from '../_shared/services';
import { TestService } from './test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  questions: QuestionModel[];
  questionIndex: number;

  constructor(private _testDataService: TestDataService,
    private _testService: TestService
  ) {}

  ngOnInit() {
    this._testService.reset();
    this._testDataService.getQuestions().subscribe((result) => {
      this.questions = result;
      this.questionIndex = result && result.length > 0 ? 0 : -1;
    });
  }

  get userAnswer(): AnswerModel {
    return this._testService.getQuestionAnswer(
      this.currentQuestion?.id
    )?.answer;
  }

  get currentQuestion(): QuestionModel{
    return this.questions[this.questionIndex];
  }

  onAnswerChange(event: MatRadioChange) {
    const userAnswer = {
      questionId: this.currentQuestion.id,
      answer: event.value,
    };
    this._testService.addOrUpdateAnswer(userAnswer);
  }
}