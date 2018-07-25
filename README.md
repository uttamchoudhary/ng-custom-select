# Angular Custom Dropdown

> Create customizable Angular 6 dropdown that can works as either select or datalist with no constraints on styles. Dropdown can be used as form element or independent element. `formConrol` or `ngModel` can be used on this for bindings. Support 2-way binding. 

## Installation

```
npm install --save ng-custom-select
```

> For Angular[2,4,5], install older version
```
npm install --save ng-custom-select@1.0.4
```
## Demo

Check working [Demo](https://uttamchoudhary.github.io/ng-custom-select/). You can test and generate code snippet from demo.

## Usage

Import `NgSelectModule` into your module

your-module.module.ts
```ts
import { NgSelectModule } from 'ng-custom-select';

@NgModule({
  imports: [
    ...
    NgSelectModule,
  ],
```

Now Start using select box in your components.

your-component.component.html
```html
<ng-select [options]="options" [displayKey]="displayKey" [disable]="isDisable" [styleGuide]="styleGuide" [isDatalist]="isDataList" [searchKeys]="searchKeys" [formControl]="selectBox"  [(ngModel)]="selectBox" (onChange)="onChange($event)"></ng-select>
```

## Properties

```ts
* options : Array<Object | String>; //Required | Pass any list of objects(similar struct) or strings, each entry is an option of select box.
* displayKey : String; //Optional | Any key name present in object of options Array. Value of this key will be displayed to user as options. By default value of first key will be shown. in case of Array<String> , each entry is displayed as option.
* disable : Boolean; //Optional | if True, dropdown will be disabled. Default is false.
* styleGuide : Object = {
    caretClass: <caret-icon-className>,
    selectBoxClass: <select-wrapper-className>,
    selectMenuClass: <options-wrapper-className>,
    optionsClass: <individual-option-className>
  } // Optional | Styling breaks if css not provided. Write your SCSS/CSS using above class names and proper hierarchy (selectBoxClass > selectMenuClass > optionsClass) and refer `Styling` block.
* isDatalist : Boolean ; //Optional | if True, behave like a datalist. User can search upon options of dropdown. Default is false.
* searchKeys : Array<String>; //Optional | Provide list of key names of objects of `options` array, user can search upon values of these keys. By default first key name is used as search key. 
* formControl : AbstractControl; //Optional | FormControlName to bind dropdown with.
* ngModel : NgControl; //Optional | Used for binding value.
```

**Note**: By default First option of `options` list is selected. If you want some other option to be selected, use it with `ngModel`. 

## Output

It emits `onChange` event to the parent component when selected value is changed by user, So there should be an event handler in parent component class. $event emits clicked option of options Array.

## Styling

For styling of dropdown, SCSS or CSS can be written as global styles for uniform styling across the project, or you write styles inside your parent component styles using `/deep/` selector. Don't forget to add your css classnames in `styleGuide` property of `ng-select`.

**Note**: Please maintain the hierarchy(selectBoxClass > selectMenuClass > optionsClass) of classes while writing style and don't forget to add `/deep/` before `<selectBoxClass>` in case you are writing styles inside your parent component. You can use your own classnames for select box, just pass the classnames in `styleGuide` property of `ng-select`.

sample.style.scss
```scss
.dropdown-wrapper {
    padding: 12px 16px;
    border: 1px solid rgb(206, 205, 201);
    cursor: pointer;
    outline: none;
    color: rgb(110, 108, 105);
    &:focus {
        border: 1px solid #80bdff;
    }
    .dropdown {
        /* Styles */
        background: #fff;
        border-radius: 0 0 5px 5px;
        border: 1px solid rgb(206, 205, 201);
        border-top: none;
        box-sizing: border-box;
        max-height: 400px;
        border-bottom: 1px solid rgb(206, 205, 201);
        /* Hover state */
        .option:hover  {
            color: #d15947;
        }
        .option {
            padding: 0.8em;
            border-bottom: 1px solid rgb(206, 205, 201);
            text-decoration: none;
            color: rgb(110, 108, 105);
        }
    }
}

.caret {
    &::after {
        content: "▼";
        text-align: center;
    }
}
```

```ts
styleGuide: {
    caretClass: 'caret',
    selectBoxClass: 'dropdown-wrapper',
    selectMenuClass: 'dropdown',
    optionsClass: 'option' 
}
```

## Sample Inputs

```ts
options = [
    {"key":"google","value":"Angular"},
    {"key":"facebook","value":"React"},
    {"key":"evan","value":"Vue"},
    {"key":"tilde","value":"Ember"},
    {"key":"twitter","value":"Bootstrap"}
];
displayKey = "value";
isDisable = false;
styleGuide = {
    caretClass: 'caret',
    selectBoxClass: 'dropdown-wrapper',
    selectMenuClass: 'dropdown',
    optionsClass: 'option' 
};
isDataList = false;
searchKeys = ['key','value'];

```
 
## License

MIT © [Uttam Pratap Choudhary](//https://github.com/uttamchoudhary)