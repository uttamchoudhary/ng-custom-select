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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWN1c3RvbS1zZWxlY3QvIiwic291cmNlcyI6WyJsaWIvbmctc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFxRCxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsSSxPQUFPLEVBQWMsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQVUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQStCNUYsTUFBTTs7OztJQWdDSixZQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO3dCQVZoQixJQUFJLFlBQVksRUFBRTtzQkFNckIsS0FBSzsrQkFRRyxDQUFDLENBQU0sRUFBRSxFQUFFLElBQUk7UUFIdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0tBQ3JDOzs7OztJQUlELFVBQVUsQ0FBQyxHQUFRO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ3BFOzs7O0lBRUQsaUJBQWlCLE1BQU07Ozs7O0lBRXZCLGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7S0FDM0I7Ozs7SUFFRCxRQUFRO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDdEQ7Ozs7SUFHRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QixDQUFDLENBQUE7UUFFRixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQztZQUMxRCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUM1Qzs7OztJQUVELFVBQVU7UUFDUixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLElBQUksQ0FBQyxP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QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgTkdfVkFMSURBVE9SUywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciwgVmFsaWRhdGlvbkVycm9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tRXZlbnQsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzYW1wbGUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzd2l0Y2hNYXAsIGRlYm91bmNlVGltZSwgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibmctZHJvcGRvd24td3JhcHBlclwiIFtjbGFzc109XCJzdHlsZUd1aWRlPy5kcm9wZG93bkNsYXNzXCIgdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImFjdGl2ZT0hYWN0aXZlXCIgW25nQ2xhc3NdPVwieydhY3RpdmUnOmFjdGl2ZSwgJ2Rpc2FibGVkJzogZGlzYWJsZX1cIj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic2VhcmNoVGVybVwiIHRhYmluZGV4PVwiLTFcIiBbZm9ybUNvbnRyb2xdPVwic2VhcmNoVGVybVwiIFtyZWFkb25seV09XCIhaXNEYXRhbGlzdFwiICNzZWFyY2hJbnB1dD5cbiAgICA8c3BhbiBbY2xhc3NdPVwic3R5bGVHdWlkZT8uY2FyZXRDbGFzc1wiIGlkPVwiY2FyZXRcIiBbbmdTdHlsZV09XCJ7J3RvcCc6cG9zaXRpb25Ub3AsJ3JpZ2h0Jzpwb3NpdGlvblJpZ2h0fVwiIFtuZ0NsYXNzXT1cInsnaWNvbic6IXN0eWxlR3VpZGU/LmNhcmV0Q2xhc3N9XCI+PC9zcGFuPlxuICAgIDx1bCBbbmdDbGFzc109XCJ7J25nLWRyb3Bkb3duLW1lbnUnIDogdHJ1ZX1cIiBbY2xhc3NdPVwic3R5bGVHdWlkZT8uZHJvcGRvd25NZW51Q2xhc3NcIj5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgZmlsdGVyT3B0aW9uc1wiIChjbGljayk9XCJjaGFuZ2VWYWx1ZShvcHRpb24pXCIgW2NsYXNzXT1cInN0eWxlR3VpZGU/Lm9wdGlvbnNDbGFzc1wiPlxuICAgICAgICAgICAgPHNwYW4+e3tvcHRpb25bZGlzcGxheUtleV0gfHwgb3B0aW9ufX08L3NwYW4+XG4gICAgICAgIDwvbGk+XG4gICAgPC91bD5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BAY2hhcnNldCBcIlVURi04XCI7Lm5nLWRyb3Bkb3duLXdyYXBwZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmV9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgaW5wdXRbdHlwZT10ZXh0XXt3aWR0aDo5MCU7Ym9yZGVyOm5vbmU7b3V0bGluZTowO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemV9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgI2NhcmV0e3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjA7ei1pbmRleDo5OTl9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgLmljb246OmFmdGVye2NvbnRlbnQ6XCLilrxcIjt0ZXh0LWFsaWduOmNlbnRlcjtwb2ludGVyLWV2ZW50czpub25lfS5uZy1kcm9wZG93bi13cmFwcGVyIC5uZy1kcm9wZG93bi1tZW51e2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAyJTtsZWZ0OjA7cmlnaHQ6MDtsaXN0LXN0eWxlOm5vbmU7b3ZlcmZsb3c6YXV0bzt6LWluZGV4Ojk5OTl9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgLm5nLWRyb3Bkb3duLW1lbnUgbGkgc3Bhbnt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplO3RyYW5zaXRpb246YWxsIC4zcyBlYXNlLW91dH0ubmctZHJvcGRvd24td3JhcHBlci5hY3RpdmUgI2NhcmV0ey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKX0ubmctZHJvcGRvd24td3JhcHBlci5hY3RpdmUgLm5nLWRyb3Bkb3duLW1lbnV7ZGlzcGxheTpibG9ja30uZGlzYWJsZWR7Y3Vyc29yOm5vdC1hbGxvd2VkO3BvaW50ZXItZXZlbnRzOm5vbmU7b3BhY2l0eTouNzstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9YF0sXG4gIGhvc3Q6IHtcbiAgICAnKGRvY3VtZW50OmNsaWNrKSc6ICdjbG9zZURyb3Bkb3duKCRldmVudCknLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcblxuICAvLyBMaXN0IG9mIG9wdGlvbnNcbiAgQElucHV0KCkgb3B0aW9uczogQXJyYXk8YW55PjtcblxuICAvL25hbWUgb2Yga2V5IHRvIGRpc3BsYXllZCBhcyBvcHRpb25zXG4gIEBJbnB1dCgpIGRpc3BsYXlLZXk6IHN0cmluZztcblxuICAvL2NvbnRhaW5zIHZhcmlvdXMgQ29uZmlnIGNsYXNzZXMgZm9yIGRyb3Bkb3duIFxuICBASW5wdXQoKSBzdHlsZUd1aWRlOiBhbnk7XG5cbiAgLy9UcnVlIGlmIERyb3Bkb3duIHNob3VsZCBiZWhhdmUgbGlrZSBhIGRhdGFsaXN0XG4gIEBJbnB1dCgpIGlzRGF0YWxpc3Q6IGJvb2xlYW47XG5cbiAgLy9UcnVlIGlmIHNlbGVjdCBib3ggaXMgZGlzYWJsZWRcbiAgQElucHV0KCkgZGlzYWJsZSA6IGJvb2xlYW47XG5cbiAgLy9MaXN0IG9mIHByb3BlcnRpZXMgZm9yIHdoaWNoIHNlYXJjaGluZyBpcyBhcHBsaWVkIGluIGxpc3RcbiAgQElucHV0KCkgc2VhcmNoS2V5czogQXJyYXk8c3RyaW5nPjtcblxuICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcpIHNlYXJjaElucHV0OiBFbGVtZW50UmVmO1xuXG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBzZWxlY3RlZEl0ZW06IGFueTtcbiAgc2VhcmNoVGVybTogRm9ybUNvbnRyb2w7XG4gIGZpbHRlck9wdGlvbnM6IEFycmF5PGFueT47XG5cbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIHBvc2l0aW9uVG9wOiBhbnk7XG4gIHBvc2l0aW9uUmlnaHQ6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lcmVmOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5zZWFyY2hUZXJtID0gbmV3IEZvcm1Db250cm9sKCk7XG4gIH1cblxuICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfVxuXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IG9iajtcbiAgICBvYmogPyB0aGlzLnNlYXJjaFRlcm0uc2V0VmFsdWUob2JqW3RoaXMuZGlzcGxheUtleV0gfHwgb2JqKSA6IG51bGw7XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZCgpIHsgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICB2YWxpZGF0ZSgpOiBWYWxpZGF0aW9uRXJyb3JzIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW0gPyBudWxsIDogeyByZXF1aXJlZDogdHJ1ZSB9O1xuICB9XG5cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IHRoaXMub3B0aW9uc1swXTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ2V0Q2FyZXRQb3NpdGlvbigpO1xuICAgIH0pXG5cbiAgICBpZiAoIXRoaXMuZGlzcGxheUtleSAmJiB0eXBlb2YgdGhpcy5vcHRpb25zWzBdID09PSAnb2JqZWN0JylcbiAgICAgIHRoaXMuZGlzcGxheUtleSA9IE9iamVjdC5rZXlzKHRoaXMub3B0aW9uc1swXSlbMF07XG4gICAgdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKHRoaXMub3B0aW9uc1swXVt0aGlzLmRpc3BsYXlLZXldIHx8IHRoaXMub3B0aW9uc1swXSk7XG4gICAgdGhpcy5maWx0ZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLmlzRGF0YWxpc3QgPyB0aGlzLmluaXRTZWFyY2goKSA6IG51bGw7XG4gIH1cblxuICBpbml0U2VhcmNoKCkge1xuICAgIGlmICgoIXRoaXMuc2VhcmNoS2V5cyB8fCAhdGhpcy5zZWFyY2hLZXlzLmxlbmd0aCkgJiYgdGhpcy5kaXNwbGF5S2V5ICYmIHR5cGVvZiB0aGlzLm9wdGlvbnNbMF0gPT09ICdvYmplY3QnKVxuICAgICAgdGhpcy5zZWFyY2hLZXlzID0gW3RoaXMuZGlzcGxheUtleV07XG4gICAgZWxzZSBpZiAoIXRoaXMuZGlzcGxheUtleSB8fCB0eXBlb2YgdGhpcy5vcHRpb25zWzBdICE9PSAnb2JqZWN0JylcbiAgICAgIHRoaXMuc2VhcmNoS2V5cyA9IFsnMCddO1xuXG4gICAgZnJvbUV2ZW50KHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudCwgJ2lucHV0JylcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKGU6IGFueSkgPT4gZS50YXJnZXQudmFsdWUpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMTAwKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgc3dpdGNoTWFwKHRlcm0gPT4ge1xuICAgICAgICAgIHJldHVybiBvZihcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuc2VhcmNoS2V5cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09PSBcIm9iamVjdFwiICYmIG9wdGlvblt0aGlzLnNlYXJjaEtleXNbaV1dLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRlcm0udG9Mb3dlckNhc2UoKSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb24gIT09IFwib2JqZWN0XCIgJiYgb3B0aW9uLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRlcm0udG9Mb3dlckNhc2UoKSkgPiAtMSlcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgICkpXG4gICAgICAuc3Vic2NyaWJlKGxpc3QgPT4ge1xuICAgICAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSBsaXN0O1xuICAgICAgfSk7XG4gIH1cblxuICBjaGFuZ2VWYWx1ZShvcHRpb24pIHtcbiAgICB0aGlzLnNlYXJjaFRlcm0uc2V0VmFsdWUob3B0aW9uW3RoaXMuZGlzcGxheUtleV0gfHwgb3B0aW9uKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShvcHRpb24pO1xuICAgIHRoaXMub25DaGFuZ2UuZW1pdChvcHRpb24pO1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gb3B0aW9uO1xuICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IHRoaXMuaXNEYXRhbGlzdCA/IE9iamVjdC5hc3NpZ24oW10sIHRoaXMub3B0aW9ucykgOiB0aGlzLmZpbHRlck9wdGlvbnM7XG4gIH1cblxuICBjbG9zZURyb3Bkb3duKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9lcmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2VhcmNoVGVybS5zZXRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbVt0aGlzLmRpc3BsYXlLZXldIHx8IHRoaXMuc2VsZWN0ZWRJdGVtKTtcbiAgICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMub3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q2FyZXRQb3NpdGlvbigpIHtcbiAgICBsZXQgY29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lcmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5nLWRyb3Bkb3duLXdyYXBwZXInKSwgbnVsbCk7XG4gICAgdGhpcy5wb3NpdGlvblRvcCA9IGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLXRvcFwiKTtcbiAgICB0aGlzLnBvc2l0aW9uUmlnaHQgPSBjb21wdXRlZFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy1yaWdodFwiKTtcbiAgfVxufVxuIl19