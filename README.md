# Angular Custom Dropdown

> Create customizable Angular2+ dropdown that can works as either select or datalist with no constraints on styles.

## Install

```
npm install ng-custom-select
```

## Usage

Import `DropdownModule` into your module

your-module.module.ts
```
import { DropdownModule } from 'ng-custom-select';

@NgModule({
  imports: [
    ...
    DropdownModule,
  ],
```
Import `Settings` interface into your component class for providing settings configuration of your dropdown.

your-component.component.ts
```
import { Settings } from 'ng-custom-select';
...
export class YourComponent {
  settings: Settings;
}
```

Settings interface
```
interface Settings { 
    output?: string;  //Optional | Default is 'index' | Type that you want in output, 'value' or 'index' of selected item.
    isDatalist?: boolean;  //Optional | Default is false | true if you want dropdown to be act as Datalist.
    caretClass?: string;  //Optional | Default is 'icon' | CSS class for your Caret icon, it can be a sprite class or glyphicon or font icon class.
}
```


It takes three inputs and emits change event to parent component.

Inputs:
```
options: Array<any>; //Required | "Array of numbers or string, these values will be displayed as options in dropdown list";
selected: number; //Optional | "Index of element of options array that will be default selected in dropdown, Default is 0";
settings: Settings; //Optional | "Settings for the dropdown"
```

Now you can use dropdown selector in your component template as shown below

your-component.component.html
```
<ng-dropdown [selected]="selected" [options]="options" [settings]="settings" (onchange)="changeValue($event)"></ng-dropdown>
```

It emits onchange event to the parent component, So there should be an event handler in parent component class. $event omits a 'value' or 'index' depending upon settings input.

## Styling

For styling of dropdown, SCSS or CSS can be written as global styles for uniform styling across the project, or you write styles inside your parent component styles using `/deep/` selector.

**Note**: Please maintain the hierarchy of classes while writing style and don't forget to add `/deep/` before `.dropdown-wrapper` in case you are writing styles inside your parent component.

sample.style.scss
```
.dropdown-wrapper {
    padding: 12px 16px;
    width: 20%;
    border: 1px solid rgb(206, 205, 201);
    cursor: pointer;
    outline: none;
    color: rgb(110, 108, 105);
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
        .option:hover .text {
            color: #d15947;
        }
        .option {
            padding: 0.8em;
            border-bottom: 1px solid rgb(206, 205, 201);
            .text {
                text-decoration: none;
                color: rgb(110, 108, 105);
                padding: 1em 0;
            }
        }
    }
}

.caret {
    &::after {
        content: "▼";
        text-align: center;
        pointer-events: none;
    }
}
```
 
## License

MIT © [Uttam Pratap Choudhary](//https://github.com/uttamchoudhary)
