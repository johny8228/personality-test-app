import { Routes } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { ResultComponent } from "./result/result.component";
import { TestComponent } from "./test/test.component";

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'landing' },
    { path: 'landing', component: LandingComponent },
    { path: 'test', component: TestComponent },
    { path: 'result', component: ResultComponent }
  ];
  