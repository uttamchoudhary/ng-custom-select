import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, forwardRef, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { fromEvent, of } from 'rxjs';
import { distinctUntilChanged, switchMap, debounceTime, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgSelectComponent {
    /**
     * @param {?} _eref
     */
    constructor(_eref) {
        this._eref = _eref;
        this.onChange = new EventEmitter();
        this.active = false;
        this.propagateChange = (_) => { };
        this.searchTerm = new FormControl();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        this.selectedItem = obj;
        obj && Object.keys(obj).length ? this.searchTerm.setValue(obj[this.displayKey] || obj) : null;
    }
    /**
     * @return {?}
     */
    registerOnTouched() { }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * @return {?}
     */
    validate() {
        return this.selectedItem ? null : { required: true };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selectedItem = this.options[0];
        setTimeout(() => {
            this.getCaretPosition();
        });
        if (!this.displayKey && typeof this.options[0] === 'object')
            this.displayKey = Object.keys(this.options[0])[0];
        this.searchTerm.setValue(this.options[0][this.displayKey] || this.options[0]);
        this.filterOptions = Object.assign([], this.options);
        this.isDatalist ? this.initSearch() : null;
    }
    /**
     * @return {?}
     */
    initSearch() {
        if ((!this.searchKeys || !this.searchKeys.length) && this.displayKey && typeof this.options[0] === 'object')
            this.searchKeys = [this.displayKey];
        else if (!this.displayKey || typeof this.options[0] !== 'object')
            this.searchKeys = ['0'];
        fromEvent(this.searchInput.nativeElement, 'input')
            .pipe(map((e) => e.target.value), debounceTime(100), distinctUntilChanged(), switchMap(term => {
            return of(this.options.filter(option => {
                for (let i = 0, len = this.searchKeys.length; i < len; i++) {
                    if (typeof option === "object" && option[this.searchKeys[i]].toString().toLowerCase().indexOf(term.toLowerCase()) > -1) {
                        return option;
                    }
                    else if (typeof option !== "object" && option.toString().toLowerCase().indexOf(term.toLowerCase()) > -1)
                        return option;
                }
            }));
        }))
            .subscribe(list => {
            this.filterOptions = list;
        });
    }
    /**
     * @param {?} option
     * @return {?}
     */
    changeValue(option) {
        this.searchTerm.setValue(option[this.displayKey] || option);
        this.propagateChange(option);
        this.onChange.emit(option);
        this.selectedItem = option;
        this.filterOptions = this.isDatalist ? Object.assign([], this.options) : this.filterOptions;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    closeDropdown(event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.active = false;
            this.searchTerm.setValue(this.selectedItem[this.displayKey] || this.selectedItem);
            this.filterOptions = Object.assign([], this.options);
        }
    }
    /**
     * @return {?}
     */
    getCaretPosition() {
        /** @type {?} */
        let computedStyles = window.getComputedStyle(this._eref.nativeElement.querySelector('.ng-dropdown-wrapper'), null);
        this.positionTop = computedStyles.getPropertyValue("padding-top");
        this.positionRight = computedStyles.getPropertyValue("padding-right");
    }
}
NgSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-select',
                template: `<div class="ng-dropdown-wrapper" [class]="styleGuide?.selectBoxClass" tabindex="0" (click)="active=!active" [ngClass]="{'active':active, 'disabled': disable}">
    <input type="text" name="searchTerm" tabindex="-1" [formControl]="searchTerm" [readonly]="!isDatalist" #searchInput>
    <span [class]="styleGuide?.caretClass" id="caret" [ngStyle]="{'top':positionTop,'right':positionRight}" [ngClass]="{'icon':!styleGuide?.caretClass}"></span>
    <ul [ngClass]="{'ng-dropdown-menu' : true}" [class]="styleGuide?.selectMenuClass">
        <li *ngFor="let option of filterOptions" (click)="changeValue(option)" [class]="styleGuide?.optionsClass">
            <span>{{option[displayKey] || option}}</span>
        </li>
    </ul>
</div>`,
                styles: [`@charset "UTF-8";.ng-dropdown-wrapper{display:inline-block;position:relative}.ng-dropdown-wrapper input[type=text]{width:90%;border:none;outline:0;text-transform:capitalize}.ng-dropdown-wrapper #caret{position:absolute;right:0;top:0;z-index:999}.ng-dropdown-wrapper .icon::after{content:"▼";text-align:center;pointer-events:none}.ng-dropdown-wrapper .ng-dropdown-menu{display:none;position:absolute;top:102%;left:0;right:0;list-style:none;overflow:auto;z-index:9999}.ng-dropdown-wrapper .ng-dropdown-menu li span{text-transform:capitalize;transition:all .3s ease-out}.ng-dropdown-wrapper.active #caret{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.ng-dropdown-wrapper.active .ng-dropdown-menu{display:block}.disabled{cursor:not-allowed;pointer-events:none;opacity:.7;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}`],
                host: {
                    '(document:click)': 'closeDropdown($event)',
                },
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NgSelectComponent),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef(() => NgSelectComponent),
                        multi: true,
                    }
                ]
            },] },
];
/** @nocollapse */
NgSelectComponent.ctorParameters = () => [
    { type: ElementRef }
];
NgSelectComponent.propDecorators = {
    options: [{ type: Input }],
    displayKey: [{ type: Input }],
    styleGuide: [{ type: Input }],
    isDatalist: [{ type: Input }],
    disable: [{ type: Input }],
    searchKeys: [{ type: Input }],
    searchInput: [{ type: ViewChild, args: ['searchInput',] }],
    onChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgSelectModule {
}
NgSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule
                ],
                declarations: [NgSelectComponent],
                exports: [NgSelectComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgSelectComponent, NgSelectModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY3VzdG9tLXNlbGVjdC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctY3VzdG9tLXNlbGVjdC9saWIvbmctc2VsZWN0LmNvbXBvbmVudC50cyIsIm5nOi8vbmctY3VzdG9tLXNlbGVjdC9saWIvbmctc2VsZWN0Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBOR19WQUxJREFUT1JTLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yLCBWYWxpZGF0aW9uRXJyb3JzLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb21FdmVudCwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHNhbXBsZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHN3aXRjaE1hcCwgZGVib3VuY2VUaW1lLCBtYXAgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1zZWxlY3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJuZy1kcm9wZG93bi13cmFwcGVyXCIgW2NsYXNzXT1cInN0eWxlR3VpZGU/LnNlbGVjdEJveENsYXNzXCIgdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImFjdGl2ZT0hYWN0aXZlXCIgW25nQ2xhc3NdPVwieydhY3RpdmUnOmFjdGl2ZSwgJ2Rpc2FibGVkJzogZGlzYWJsZX1cIj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic2VhcmNoVGVybVwiIHRhYmluZGV4PVwiLTFcIiBbZm9ybUNvbnRyb2xdPVwic2VhcmNoVGVybVwiIFtyZWFkb25seV09XCIhaXNEYXRhbGlzdFwiICNzZWFyY2hJbnB1dD5cbiAgICA8c3BhbiBbY2xhc3NdPVwic3R5bGVHdWlkZT8uY2FyZXRDbGFzc1wiIGlkPVwiY2FyZXRcIiBbbmdTdHlsZV09XCJ7J3RvcCc6cG9zaXRpb25Ub3AsJ3JpZ2h0Jzpwb3NpdGlvblJpZ2h0fVwiIFtuZ0NsYXNzXT1cInsnaWNvbic6IXN0eWxlR3VpZGU/LmNhcmV0Q2xhc3N9XCI+PC9zcGFuPlxuICAgIDx1bCBbbmdDbGFzc109XCJ7J25nLWRyb3Bkb3duLW1lbnUnIDogdHJ1ZX1cIiBbY2xhc3NdPVwic3R5bGVHdWlkZT8uc2VsZWN0TWVudUNsYXNzXCI+XG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGZpbHRlck9wdGlvbnNcIiAoY2xpY2spPVwiY2hhbmdlVmFsdWUob3B0aW9uKVwiIFtjbGFzc109XCJzdHlsZUd1aWRlPy5vcHRpb25zQ2xhc3NcIj5cbiAgICAgICAgICAgIDxzcGFuPnt7b3B0aW9uW2Rpc3BsYXlLZXldIHx8IG9wdGlvbn19PC9zcGFuPlxuICAgICAgICA8L2xpPlxuICAgIDwvdWw+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgQGNoYXJzZXQgXCJVVEYtOFwiOy5uZy1kcm9wZG93bi13cmFwcGVye2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlfS5uZy1kcm9wZG93bi13cmFwcGVyIGlucHV0W3R5cGU9dGV4dF17d2lkdGg6OTAlO2JvcmRlcjpub25lO291dGxpbmU6MDt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplfS5uZy1kcm9wZG93bi13cmFwcGVyICNjYXJldHtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO3otaW5kZXg6OTk5fS5uZy1kcm9wZG93bi13cmFwcGVyIC5pY29uOjphZnRlcntjb250ZW50Olwiw6LClsK8XCI7dGV4dC1hbGlnbjpjZW50ZXI7cG9pbnRlci1ldmVudHM6bm9uZX0ubmctZHJvcGRvd24td3JhcHBlciAubmctZHJvcGRvd24tbWVudXtkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwMiU7bGVmdDowO3JpZ2h0OjA7bGlzdC1zdHlsZTpub25lO292ZXJmbG93OmF1dG87ei1pbmRleDo5OTk5fS5uZy1kcm9wZG93bi13cmFwcGVyIC5uZy1kcm9wZG93bi1tZW51IGxpIHNwYW57dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZTt0cmFuc2l0aW9uOmFsbCAuM3MgZWFzZS1vdXR9Lm5nLWRyb3Bkb3duLXdyYXBwZXIuYWN0aXZlICNjYXJldHstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDE4MGRlZyl9Lm5nLWRyb3Bkb3duLXdyYXBwZXIuYWN0aXZlIC5uZy1kcm9wZG93bi1tZW51e2Rpc3BsYXk6YmxvY2t9LmRpc2FibGVke2N1cnNvcjpub3QtYWxsb3dlZDtwb2ludGVyLWV2ZW50czpub25lO29wYWNpdHk6Ljc7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfWBdLFxuICBob3N0OiB7XG4gICAgJyhkb2N1bWVudDpjbGljayknOiAnY2xvc2VEcm9wZG93bigkZXZlbnQpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1NlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1NlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XG5cbiAgLy8gTGlzdCBvZiBvcHRpb25zXG4gIEBJbnB1dCgpIG9wdGlvbnM6IEFycmF5PGFueT47XG5cbiAgLy9uYW1lIG9mIGtleSB0byBkaXNwbGF5ZWQgYXMgb3B0aW9uc1xuICBASW5wdXQoKSBkaXNwbGF5S2V5OiBzdHJpbmc7XG5cbiAgLy9jb250YWlucyB2YXJpb3VzIENvbmZpZyBjbGFzc2VzIGZvciBkcm9wZG93biBcbiAgQElucHV0KCkgc3R5bGVHdWlkZTogYW55O1xuXG4gIC8vVHJ1ZSBpZiBEcm9wZG93biBzaG91bGQgYmVoYXZlIGxpa2UgYSBkYXRhbGlzdFxuICBASW5wdXQoKSBpc0RhdGFsaXN0OiBib29sZWFuO1xuXG4gIC8vVHJ1ZSBpZiBzZWxlY3QgYm94IGlzIGRpc2FibGVkXG4gIEBJbnB1dCgpIGRpc2FibGUgOiBib29sZWFuO1xuXG4gIC8vTGlzdCBvZiBwcm9wZXJ0aWVzIGZvciB3aGljaCBzZWFyY2hpbmcgaXMgYXBwbGllZCBpbiBsaXN0XG4gIEBJbnB1dCgpIHNlYXJjaEtleXM6IEFycmF5PHN0cmluZz47XG5cbiAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnKSBzZWFyY2hJbnB1dDogRWxlbWVudFJlZjtcblxuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgc2VsZWN0ZWRJdGVtOiBhbnk7XG4gIHNlYXJjaFRlcm06IEZvcm1Db250cm9sO1xuICBmaWx0ZXJPcHRpb25zOiBBcnJheTxhbnk+O1xuXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwb3NpdGlvblRvcDogYW55O1xuICBwb3NpdGlvblJpZ2h0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZXJlZjogRWxlbWVudFJlZikge1xuICAgIHRoaXMuc2VhcmNoVGVybSA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7IH1cblxuICB3cml0ZVZhbHVlKG9iajogYW55KSB7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBvYmo7XG4gICAgb2JqICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID8gdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKG9ialt0aGlzLmRpc3BsYXlLZXldIHx8IG9iaikgOiBudWxsO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoKSB7IH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICB9XG5cbiAgdmFsaWRhdGUoKTogVmFsaWRhdGlvbkVycm9ycyB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJdGVtID8gbnVsbCA6IHsgcmVxdWlyZWQ6IHRydWUgfTtcbiAgfVxuXG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSB0aGlzLm9wdGlvbnNbMF07XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdldENhcmV0UG9zaXRpb24oKTtcbiAgICB9KVxuXG4gICAgaWYgKCF0aGlzLmRpc3BsYXlLZXkgJiYgdHlwZW9mIHRoaXMub3B0aW9uc1swXSA9PT0gJ29iamVjdCcpXG4gICAgICB0aGlzLmRpc3BsYXlLZXkgPSBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnNbMF0pWzBdO1xuICAgIHRoaXMuc2VhcmNoVGVybS5zZXRWYWx1ZSh0aGlzLm9wdGlvbnNbMF1bdGhpcy5kaXNwbGF5S2V5XSB8fCB0aGlzLm9wdGlvbnNbMF0pO1xuICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5pc0RhdGFsaXN0ID8gdGhpcy5pbml0U2VhcmNoKCkgOiBudWxsO1xuICB9XG5cbiAgaW5pdFNlYXJjaCgpIHtcbiAgICBpZiAoKCF0aGlzLnNlYXJjaEtleXMgfHwgIXRoaXMuc2VhcmNoS2V5cy5sZW5ndGgpICYmIHRoaXMuZGlzcGxheUtleSAmJiB0eXBlb2YgdGhpcy5vcHRpb25zWzBdID09PSAnb2JqZWN0JylcbiAgICAgIHRoaXMuc2VhcmNoS2V5cyA9IFt0aGlzLmRpc3BsYXlLZXldO1xuICAgIGVsc2UgaWYgKCF0aGlzLmRpc3BsYXlLZXkgfHwgdHlwZW9mIHRoaXMub3B0aW9uc1swXSAhPT0gJ29iamVjdCcpXG4gICAgICB0aGlzLnNlYXJjaEtleXMgPSBbJzAnXTtcblxuICAgIGZyb21FdmVudCh0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsICdpbnB1dCcpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChlOiBhbnkpID0+IGUudGFyZ2V0LnZhbHVlKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMCksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHN3aXRjaE1hcCh0ZXJtID0+IHtcbiAgICAgICAgICByZXR1cm4gb2YoXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLnNlYXJjaEtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25bdGhpcy5zZWFyY2hLZXlzW2ldXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXJtLnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9uICE9PSBcIm9iamVjdFwiICYmIG9wdGlvbi50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXJtLnRvTG93ZXJDYXNlKCkpID4gLTEpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICApKVxuICAgICAgLnN1YnNjcmliZShsaXN0ID0+IHtcbiAgICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0gbGlzdDtcbiAgICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlVmFsdWUob3B0aW9uKSB7XG4gICAgdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKG9wdGlvblt0aGlzLmRpc3BsYXlLZXldIHx8IG9wdGlvbik7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2Uob3B0aW9uKTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQob3B0aW9uKTtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IG9wdGlvbjtcbiAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSB0aGlzLmlzRGF0YWxpc3QgPyBPYmplY3QuYXNzaWduKFtdLCB0aGlzLm9wdGlvbnMpIDogdGhpcy5maWx0ZXJPcHRpb25zO1xuICB9XG5cbiAgY2xvc2VEcm9wZG93bihldmVudCkge1xuICAgIGlmICghdGhpcy5fZXJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLnNlYXJjaFRlcm0uc2V0VmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1bdGhpcy5kaXNwbGF5S2V5XSB8fCB0aGlzLnNlbGVjdGVkSXRlbSk7XG4gICAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGdldENhcmV0UG9zaXRpb24oKSB7XG4gICAgbGV0IGNvbXB1dGVkU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fZXJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZy1kcm9wZG93bi13cmFwcGVyJyksIG51bGwpO1xuICAgIHRoaXMucG9zaXRpb25Ub3AgPSBjb21wdXRlZFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy10b3BcIik7XG4gICAgdGhpcy5wb3NpdGlvblJpZ2h0ID0gY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcInBhZGRpbmctcmlnaHRcIik7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1NlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vbmctc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ1NlbGVjdENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtOZ1NlbGVjdENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmdTZWxlY3RNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBa0VFLFlBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7d0JBVmhCLElBQUksWUFBWSxFQUFFO3NCQU1yQixLQUFLOytCQVFHLENBQUMsQ0FBTSxRQUFRO1FBSHZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztLQUNyQzs7Ozs7SUFJRCxVQUFVLENBQUMsR0FBUTtRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxV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