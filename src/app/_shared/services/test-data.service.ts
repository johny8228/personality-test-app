import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { QuestionModel } from "../models/question.model";

@Injectable()
export class TestDataService{
    private _endpoint: string = "assets/questions.json";

    constructor(private _httpClient : HttpClient){
    }

    getQuestions(): Observable<QuestionModel[]>{
        return this._httpClient.get<QuestionModel[]>(this._endpoint);
    }
}