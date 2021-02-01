import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingComponent } from './landing.component';
import { routes } from "../app-routes";
import { Location } from "@angular/common";

describe('LandingComponent', () => {
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        LandingComponent
      ],
    }).compileComponents();

    location = TestBed.inject(Location);
  });

  it('should create landing component', () => {
    const fixture = TestBed.createComponent(LandingComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render landing component title', () => {
    const fixture = TestBed.createComponent(LandingComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('Test: Are you an introvert or an extrovert?');
  });

  it('should navigate to /test when click on start test', fakeAsync(() => {
    const fixture = TestBed.createComponent(LandingComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    compiled.querySelector('a').click();
    tick();
    expect(location.path()).toBe("/test");
  }));
});
