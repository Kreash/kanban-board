import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


export interface CardObject {
  id?: number;
  status?: string;
  title: string;
  description?: string;
  time?: number;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor() { }

  new: CardObject[] = [
    {title: '111 card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',
    status: 'new'},
    {title: '222 card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',status: 'new'},
    {title: '333 card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',status: 'new'},
    {title: '444 card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',status: 'new'},
    {title: '555 card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',
    status: 'new'},
  ];

  inProgress: CardObject[] = [
    {title: 'three card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',
    status: 'in-progress'},
  ];

  done: CardObject[] = [
    {title: 'four card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',
    status: 'done'},
    {title: 'five card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …',
    status: 'done'}
  ];

  drop(event: CdkDragDrop<CardObject[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
