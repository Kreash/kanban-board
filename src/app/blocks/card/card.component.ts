import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardObject } from '../../app.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

// interface CardObject {
//   title: string;
// }
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardObject: CardObject;
  @Output() cardEvent = new EventEmitter();

  constructor() {
    this.cardObject = {
      title: '',
      description: ''
    }
   }

  ngOnInit(): void {
  }

  emitCLick(str: string) {
    this.cardEvent.emit({action: str, id: this.cardObject.id});
  }


}
