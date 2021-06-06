import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-task-btn',
  templateUrl: './create-task-btn.component.html',
  styleUrls: ['./create-task-btn.component.scss']
})
export class CreateTaskBtnComponent implements OnInit {

  @Output() btnClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitCLick() {
    this.btnClick.emit();
  }

}
