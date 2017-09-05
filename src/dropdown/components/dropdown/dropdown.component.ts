import { Settings } from './../../model/settings.model';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'ng-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  host: {
    '(document:click)': 'closeDropdown($event)',
  }
})
export class DropdownComponent implements OnInit {

  @Input() options: Array<any>;
  @Input() selected: number;
  @Input() settings: Settings;

  @Output() onchange = new EventEmitter();

  selectedItem: any;
  searchTerm: any;
  filterOptions: Array<any>;
  active: boolean = false;
  positionTop: any;
  positionRight: any;
  constructor(private _eref: ElementRef) { }


  closeDropdown(event: any) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.active = false;
      this.searchTerm = this.selectedItem;
      this.filterOptions = Object.assign([], this.options);
    }
  }

  ngOnInit() {
    this.getCaretPosition();
    this.selectedItem = this.selected ? this.options[this.selected - 1] : this.options[0];
    this.searchTerm = this.selectedItem;
    this.filterOptions = Object.assign([], this.options);
  }

  changeValue(index: any) {
    this.selectedItem = this.filterOptions[index];
    this.searchTerm = this.selectedItem;
    if (this.settings && (this.settings['output'] === "value" || this.settings['output'] === "Value")) {
      this.onchange.emit(this.selectedItem);
    } else {
      this.onchange.emit(index);
    }
  }
  search() {
    if (this.searchTerm === "") {
      this.filterOptions = Object.assign([], this.options);
      return;
    }

    let reg = new RegExp(this.searchTerm, 'gi');
    this.filterOptions = this.options.filter(function (elem) {
      if (reg.test(elem)) {
        return elem;
      }
    });
  }
  getCaretPosition() {
    let computedStyles = window.getComputedStyle(this._eref.nativeElement.querySelector('.dropdown-wrapper'));
    this.positionTop = computedStyles.getPropertyValue("padding-top");
    this.positionRight = computedStyles.getPropertyValue("padding-right");

  }
}
