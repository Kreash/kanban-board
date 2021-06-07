import { Component } from '@angular/core';

export interface CardObject {
  id?: number;
  status?: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cardsArrs: (CardObject[])[] = [[],[],[]]
  newCards: CardObject[] = [];
  inProgressCards: CardObject[] = [];
  doneCards: CardObject[] = [];

  showModal = false;
  worker: Worker;
  modalOptions: CardObject = {
    status: 'new',
    title: 'Новая задача 1 ',
    description: 'Сложное описание задачи говорит о том, что верстка должна быть усложнена и необходимо сделать ее качественно'
  }
  action: string

  constructor() {
    // if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./workers/app.worker', import.meta.url));
      this.worker.addEventListener('message', (message: MessageEvent) => {
        this.cardsArrs = message.data

        this.newCards = message.data[0];
        this.inProgressCards = message.data[1];
        this.doneCards = message.data[2];

        // console.log('Got data from worker: ', message.data);
      })
      this.action = 'new-task'
    // } else {
    //   console.log('Web worker is not suported!')
    // }

    this.worker.postMessage({evt: 'read-tasks'});

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

  saveModal(evt: CardObject) {
    console.log(evt)
    this.worker.postMessage({evt: this.action, taskObject: evt});
    this.showModal = false;
  }

  changeStatusTask(taskAndColumn: Object) {
    this.worker.postMessage({evt: 'edit-status-task', taskAndColumn: taskAndColumn});
  }

  deleteTask(id:number) {
    this.worker.postMessage({evt: 'delete-task', id: id});
  }

  editTask(evt: {action:string, cardObject:CardObject}) {
    console.log(evt.action);

    this.modalOptions = evt.cardObject
    this.action = 'edit-task'
    this.showModal = true;
  }

  showTask(evt: any) {
    console.log(evt.action);

    this.modalOptions = evt.cardObject
    this.action = 'show-task'
    this.showModal = true;
  }

}
