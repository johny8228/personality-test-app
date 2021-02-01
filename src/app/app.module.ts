import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestDataService } from './_shared/services/test-data.service';
import { TestService } from './test/test.service';
import { LandingComponent } from './landing/landing.component';
import { TestComponent } from './test/test.component';
import { ResultComponent } from './result/result.component';
import { TestResultService } from './result/test-result.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    TestComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatRadioModule
  ],
  providers: [
    TestDataService,
    TestService,
    TestResultService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
