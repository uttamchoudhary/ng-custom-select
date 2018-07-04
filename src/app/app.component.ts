import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDisable = false;
  modelForm : FormGroup;
  options = [
    {
      key: 'order_details',
      name: 'uttam',
      status: 0
    },
    {
      key: 'send_to',
      name: 'Sachin',
      status: 1
    },
    {
      key: 'pick_to',
      name: 'Anuj',
      status: 2
    },
    {
      key: 'pick_from',
      name: 'Sunny',
      status: 0
    },
    
  ];
  current;
  //selected = 2;
  settings ={
    caretClass:'icon-dropdown',
    dropdownClass: 'dropdown-wrapper',      
    dropdownMenuClass: 'dropdown',
    optionsClass: 'option'
  };
  stringoptions = ['uttam','sachin','anuj', 'anu', 'honey'];
  numericOptions = [1,2,3,4,57,8,23]
  displayed;
  selectForm : FormGroup;
  stringmodelForm : FormGroup;
  searchKeys =['key','name', 'status'];
  constructor(private _fb: FormBuilder){
    this.current = this.options[1];
    this.modelForm = this._fb.group({
      selectBox : [this.options[2], Validators.required]
    })
    this.selectForm = this._fb.group({
      selectBox : [this.options[2], Validators.required]
    })
    this.stringmodelForm = this._fb.group({
      selectBox : [this.stringoptions[2], Validators.required]
    })
  }
  changeValue(index){
    this.displayed = index;
  }

  printValue(templateForm){
    console.log('Template form : ', templateForm.value);
    console.log('Model form : ', this.modelForm.value);
    // this.modelForm.patchValue({
    //   selectBox : this.options[0]
    // })
    // this.searchKeys.splice(1,1);
    console.log('Model form : ', this.modelForm.value);
    
  }
}
