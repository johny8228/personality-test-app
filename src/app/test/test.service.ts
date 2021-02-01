import { Injectable } from '@angular/core';
import { UserAnswer } from './user-answer';

@Injectable()
export class TestService {
  private answers: UserAnswer[] = [];

  reset(){
    this.answers = [];
  }

  addOrUpdateAnswer(newAnswer: UserAnswer) {
    const answer = this.answers.find(
      (a) => a.questionId === newAnswer.questionId
    );
    if (answer) {
      answer.answer = newAnswer.answer;
    } else {
      this.answers.push(newAnswer);
    }
  }

  getQuestionAnswer(questionId: number): UserAnswer{
    return this.answers.find((item)=> item.questionId === questionId);
  }

  getScore(): number {
    return this.answers
      .map((item) => item?.answer?.score)
      .reduce((a, b) => a + b, 0);
  }
}
