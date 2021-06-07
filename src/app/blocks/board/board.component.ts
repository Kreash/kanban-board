import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardObject } from '../../app.component';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  @Input() сardsArrs: (CardObject[])[];
  @Input() newCards: CardObject[];
  @Input() inProgressCards: CardObject[];
  @Input() doneCards: CardObject[];
  @Output() changeStatusTask = new EventEmitter();
  @Output() deleteTask = new EventEmitter();
  @Output() editTask = new EventEmitter();
  @Output() showTask = new EventEmitter();

  constructor() {
    this.сardsArrs = [[],[],[]]

    this.newCards = []
    this.inProgressCards = []
    this.doneCards = []
  }

  drop(event: CdkDragDrop<CardObject[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.previousIndex);
    } else {
      this.changeStatusTask.emit({
        taskObject: event.previousContainer.data[event.previousIndex],
        nextColumnId: event.container.id})
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  cardEvent(evt: {action:string, cardObject:CardObject}) {
    if (evt.action === 'delete') {
      this.deleteTask.emit(evt.cardObject.id)
    } else if (evt.action === 'edit') {
      this.editTask.emit(evt)
    } else if(evt.action === 'show') {
      this.showTask.emit(evt)
    }
  }
}
