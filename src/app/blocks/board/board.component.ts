import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


export interface CardObject {
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
    {title: 'one card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …'},
    {title: 'two card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …'},
  ];

  inProgress: CardObject[] = [
    {title: 'three card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …'},
  ];

  done: CardObject[] = [
    {title: 'four card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …'},
    {title: 'five card',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и …'}
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
