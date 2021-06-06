import { Component, OnInit, Input } from '@angular/core';
import { ModalOptions } from '../../app.component';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  @Input() modalOptions: ModalOptions

  constructor() {
    this.modalOptions = {
      status: 'new',
      title: '',
      description: '',
    }
   }

  ngOnInit(): void {
  }

}
