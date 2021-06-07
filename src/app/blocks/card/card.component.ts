import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardObject } from '../../app.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardObject: CardObject;
  @Output() cardEvent = new EventEmitter();
  // shortDescription: string = '';

  constructor() {
    this.cardObject = {
      title: '',
      description: ''
    }
   }

  ngOnInit(): void {
    // Вариант обрезания многострочного текста
    // Решение обрезания многострочного текста, через css ненадёжно,
    // так как использует свойства не входящие в стандарт

    // if (this.cardObject.description.length > 75) {
    //   this.shortDescription = this.cardObject.description.slice(0, 75) + '...'
    // } else {
    //   this.shortDescription = this.cardObject.description;
    // }
  }

  emitCLick(str: string) {
    this.cardEvent.emit({action: str, cardObject: this.cardObject});
  }

}
