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
        //this.positionTop = computedStyles.getPropertyValue("padding-top");
        this.positionRight = computedStyles.getPropertyValue("padding-right");
    }
}
NgSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-select',
                template: `<div class="ng-dropdown-wrapper" [class]="styleGuide?.selectBoxClass" tabindex="0" (click)="active=!active" [ngClass]="{'active':active, 'disabled': disable}">
    <input type="text" name="searchTerm" tabindex="-1" [formControl]="searchTerm" [readonly]="!isDatalist" #searchInput>
    <span [class]="styleGuide?.caretClass" id="caret" [ngStyle]="{'right':positionRight}" [ngClass]="{'icon':!styleGuide?.caretClass}"></span>
    <ul [ngClass]="{'ng-dropdown-menu' : true}" [class]="styleGuide?.selectMenuClass">
        <li *ngFor="let option of filterOptions" (click)="changeValue(option)" [class]="styleGuide?.optionsClass">
            <span>{{option[displayKey] || option}}</span>
        </li>
    </ul>
</div>`,
                styles: [`@charset "UTF-8";.ng-dropdown-wrapper{display:inline-block;position:relative}.ng-dropdown-wrapper input[type=text]{width:90%;border:none;outline:0;text-transform:capitalize}.ng-dropdown-wrapper #caret{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:999}.ng-dropdown-wrapper .icon::after{content:"▼";text-align:center;pointer-events:none}.ng-dropdown-wrapper .ng-dropdown-menu{display:none;position:absolute;top:102%;left:0;right:0;list-style:none;overflow:auto;z-index:9999}.ng-dropdown-wrapper .ng-dropdown-menu li span{text-transform:capitalize;transition:all .3s ease-out}.ng-dropdown-wrapper.active #caret{-webkit-transform:translateY(-50%) rotate(180deg);transform:translateY(-50%) rotate(180deg)}.ng-dropdown-wrapper.active .ng-dropdown-menu{display:block}.disabled{cursor:not-allowed;pointer-events:none;opacity:.7;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}`],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWN1c3RvbS1zZWxlY3QvIiwic291cmNlcyI6WyJsaWIvbmctc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFxRCxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsSSxPQUFPLEVBQWMsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQVUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQStCNUYsTUFBTTs7OztJQWdDSixZQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO3dCQVZoQixJQUFJLFlBQVksRUFBRTtzQkFNckIsS0FBSzsrQkFRRyxDQUFDLENBQU0sRUFBRSxFQUFFLElBQUk7UUFIdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0tBQ3JDOzs7OztJQUlELFVBQVUsQ0FBQyxHQUFRO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQy9GOzs7O0lBRUQsaUJBQWlCLE1BQU07Ozs7O0lBRXZCLGdCQUFnQixDQUFDLEVB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b250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIE5HX1ZBTElEQVRPUlMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3IsIFZhbGlkYXRpb25FcnJvcnMsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbUV2ZW50LCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2FtcGxlLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwLCBkZWJvdW5jZVRpbWUsIG1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXNlbGVjdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm5nLWRyb3Bkb3duLXdyYXBwZXJcIiBbY2xhc3NdPVwic3R5bGVHdWlkZT8uc2VsZWN0Qm94Q2xhc3NcIiB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwiYWN0aXZlPSFhY3RpdmVcIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6YWN0aXZlLCAnZGlzYWJsZWQnOiBkaXNhYmxlfVwiPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzZWFyY2hUZXJtXCIgdGFiaW5kZXg9XCItMVwiIFtmb3JtQ29udHJvbF09XCJzZWFyY2hUZXJtXCIgW3JlYWRvbmx5XT1cIiFpc0RhdGFsaXN0XCIgI3NlYXJjaElucHV0PlxuICAgIDxzcGFuIFtjbGFzc109XCJzdHlsZUd1aWRlPy5jYXJldENsYXNzXCIgaWQ9XCJjYXJldFwiIFtuZ1N0eWxlXT1cInsncmlnaHQnOnBvc2l0aW9uUmlnaHR9XCIgW25nQ2xhc3NdPVwieydpY29uJzohc3R5bGVHdWlkZT8uY2FyZXRDbGFzc31cIj48L3NwYW4+XG4gICAgPHVsIFtuZ0NsYXNzXT1cInsnbmctZHJvcGRvd24tbWVudScgOiB0cnVlfVwiIFtjbGFzc109XCJzdHlsZUd1aWRlPy5zZWxlY3RNZW51Q2xhc3NcIj5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgZmlsdGVyT3B0aW9uc1wiIChjbGljayk9XCJjaGFuZ2VWYWx1ZShvcHRpb24pXCIgW2NsYXNzXT1cInN0eWxlR3VpZGU/Lm9wdGlvbnNDbGFzc1wiPlxuICAgICAgICAgICAgPHNwYW4+e3tvcHRpb25bZGlzcGxheUtleV0gfHwgb3B0aW9ufX08L3NwYW4+XG4gICAgICAgIDwvbGk+XG4gICAgPC91bD5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BAY2hhcnNldCBcIlVURi04XCI7Lm5nLWRyb3Bkb3duLXdyYXBwZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmV9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgaW5wdXRbdHlwZT10ZXh0XXt3aWR0aDo5MCU7Ym9yZGVyOm5vbmU7b3V0bGluZTowO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemV9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgI2NhcmV0e3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjUwJTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3otaW5kZXg6OTk5fS5uZy1kcm9wZG93bi13cmFwcGVyIC5pY29uOjphZnRlcntjb250ZW50Olwi4pa8XCI7dGV4dC1hbGlnbjpjZW50ZXI7cG9pbnRlci1ldmVudHM6bm9uZX0ubmctZHJvcGRvd24td3JhcHBlciAubmctZHJvcGRvd24tbWVudXtkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwMiU7bGVmdDowO3JpZ2h0OjA7bGlzdC1zdHlsZTpub25lO292ZXJmbG93OmF1dG87ei1pbmRleDo5OTk5fS5uZy1kcm9wZG93bi13cmFwcGVyIC5uZy1kcm9wZG93bi1tZW51IGxpIHNwYW57dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZTt0cmFuc2l0aW9uOmFsbCAuM3MgZWFzZS1vdXR9Lm5nLWRyb3Bkb3duLXdyYXBwZXIuYWN0aXZlICNjYXJldHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgxODBkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgxODBkZWcpfS5uZy1kcm9wZG93bi13cmFwcGVyLmFjdGl2ZSAubmctZHJvcGRvd24tbWVudXtkaXNwbGF5OmJsb2NrfS5kaXNhYmxlZHtjdXJzb3I6bm90LWFsbG93ZWQ7cG9pbnRlci1ldmVudHM6bm9uZTtvcGFjaXR5Oi43Oy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX1gXSxcbiAgaG9zdDoge1xuICAgICcoZG9jdW1lbnQ6Y2xpY2spJzogJ2Nsb3NlRHJvcGRvd24oJGV2ZW50KScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1NlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3Ige1xuXG4gIC8vIExpc3Qgb2Ygb3B0aW9uc1xuICBASW5wdXQoKSBvcHRpb25zOiBBcnJheTxhbnk+O1xuXG4gIC8vbmFtZSBvZiBrZXkgdG8gZGlzcGxheWVkIGFzIG9wdGlvbnNcbiAgQElucHV0KCkgZGlzcGxheUtleTogc3RyaW5nO1xuXG4gIC8vY29udGFpbnMgdmFyaW91cyBDb25maWcgY2xhc3NlcyBmb3IgZHJvcGRvd24gXG4gIEBJbnB1dCgpIHN0eWxlR3VpZGU6IGFueTtcblxuICAvL1RydWUgaWYgRHJvcGRvd24gc2hvdWxkIGJlaGF2ZSBsaWtlIGEgZGF0YWxpc3RcbiAgQElucHV0KCkgaXNEYXRhbGlzdDogYm9vbGVhbjtcblxuICAvL1RydWUgaWYgc2VsZWN0IGJveCBpcyBkaXNhYmxlZFxuICBASW5wdXQoKSBkaXNhYmxlIDogYm9vbGVhbjtcblxuICAvL0xpc3Qgb2YgcHJvcGVydGllcyBmb3Igd2hpY2ggc2VhcmNoaW5nIGlzIGFwcGxpZWQgaW4gbGlzdFxuICBASW5wdXQoKSBzZWFyY2hLZXlzOiBBcnJheTxzdHJpbmc+O1xuXG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0Jykgc2VhcmNoSW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHNlbGVjdGVkSXRlbTogYW55O1xuICBzZWFyY2hUZXJtOiBGb3JtQ29udHJvbDtcbiAgZmlsdGVyT3B0aW9uczogQXJyYXk8YW55PjtcblxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcG9zaXRpb25Ub3A6IGFueTtcbiAgcG9zaXRpb25SaWdodDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VyZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLnNlYXJjaFRlcm0gPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSkge1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gb2JqO1xuICAgIG9iaiAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA/IHRoaXMuc2VhcmNoVGVybS5zZXRWYWx1ZShvYmpbdGhpcy5kaXNwbGF5S2V5XSB8fCBvYmopIDogbnVsbDtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKCkgeyB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHZhbGlkYXRlKCk6IFZhbGlkYXRpb25FcnJvcnMge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbSA/IG51bGwgOiB7IHJlcXVpcmVkOiB0cnVlIH07XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gdGhpcy5vcHRpb25zWzBdO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5nZXRDYXJldFBvc2l0aW9uKCk7XG4gICAgfSlcblxuICAgIGlmICghdGhpcy5kaXNwbGF5S2V5ICYmIHR5cGVvZiB0aGlzLm9wdGlvbnNbMF0gPT09ICdvYmplY3QnKVxuICAgICAgdGhpcy5kaXNwbGF5S2V5ID0gT2JqZWN0LmtleXModGhpcy5vcHRpb25zWzBdKVswXTtcbiAgICB0aGlzLnNlYXJjaFRlcm0uc2V0VmFsdWUodGhpcy5vcHRpb25zWzBdW3RoaXMuZGlzcGxheUtleV0gfHwgdGhpcy5vcHRpb25zWzBdKTtcbiAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuaXNEYXRhbGlzdCA/IHRoaXMuaW5pdFNlYXJjaCgpIDogbnVsbDtcbiAgfVxuXG4gIGluaXRTZWFyY2goKSB7XG4gICAgaWYgKCghdGhpcy5zZWFyY2hLZXlzIHx8ICF0aGlzLnNlYXJjaEtleXMubGVuZ3RoKSAmJiB0aGlzLmRpc3BsYXlLZXkgJiYgdHlwZW9mIHRoaXMub3B0aW9uc1swXSA9PT0gJ29iamVjdCcpXG4gICAgICB0aGlzLnNlYXJjaEtleXMgPSBbdGhpcy5kaXNwbGF5S2V5XTtcbiAgICBlbHNlIGlmICghdGhpcy5kaXNwbGF5S2V5IHx8IHR5cGVvZiB0aGlzLm9wdGlvbnNbMF0gIT09ICdvYmplY3QnKVxuICAgICAgdGhpcy5zZWFyY2hLZXlzID0gWycwJ107XG5cbiAgICBmcm9tRXZlbnQodGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LCAnaW5wdXQnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoZTogYW55KSA9PiBlLnRhcmdldC52YWx1ZSksXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDApLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICBzd2l0Y2hNYXAodGVybSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9mKFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZpbHRlcihvcHRpb24gPT4ge1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5zZWFyY2hLZXlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09IFwib2JqZWN0XCIgJiYgb3B0aW9uW3RoaXMuc2VhcmNoS2V5c1tpXV0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGVybS50b0xvd2VyQ2FzZSgpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbiAhPT0gXCJvYmplY3RcIiAmJiBvcHRpb24udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGVybS50b0xvd2VyQ2FzZSgpKSA+IC0xKVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgKSlcbiAgICAgIC5zdWJzY3JpYmUobGlzdCA9PiB7XG4gICAgICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IGxpc3Q7XG4gICAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZVZhbHVlKG9wdGlvbikge1xuICAgIHRoaXMuc2VhcmNoVGVybS5zZXRWYWx1ZShvcHRpb25bdGhpcy5kaXNwbGF5S2V5XSB8fCBvcHRpb24pO1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKG9wdGlvbik7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KG9wdGlvbik7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBvcHRpb247XG4gICAgdGhpcy5maWx0ZXJPcHRpb25zID0gdGhpcy5pc0RhdGFsaXN0ID8gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5vcHRpb25zKSA6IHRoaXMuZmlsdGVyT3B0aW9ucztcbiAgfVxuXG4gIGNsb3NlRHJvcGRvd24oZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuX2VyZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtW3RoaXMuZGlzcGxheUtleV0gfHwgdGhpcy5zZWxlY3RlZEl0ZW0pO1xuICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5vcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBnZXRDYXJldFBvc2l0aW9uKCkge1xuICAgIGxldCBjb21wdXRlZFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX2VyZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmctZHJvcGRvd24td3JhcHBlcicpLCBudWxsKTtcbiAgICAvL3RoaXMucG9zaXRpb25Ub3AgPSBjb21wdXRlZFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy10b3BcIik7XG4gICAgdGhpcy5wb3NpdGlvblJpZ2h0ID0gY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcInBhZGRpbmctcmlnaHRcIik7XG4gIH1cbn1cbiJdfQ==