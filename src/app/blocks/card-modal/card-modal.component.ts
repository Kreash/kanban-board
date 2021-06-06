import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalOptions } from '../../app.component';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  @Input() modalOptions: ModalOptions;
  @Input() action: string;
  @Output() closeModal = new EventEmitter();
  @Output() saveModal = new EventEmitter();

  selectOptions: string[];
  disabledSelect: boolean;

  constructor() {
    this.modalOptions = {
      status: '',
      title: '',
      description: ''
    }
    this.action = 'new-task';
    this.selectOptions = [];
    this.disabledSelect = false;
  }

  ngOnInit(): void {
    this.changeSelect()
  }

  close() {
    console.log('closeModal: ', this.modalOptions);
    this.closeModal.emit();
  }

  save() {
    this.saveModal.emit(this.modalOptions);
  }

  changeSelect(): void {
    const status = this.modalOptions.status
    if (status === 'new') {
      this.selectOptions = ['Новая', 'Выполняется'];
    } else if (status === 'in-progress') {
      this.selectOptions = ['Выполняется', 'Готово'];
    } else if (status === 'done') {
      this.selectOptions = ['Готово'];
      this.disabledSelect = true
    } else {
      this.selectOptions = ['Новая'];
      this.disabledSelect = true
      this.modalOptions.status = 'new'
    }
  }

  changeStatus(evt: string) {
    if (evt === 'Новая') {
      this.modalOptions.status = 'new'
    } else if (evt === 'Выполняется') {
      this.modalOptions.status = 'in-progress'
    } else if (evt === 'Готово') {
      this.modalOptions.status = 'done'
    }
  }

}
