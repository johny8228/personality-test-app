import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from "../app-routes";
import { Location } from "@angular/common";
import { ResultComponent } from './result.component';
import { TestService } from '../test/test.service';
import { TestResultService } from './test-result.service';

describe('ResultComponent', () => {
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      providers:[
        TestService,
        TestResultService
      ],
      declarations: [
        ResultComponent
      ],
    }).compileComponents();

    location = TestBed.inject(Location);
  });

  it('should create result component', () => {
    const fixture = TestBed.createComponent(ResultComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render result component title', () => {
    const fixture = TestBed.createComponent(ResultComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('You are more of an introvert');
  });

  it('should render result component title for extrovert if score greater than 10', () => {
    const fixture = TestBed.createComponent(ResultComponent);
    const testService = TestBed.inject(TestService);

    const userAnswer = {
        questionId : 1,
        answer:{
            id:1,
            text: "answer",
            score:11
        }
    };
    testService.addOrUpdateAnswer(userAnswer);

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('You are more of an extrovert');
  });


  it('should navigate to /test when click on take test again', fakeAsync(() => {
    const fixture = TestBed.createComponent(ResultComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    compiled.querySelector('a').click();
    tick();
    expect(location.path()).toBe("/test");
  }));
});
