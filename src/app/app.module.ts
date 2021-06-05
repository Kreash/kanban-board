import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './blocks/card/card.component';
import { CreateTaskBtnComponent } from './components/create-task-btn/create-task-btn.component';
import { BoardComponent } from './blocks/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CreateTaskBtnComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
