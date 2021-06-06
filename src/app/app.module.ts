import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './blocks/card/card.component';
import { CreateTaskBtnComponent } from './components/create-task-btn/create-task-btn.component';
import { BoardComponent } from './blocks/board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CardModalComponent } from './blocks/card-modal/card-modal.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CreateTaskBtnComponent,
    BoardComponent,
    CardModalComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
