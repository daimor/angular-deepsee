import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbDeepSeeModule } from 'angular-deepsee';

import { HomeComponent } from './home/home.component';
import { GettingStarted } from './getting-started';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { NgbdDemoModule } from './components';
import { NgbdSharedModule } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GettingStarted
  ],
  imports: [
    BrowserModule,
    routing,
    NgbModule.forRoot(),
    NgbDeepSeeModule.forRoot(),
    NgbdDemoModule,
    NgbdSharedModule
  ],
  bootstrap: [AppComponent]
})
export class NgbdModule { }
