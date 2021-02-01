import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from "./app-routes";
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { TestDataService } from './_shared/services';
import { TestService } from './test/test.service';
import { TestResultService } from './result/test-result.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppRoutes', () => {
  let router: Router;
  let location: Location;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers:[
          TestDataService,
          TestService,
          TestResultService
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
  });


  it('should redirect to "/landing" when navigating to ""', fakeAsync(() => {
    router.navigate(["/"]);
    tick();
    expect(location.path()).toBe("/landing");
  }));

  it('should navigate to "/landing"', fakeAsync(() => {
    router.navigate(["landing"]);
    tick();
    expect(location.path()).toBe("/landing");
  }));

  it('should navigate to "/test"', fakeAsync(() => {
    router.navigate(["test"]);
    tick();
    expect(location.path()).toBe("/test");
  }));

  it('should navigate to "/result"', fakeAsync(() => {
    router.navigate(["/result"]);
    tick();
    expect(location.path()).toBe("/result");
  }));
});
