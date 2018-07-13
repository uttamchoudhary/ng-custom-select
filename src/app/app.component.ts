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

  htmlSnippet;
  tsSnippet;

  isDataList;
  displayKey;
  searchKeys;
  list;
  isDisable;
  styleGuide;

  constructor(private _fb: FormBuilder, private loader: LoaderService, private _http: HttpClient) {

  }

  ngOnInit() {
    this.configForm = this._fb.group({
      disable: [false],
      options: ['', [Validators.required, this.isInputArray()]],
      displayKey: [''],
      isDatalist: [false],
      searchKeys: [''],
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
    this.isDataList = this.configForm.value.isDatalist;
    this.isDisable = this.configForm.value.disable;
    this.list = JSON.parse(this.configForm.value.options);
    this.displayKey = this.configForm.value.displayKey;
    this.searchKeys = this.configForm.value.searchKeys && this.configForm.value.searchKeys.trim().replace(/\n/g, ',').replace(/\r/g, ',').replace(/[, ]+/g, ",").split(',');
    this.styleGuide = Object.assign({}, this.defaultStyles, (this.configForm.value.styleGuide && JSON.parse(this.configForm.value.styleGuide)));
  }

  modalClose() {
    this.showModal = false;
  }

  prepareCodeSnippets(){
    this.tsSnippet = `options=${this.configForm.value.options}
    displayKey=${this.displayKey}`
  }

  isInputArray(): ValidatorFn {
    return (control: AbstractControl): any => {
      let val = control.value;
      if (!val || val === null || val === undefined || val === '')
        return null;
      try{
        val = JSON.parse(val);
      } catch(e) {

      }
      return typeof val === 'object' && val instanceof Array && val.length ? null : { invalidEntry: true }
    }
  }

  isInputObject(): ValidatorFn {
    return (control: AbstractControl): any => {
      let val = control.value;
      if (!val || val === null || val === undefined || val === '')
        return null;

      try{
        val = JSON.parse(val);
      } catch(e) {

      }
      return typeof val === 'object' ? null : { invalidEntry: true }
    }
  }

  isValidSearchKey():ValidatorFn {
    return (control: AbstractControl): any => {
      let val = control.value;
      if (!val || val === null || val === undefined || val === '')
        return null;

      let keys = Object.keys(this.configForm.value.options[0]);
     // val.trim().replace(/\n/g, ',').replace(/\r/g, ',').replace(/[, ]+/g, ",").split(',')
      return typeof val === 'object' ? null : { invalidEntry: true }
    }
  }


  // isDisable = false;
  // modelForm : FormGroup;
  // list = [
  //   {
  //     key: 'order_details',
  //     name: 'uttam',
  //     status: 0
  //   },
  //   {
  //     key: 'send_to',
  //     name: 'Sachin',
  //     status: 1
  //   },
  //   {
  //     key: 'pick_to',
  //     name: 'Anuj',
  //     status: 2
  //   },
  //   {
  //     key: 'pick_from',
  //     name: 'Sunny',
  //     status: 0
  //   },

  // ];
  // current;
  // //selected = 2;
  settings = {
    caretClass: 'icon-dropdown',
    selectBoxClass: 'dropdown-wrapper',
    selectMenuClass: 'dropdown',
    optionsClass: 'option'
  };
  html = `<p class="text" novalidate>uttam</p>`
  css = `pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
}
pre {
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
}`;
ts = `settings = {
  caretClass: 'icon-dropdown',
  selectBoxClass: 'dropdown-wrapper',
  selectMenuClass: 'dropdown',
  optionsClass: 'option'
}`
  code = `<var>y</var> = <var>m</var><var>x</var> + <var>b</var>`
  // [{"key":"order_details","name":"uttam","status":0},{"key":"send_to","name":"Sachin","status":1},{"key":"pick_to","name":"Anuj","status":2},{"key":"pick_from","name":"Sunny","status":0}]
  // stringoptions = ['uttam','sachin','anuj', 'anu', 'honey'];
  // {"caretClass":"icon-dropdown","selectBoxClass":"dropdown-wrapper","selectMenuClass":"dropdown","optionsClass":"option"}
  // numericOptions = [1,2,3,4,57,8,23]
  // displayed;
  // selectForm : FormGroup;
  // stringmodelForm : FormGroup;
  //searchKeys = ['key', 'name', 'status'];
  // constructor(private _fb: FormBuilder){
  //   this.current = this.options[1];
  //   this.modelForm = this._fb.group({
  //     selectBox : [this.options[2], Validators.required]
  //   })
  //   this.selectForm = this._fb.group({
  //     selectBox : [this.options[2], Validators.required]
  //   })
  //   this.stringmodelForm = this._fb.group({
  //     selectBox : [this.stringoptions[2], Validators.required]
  //   })
  //   //console.log(3);
  // }
  // changeValue(index){
  //   this.displayed = index;
  // }

  // printValue(templateForm){
  //   console.log('Template form : ', templateForm.value);
  //   console.log('Model form : ', this.modelForm.value);
  //   // this.modelForm.patchValue({
  //   //   selectBox : this.options[0]
  //   // })
  //   // this.searchKeys.splice(1,1);
  //   console.log('Model form : ', this.modelForm.value);

  // }

  try(evt) {
    //this.loader.start();
    console.log(this.configForm.value);
  }
}
