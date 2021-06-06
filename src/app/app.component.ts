import { Component } from '@angular/core';

export interface ModalOptions {
  status: string,
  title: string,
  description?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showModal = false;
  worker: Worker;
  modalOptions: ModalOptions = {
    status: 'new',
    title: 'Новая задача 1 ',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и необходимо сделать ее качественно'
  }
  action: string

  constructor() {
    // if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./workers/app.worker', import.meta.url));
      this.worker.addEventListener('message',
        (message: MessageEvent) =>
          console.log(
            'Got data from worker: ',
            message.data
          )
      )
      this.action = 'new-task'

    // } else {
    //   console.log('Web worker is not suported!')
    // }
  }

  newTask() {
    this.modalOptions = {
      status: '',
      title: '',
      description: '',
    }
    this.action = 'new-task'
    this.showModal = true;

    // this.worker.postMessage('new');
  }

  closeModal() {
    this.showModal = false;
    // this.worker.postMessage({evt: 'new-task', taskObject: this.modalOptions});
  }

  saveModal(evt: ModalOptions) {
    console.log(evt)
    this.worker.postMessage({evt: this.action, taskObject: evt});
    this.showModal = false;
  }



}
