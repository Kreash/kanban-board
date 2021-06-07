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

  shortTitle: string = '';
  shortDescription: string = '';

  constructor() {
    this.cardObject = {
      title: '',
      description: ''
    }

   }

  ngOnInit(): void {
    if (this.cardObject.title.length > 17) {
      this.shortTitle = this.cardObject.title.slice(0, 17) + '...'
    } else {
      this.shortTitle = this.cardObject.title;
    }
    if (this.cardObject.description.length > 75) {
      this.shortDescription = this.cardObject.description.slice(0, 75) + '...'
    } else {
      this.shortDescription = this.cardObject.description;
    }
  }

  emitCLick(str: string) {
    this.cardEvent.emit({action: str, cardObject: this.cardObject});
  }


}
