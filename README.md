# Angular Custom Dropdown

> Create customizable Angular2+ dropdown/datalist with your own styles.

## Install

```
npm install ng-custom-select
```

## Usage

Import DropdownModule into your module

your-module.module.ts

```
import { DropdownModule } from 'ng-custom-select';

@NgModule({
  imports: [
    ...
    DropdownModule,
  ],
```

Now you can use dropdown selector in your component

your-component.component.html

```
<ng-dropdown [selected]="selected" [options]="options" [settings]="settings" (onchange)="changeValue($event)"></ng-dropdown>
```

## License

MIT © [Uttam Pratap Choudhary](//https://github.com/uttamchoudhary)