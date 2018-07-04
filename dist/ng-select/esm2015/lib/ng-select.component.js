/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { fromEvent, of } from 'rxjs';
import { distinctUntilChanged, switchMap, debounceTime, map } from "rxjs/operators";
export class NgSelectComponent {
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
        obj ? this.searchTerm.setValue(obj[this.displayKey] || obj) : null;
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
                template: `<div class="ng-dropdown-wrapper" [class]="styleGuide?.dropdownClass" tabindex="0" (click)="active=!active" [ngClass]="{'active':active, 'disabled': disable}">
    <input type="text" name="searchTerm" tabindex="-1" [formControl]="searchTerm" [readonly]="!isDatalist" #searchInput>
    <span [class]="styleGuide?.caretClass" id="caret" [ngStyle]="{'top':positionTop,'right':positionRight}" [ngClass]="{'icon':!styleGuide?.caretClass}"></span>
    <ul [ngClass]="{'ng-dropdown-menu' : true}" [class]="styleGuide?.dropdownMenuClass">
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
if (false) {
    /** @type {?} */
    NgSelectComponent.prototype.options;
    /** @type {?} */
    NgSelectComponent.prototype.displayKey;
    /** @type {?} */
    NgSelectComponent.prototype.styleGuide;
    /** @type {?} */
    NgSelectComponent.prototype.isDatalist;
    /** @type {?} */
    NgSelectComponent.prototype.disable;
    /** @type {?} */
    NgSelectComponent.prototype.searchKeys;
    /** @type {?} */
    NgSelectComponent.prototype.searchInput;
    /** @type {?} */
    NgSelectComponent.prototype.onChange;
    /** @type {?} */
    NgSelectComponent.prototype.selectedItem;
    /** @type {?} */
    NgSelectComponent.prototype.searchTerm;
    /** @type {?} */
    NgSelectComponent.prototype.filterOptions;
    /** @type {?} */
    NgSelectComponent.prototype.active;
    /** @type {?} */
    NgSelectComponent.prototype.positionTop;
    /** @type {?} */
    NgSelectComponent.prototype.positionRight;
    /** @type {?} */
    NgSelectComponent.prototype.propagateChange;
    /** @type {?} */
    NgSelectComponent.prototype._eref;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXNlbGVjdC8iLCJzb3VyY2VzIjpbImxpYi9uZy1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQXFELFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xJLE9BQU8sRUFBYyxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBVSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBK0I1RixNQUFNOzs7O0lBZ0NKLFlBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7d0JBVmhCLElBQUksWUFBWSxFQUFFO3NCQU1yQixLQUFLOytCQVFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsSUFBSTtRQUh2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7S0FDckM7Ozs7O0lBSUQsVUFBVSxDQUFDLEdBQVE7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDcEU7Ozs7SUFFRCxpQkFBaUIsTUFBTTs7Ozs7SUFFdkIsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztLQUMzQjs7OztJQUVE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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBOR19WQUxJREFUT1JTLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yLCBWYWxpZGF0aW9uRXJyb3JzLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb21FdmVudCwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHNhbXBsZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHN3aXRjaE1hcCwgZGVib3VuY2VUaW1lLCBtYXAgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1zZWxlY3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJuZy1kcm9wZG93bi13cmFwcGVyXCIgW2NsYXNzXT1cInN0eWxlR3VpZGU/LmRyb3Bkb3duQ2xhc3NcIiB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwiYWN0aXZlPSFhY3RpdmVcIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6YWN0aXZlLCAnZGlzYWJsZWQnOiBkaXNhYmxlfVwiPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzZWFyY2hUZXJtXCIgdGFiaW5kZXg9XCItMVwiIFtmb3JtQ29udHJvbF09XCJzZWFyY2hUZXJtXCIgW3JlYWRvbmx5XT1cIiFpc0RhdGFsaXN0XCIgI3NlYXJjaElucHV0PlxuICAgIDxzcGFuIFtjbGFzc109XCJzdHlsZUd1aWRlPy5jYXJldENsYXNzXCIgaWQ9XCJjYXJldFwiIFtuZ1N0eWxlXT1cInsndG9wJzpwb3NpdGlvblRvcCwncmlnaHQnOnBvc2l0aW9uUmlnaHR9XCIgW25nQ2xhc3NdPVwieydpY29uJzohc3R5bGVHdWlkZT8uY2FyZXRDbGFzc31cIj48L3NwYW4+XG4gICAgPHVsIFtuZ0NsYXNzXT1cInsnbmctZHJvcGRvd24tbWVudScgOiB0cnVlfVwiIFtjbGFzc109XCJzdHlsZUd1aWRlPy5kcm9wZG93bk1lbnVDbGFzc1wiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBmaWx0ZXJPcHRpb25zXCIgKGNsaWNrKT1cImNoYW5nZVZhbHVlKG9wdGlvbilcIiBbY2xhc3NdPVwic3R5bGVHdWlkZT8ub3B0aW9uc0NsYXNzXCI+XG4gICAgICAgICAgICA8c3Bhbj57e29wdGlvbltkaXNwbGF5S2V5XSB8fCBvcHRpb259fTwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICA8L3VsPlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYEBjaGFyc2V0IFwiVVRGLThcIjsubmctZHJvcGRvd24td3JhcHBlcntkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZX0ubmctZHJvcGRvd24td3JhcHBlciBpbnB1dFt0eXBlPXRleHRde3dpZHRoOjkwJTtib3JkZXI6bm9uZTtvdXRsaW5lOjA7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZX0ubmctZHJvcGRvd24td3JhcHBlciAjY2FyZXR7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6MDt6LWluZGV4Ojk5OX0ubmctZHJvcGRvd24td3JhcHBlciAuaWNvbjo6YWZ0ZXJ7Y29udGVudDpcIuKWvFwiO3RleHQtYWxpZ246Y2VudGVyO3BvaW50ZXItZXZlbnRzOm5vbmV9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgLm5nLWRyb3Bkb3duLW1lbnV7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDIlO2xlZnQ6MDtyaWdodDowO2xpc3Qtc3R5bGU6bm9uZTtvdmVyZmxvdzphdXRvO3otaW5kZXg6OTk5OX0ubmctZHJvcGRvd24td3JhcHBlciAubmctZHJvcGRvd24tbWVudSBsaSBzcGFue3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemU7dHJhbnNpdGlvbjphbGwgLjNzIGVhc2Utb3V0fS5uZy1kcm9wZG93bi13cmFwcGVyLmFjdGl2ZSAjY2FyZXR7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDE4MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpfS5uZy1kcm9wZG93bi13cmFwcGVyLmFjdGl2ZSAubmctZHJvcGRvd24tbWVudXtkaXNwbGF5OmJsb2NrfS5kaXNhYmxlZHtjdXJzb3I6bm90LWFsbG93ZWQ7cG9pbnRlci1ldmVudHM6bm9uZTtvcGFjaXR5Oi43Oy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX1gXSxcbiAgaG9zdDoge1xuICAgICcoZG9jdW1lbnQ6Y2xpY2spJzogJ2Nsb3NlRHJvcGRvd24oJGV2ZW50KScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1NlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3Ige1xuXG4gIC8vIExpc3Qgb2Ygb3B0aW9uc1xuICBASW5wdXQoKSBvcHRpb25zOiBBcnJheTxhbnk+O1xuXG4gIC8vbmFtZSBvZiBrZXkgdG8gZGlzcGxheWVkIGFzIG9wdGlvbnNcbiAgQElucHV0KCkgZGlzcGxheUtleTogc3RyaW5nO1xuXG4gIC8vY29udGFpbnMgdmFyaW91cyBDb25maWcgY2xhc3NlcyBmb3IgZHJvcGRvd24gXG4gIEBJbnB1dCgpIHN0eWxlR3VpZGU6IGFueTtcblxuICAvL1RydWUgaWYgRHJvcGRvd24gc2hvdWxkIGJlaGF2ZSBsaWtlIGEgZGF0YWxpc3RcbiAgQElucHV0KCkgaXNEYXRhbGlzdDogYm9vbGVhbjtcblxuICAvL1RydWUgaWYgc2VsZWN0IGJveCBpcyBkaXNhYmxlZFxuICBASW5wdXQoKSBkaXNhYmxlIDogYm9vbGVhbjtcblxuICAvL0xpc3Qgb2YgcHJvcGVydGllcyBmb3Igd2hpY2ggc2VhcmNoaW5nIGlzIGFwcGxpZWQgaW4gbGlzdFxuICBASW5wdXQoKSBzZWFyY2hLZXlzOiBBcnJheTxzdHJpbmc+O1xuXG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0Jykgc2VhcmNoSW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHNlbGVjdGVkSXRlbTogYW55O1xuICBzZWFyY2hUZXJtOiBGb3JtQ29udHJvbDtcbiAgZmlsdGVyT3B0aW9uczogQXJyYXk8YW55PjtcblxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcG9zaXRpb25Ub3A6IGFueTtcbiAgcG9zaXRpb25SaWdodDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VyZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLnNlYXJjaFRlcm0gPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSkge1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gb2JqO1xuICAgIG9iaiA/IHRoaXMuc2VhcmNoVGVybS5zZXRWYWx1ZShvYmpbdGhpcy5kaXNwbGF5S2V5XSB8fCBvYmopIDogbnVsbDtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKCkgeyB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHZhbGlkYXRlKCk6IFZhbGlkYXRpb25FcnJvcnMge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbSA/IG51bGwgOiB7IHJlcXVpcmVkOiB0cnVlIH07XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gdGhpcy5vcHRpb25zWzBdO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5nZXRDYXJldFBvc2l0aW9uKCk7XG4gICAgfSlcblxuICAgIGlmICghdGhpcy5kaXNwbGF5S2V5ICYmIHR5cGVvZiB0aGlzLm9wdGlvbnNbMF0gPT09ICdvYmplY3QnKVxuICAgICAgdGhpcy5kaXNwbGF5S2V5ID0gT2JqZWN0LmtleXModGhpcy5vcHRpb25zWzBdKVswXTtcbiAgICB0aGlzLnNlYXJjaFRlcm0uc2V0VmFsdWUodGhpcy5vcHRpb25zWzBdW3RoaXMuZGlzcGxheUtleV0gfHwgdGhpcy5vcHRpb25zWzBdKTtcbiAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuaXNEYXRhbGlzdCA/IHRoaXMuaW5pdFNlYXJjaCgpIDogbnVsbDtcbiAgfVxuXG4gIGluaXRTZWFyY2goKSB7XG4gICAgaWYgKCghdGhpcy5zZWFyY2hLZXlzIHx8ICF0aGlzLnNlYXJjaEtleXMubGVuZ3RoKSAmJiB0aGlzLmRpc3BsYXlLZXkgJiYgdHlwZW9mIHRoaXMub3B0aW9uc1swXSA9PT0gJ29iamVjdCcpXG4gICAgICB0aGlzLnNlYXJjaEtleXMgPSBbdGhpcy5kaXNwbGF5S2V5XTtcbiAgICBlbHNlIGlmICghdGhpcy5kaXNwbGF5S2V5IHx8IHR5cGVvZiB0aGlzLm9wdGlvbnNbMF0gIT09ICdvYmplY3QnKVxuICAgICAgdGhpcy5zZWFyY2hLZXlzID0gWycwJ107XG5cbiAgICBmcm9tRXZlbnQodGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LCAnaW5wdXQnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoZTogYW55KSA9PiBlLnRhcmdldC52YWx1ZSksXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDApLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICBzd2l0Y2hNYXAodGVybSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9mKFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZpbHRlcihvcHRpb24gPT4ge1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5zZWFyY2hLZXlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09IFwib2JqZWN0XCIgJiYgb3B0aW9uW3RoaXMuc2VhcmNoS2V5c1tpXV0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGVybS50b0xvd2VyQ2FzZSgpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbiAhPT0gXCJvYmplY3RcIiAmJiBvcHRpb24udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGVybS50b0xvd2VyQ2FzZSgpKSA+IC0xKVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgKSlcbiAgICAgIC5zdWJzY3JpYmUobGlzdCA9PiB7XG4gICAgICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IGxpc3Q7XG4gICAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZVZhbHVlKG9wdGlvbikge1xuICAgIHRoaXMuc2VhcmNoVGVybS5zZXRWYWx1ZShvcHRpb25bdGhpcy5kaXNwbGF5S2V5XSB8fCBvcHRpb24pO1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKG9wdGlvbik7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KG9wdGlvbik7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBvcHRpb247XG4gICAgdGhpcy5maWx0ZXJPcHRpb25zID0gdGhpcy5pc0RhdGFsaXN0ID8gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5vcHRpb25zKSA6IHRoaXMuZmlsdGVyT3B0aW9ucztcbiAgfVxuXG4gIGNsb3NlRHJvcGRvd24oZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuX2VyZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtW3RoaXMuZGlzcGxheUtleV0gfHwgdGhpcy5zZWxlY3RlZEl0ZW0pO1xuICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5vcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBnZXRDYXJldFBvc2l0aW9uKCkge1xuICAgIGxldCBjb21wdXRlZFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX2VyZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmctZHJvcGRvd24td3JhcHBlcicpLCBudWxsKTtcbiAgICB0aGlzLnBvc2l0aW9uVG9wID0gY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcInBhZGRpbmctdG9wXCIpO1xuICAgIHRoaXMucG9zaXRpb25SaWdodCA9IGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLXJpZ2h0XCIpO1xuICB9XG59XG4iXX0=