import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Settings } from './shared/components/modal/models';
import { LoaderService } from './shared/services/loader.service';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  configForm: FormGroup;
  providedStyles;
  styleTag;
  head = document.head || document.getElementsByTagName('head')[0];
  showModal = false;
  modalConfig: Settings = {
    closeOnEscape: true,
    closeOnOutsideClick: false,
    title: 'Your Customized Select box',
    hideCloseButton: false,
    modalClass: 'modal-lg',
    backdrop: true
  }

  defaultStyles = {
    caretClass: 'icon-dropdown',
    selectBoxClass: 'dropdown-wrapper',
    selectMenuClass: 'dropdown',
    optionsClass: 'option'
  }

  defaultOptions = `[{"key":"google","value":"Angular"},
  {"key":"facebook","value":"React"},
  {"key":"evan","value":"Vue"},
  {"key":"tilde","value":"Ember"},
  {"key":"twitter","value":"Bootstrap"}]`;

  htmlSnippet;
  tsSnippet;

  selectSettings = {};

  constructor(private _fb: FormBuilder, private loader: LoaderService, private _http: HttpClient) {

  }

  ngOnInit() {
    this.configForm = this._fb.group({
      disable: [false],
      options: [this.defaultOptions, [Validators.required, this.isInputArray()]],
      displayKey: ['', [this.isValidSearchKey()]],
      isDatalist: [false],
      searchKeys: ['', [this.isValidSearchKey()]],
      userStyleGuide: [false],
      styleGuide: ['', [this.isInputObject()]],
      styles: [''],
      cssUrl: ['']
    });
  }

  prepareResult(modal) {
    this.providedStyles = this.configForm.value.styles;
    this.processStyleUrl().subscribe(res => {
      this.appendStyles();
      this.prepareInputs();
      this.prepareCodeSnippets();
      this.showModal = true;
      modal.open();
    });
  }

  processStyleUrl() {
    if (!this.configForm.value.cssUrl)
      return of(null);

    return new Observable(observer => {
      this.loader.start();
      this._http.get(this.configForm.value.cssUrl, { responseType: 'text' }).subscribe(res => {
        this.loader.stop();
        this.providedStyles = res;
        observer.next(res);
        observer.complete();
      }, err => {
        this.loader.stop();
        alert("API failed to load css");
        observer.next(null);
        observer.complete();
      })
    });

  }

  appendStyles() {
    if (!document.getElementById('userStyles')) {
      this.styleTag = document.createElement('style');
      this.styleTag.id = "userStyles";
      this.styleTag.type = "text/css";
      this.head.appendChild(this.styleTag);
    }
    if (this.styleTag.styleSheet) {
      // This is required for IE8 and below.
      this.styleTag.styleSheet.cssText = this.providedStyles;
    } else {
      this.styleTag.innerHTML = this.providedStyles;
    }
  }

  prepareInputs() {
    this.selectSettings['isDataList'] = this.configForm.value.isDatalist;
    this.selectSettings['isDisable'] = this.configForm.value.disable;
    this.selectSettings['list'] = JSON.parse(this.configForm.value.options);
    this.selectSettings['displayKey'] = this.configForm.value.displayKey.trim();
    this.selectSettings['searchKeys'] = this.configForm.value.searchKeys && this.configForm.value.searchKeys.trim().replace(/\n/g, ',').replace(/\r/g, ',').replace(/[, ]+/g, ",").split(',');
    this.selectSettings['styleGuide'] = Object.assign({}, this.defaultStyles, (this.configForm.value.styleGuide && JSON.parse(this.configForm.value.styleGuide)));
  }

  modalClose() {
    this.showModal = false;
  }

  prepareCodeSnippets() {
    this.htmlSnippet = `<ng-select [isDatalist]="isDataList" [displayKey]="displayKey" [searchKeys]="searchKeys" 
    [options]="list" [disable]="isDisable" [styleGuide]="styleGuide"></ng-select>`;
    this.tsSnippet = {
      options: `options = ${JSON.stringify(this.selectSettings['list'], null, 4)};`,
      displayKey: this.selectSettings['displayKey'] && `displayKey = "${this.selectSettings['displayKey']}";`,
      isDisable: this.selectSettings['isDisable'] && `disable = true;`,
      isDatalist: this.selectSettings['isDataList'] && `isDatalist = true;`,
      searchKeys : this.selectSettings['searchKeys'] && this.selectSettings['searchKeys'].length && `searchKeys = ${JSON.stringify(this.selectSettings['searchKeys'])};`,
      styleGuide : this.configForm.value.styleGuide && `styleGuide = ${JSON.stringify(JSON.parse(this.configForm.value.styleGuide), null, 4)};`
    }
  }

  isInputArray(): ValidatorFn { 
    return (control: AbstractControl): any => {
      let val = control.value;
      if (!val || val === null || val === undefined || val === '')
        return null;
      try {
        val = JSON.parse(val);
      } catch (e) {

      }
      return typeof val === 'object' && val instanceof Array && val.length ? null : { invalidEntry: true }
    }
  }

  isInputObject(): ValidatorFn {
    return (control: AbstractControl): any => {
      let val = control.value;
      if (!val || val === null || val === undefined || val === '')
        return null;

      try {
        val = JSON.parse(val);
      } catch (e) {

      }
      return typeof val === 'object' ? null : { invalidEntry: true }
    }
  }

  isValidSearchKey(): ValidatorFn {
    return (control: AbstractControl): any => {
      let val = control.value;
      if (!val || val === null || val === undefined || val === '')
        return null;

      let validKeys = Object.keys(JSON.parse(this.configForm.value.options)[0]);
      let keys = val.trim().replace(/\n/g, ',').replace(/\r/g, ',').replace(/[, ]+/g, ",").split(',');
      for (let index = 0; index < keys.length; index++) {
        if (validKeys.indexOf(keys[index]) < 0)
          return { invalidEntry: true }
      }
      return null;
    }
  }


  // [{"key":"order_details","name":"uttam","status":0},{"key":"send_to","name":"Sachin","status":1},{"key":"pick_to","name":"Anuj","status":2},{"key":"pick_from","name":"Sunny","status":0}]
  // {"caretClass":"icon-dropdown","selectBoxClass":"dropdown-wrapper","selectMenuClass":"dropdown","optionsClass":"option"}
  
}
