import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    InfiniteScrollComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
