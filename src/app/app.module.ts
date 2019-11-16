import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';
import { Test4Component } from './test4/test4.component';
import { ViewFinderComponent } from './view-finder/view-finder.component';
import { CameraComponent } from './camera/camera.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, TestComponent, Test2Component, Test3Component, Test4Component, ViewFinderComponent, CameraComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
