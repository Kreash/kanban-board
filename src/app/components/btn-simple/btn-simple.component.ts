import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-simple',
  templateUrl: './btn-simple.component.html',
  styleUrls: ['./btn-simple.component.scss']
})
export class BtnSimpleComponent implements OnInit {

  @Input() theme: string
  @Output() btnClick = new EventEmitter();

  constructor() {
    this.theme = 'primary'
  }

  ngOnInit(): void {
  }

  emitCLick() {
    this.btnClick.emit();
  }

}
