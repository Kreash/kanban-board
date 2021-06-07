import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardObject } from '../../app.component';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  @Input() modalOptions: CardObject;
  @Input() action: string;
  @Output() closeModal = new EventEmitter();
  @Output() saveModal = new EventEmitter();

  selectOptions: string[];
  disabledSelect: boolean;
  currentOptions: CardObject;
  modalTitle: string = 'Новая задача';

  constructor() {
    this.modalOptions = {
      status: '',
      title: '',
      description: ''
    }
    this.currentOptions = {
      status: '',
      title: '',
      description: ''
    }
    this.action = 'new-task';
    this.selectOptions = [];
    this.disabledSelect = false;
  }

  ngOnInit(): void {
    this.currentOptions = JSON.parse(JSON.stringify(this.modalOptions));
    this.changeSelect();
    this.changeModalTitle()
  }

  close() {
    this.closeModal.emit();
  }

  save() {
    this.saveModal.emit(this.currentOptions);
  }

  changeSelect(): void {
    const status = this.currentOptions.status
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
      this.currentOptions.status = 'new'
    }
  }

  changeStatus(evt: string) {
    if (evt === 'Новая') {
      this.currentOptions.status = 'new'
    } else if (evt === 'Выполняется') {
      this.currentOptions.status = 'in-progress'
    } else if (evt === 'Готово') {
      this.currentOptions.status = 'done'
    }
  }

  changeModalTitle() {
    if (this.modalOptions.status === 'new' || this.modalOptions.status === 'in-progress') {
      this.modalTitle = 'Редактирование задачи'
    } else if (this.modalOptions.status === 'done') {
      this.modalTitle = 'Просмотр задачи'
    }
  }

}
