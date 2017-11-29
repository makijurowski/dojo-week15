import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { UserComponentComponent } from './user-component/user-component.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    UserComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
