import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() optionsList: string[];
  @Input() disabled: boolean;
  @Output() selectedEvent = new EventEmitter();

  show:boolean = false;
  selectedValue:string;

  constructor() {
    this.disabled = false
    this.optionsList = ['default']
    this.selectedValue = this.optionsList[0]
  }

  ngOnInit(): void {
    this.selectedValue = this.optionsList[0]
    console.log(this.disabled)
  }

  showOptions() {
    this.show = !this.show;
  }

  clickOption(ev: MouseEvent): void {
    this.show = false;
    const event:any = ev.target;
    const selectedValue = event.innerHTML.trim();
    this.selectedValue = selectedValue;
    this.selectedEvent.emit(selectedValue);
  }

}
