import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserEntryModule } from './user-entry/user-entry.module';
import { ErrorPagesModule } from './error-pages/error-pages.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MyHttpInterceptorService} from './http-interceptor.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserEntryModule,
    ErrorPagesModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
