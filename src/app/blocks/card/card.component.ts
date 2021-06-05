import { Component, OnInit, Input } from '@angular/core';
import { CardObject } from '../board/board.component'

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

  constructor() {
    this.cardObject = {
      title: ''
    }
   }

  ngOnInit(): void {
  }

}
