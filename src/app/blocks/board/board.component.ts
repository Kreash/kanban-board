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

  constructor() {
    this.сardsArrs = [[{title: '111 card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',
    status: 'new',
    id: 1}],[{title: '111 card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',
    status: 'new',
    id: 1}],[{title: '111 card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',
    status: 'new',
    id: 1}]]

    this.newCards = []
    this.inProgressCards = []
    this.doneCards = []
  }

  new: CardObject[] = [
    {title: '111 card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',
    status: 'new',
    id: 1},
  ];
  inProgress: CardObject[] = [
    {title: 'three card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',
    status: 'in-progress'},
  ];
  done: CardObject[] = [
    {title: 'four card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',
    status: 'done'}
  ];

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


  cardEvent(evt: {action:string, id:number}) {
    if (evt.action === 'delete') {
      this.deleteTask.emit(evt.id)
    } else if (evt.action === 'edit') {

    } else if(evt.action === 'show') {

    }



    // console.log(evt)
  }
}
