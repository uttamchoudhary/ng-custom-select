import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, forwardRef, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { fromEvent, of } from 'rxjs';
import { distinctUntilChanged, switchMap, debounceTime, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgSelectComponent = /** @class */ (function () {
    function NgSelectComponent(_eref) {
        this._eref = _eref;
        this.onChange = new EventEmitter();
        this.active = false;
        this.propagateChange = function (_) { };
        this.searchTerm = new FormControl();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    NgSelectComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        this.selectedItem = obj;
        obj && Object.keys(obj).length ? this.searchTerm.setValue(obj[this.displayKey] || obj) : null;
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.registerOnTouched = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgSelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.validate = /**
     * @return {?}
     */
    function () {
        return this.selectedItem ? null : { required: true };
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.selectedItem = this.options[0];
        setTimeout(function () {
            _this.getCaretPosition();
        });
        if (!this.displayKey && typeof this.options[0] === 'object')
            this.displayKey = Object.keys(this.options[0])[0];
        this.searchTerm.setValue(this.options[0][this.displayKey] || this.options[0]);
        this.filterOptions = Object.assign([], this.options);
        this.isDatalist ? this.initSearch() : null;
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.initSearch = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if ((!this.searchKeys || !this.searchKeys.length) && this.displayKey && typeof this.options[0] === 'object')
            this.searchKeys = [this.displayKey];
        else if (!this.displayKey || typeof this.options[0] !== 'object')
            this.searchKeys = ['0'];
        fromEvent(this.searchInput.nativeElement, 'input')
            .pipe(map(function (e) { return e.target.value; }), debounceTime(100), distinctUntilChanged(), switchMap(function (term) {
            return of(_this.options.filter(function (option) {
                for (var i = 0, len = _this.searchKeys.length; i < len; i++) {
                    if (typeof option === "object" && option[_this.searchKeys[i]].toString().toLowerCase().indexOf(term.toLowerCase()) > -1) {
                        return option;
                    }
                    else if (typeof option !== "object" && option.toString().toLowerCase().indexOf(term.toLowerCase()) > -1)
                        return option;
                }
            }));
        }))
            .subscribe(function (list) {
            _this.filterOptions = list;
        });
    };
    /**
     * @param {?} option
     * @return {?}
     */
    NgSelectComponent.prototype.changeValue = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.searchTerm.setValue(option[this.displayKey] || option);
        this.propagateChange(option);
        this.onChange.emit(option);
        this.selectedItem = option;
        this.filterOptions = this.isDatalist ? Object.assign([], this.options) : this.filterOptions;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgSelectComponent.prototype.closeDropdown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.active = false;
            this.searchTerm.setValue(this.selectedItem[this.displayKey] || this.selectedItem);
            this.filterOptions = Object.assign([], this.options);
        }
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.getCaretPosition = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var computedStyles = window.getComputedStyle(this._eref.nativeElement.querySelector('.ng-dropdown-wrapper'), null);
        //this.positionTop = computedStyles.getPropertyValue("padding-top");
        this.positionRight = computedStyles.getPropertyValue("padding-right");
    };
    NgSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-select',
                    template: "<div class=\"ng-dropdown-wrapper\" [class]=\"styleGuide?.selectBoxClass\" tabindex=\"0\" (click)=\"active=!active\" [ngClass]=\"{'active':active, 'disabled': disable}\">\n    <input type=\"text\" name=\"searchTerm\" tabindex=\"-1\" [formControl]=\"searchTerm\" [readonly]=\"!isDatalist\" #searchInput>\n    <span [class]=\"styleGuide?.caretClass\" id=\"caret\" [ngStyle]=\"{'right':positionRight}\" [ngClass]=\"{'icon':!styleGuide?.caretClass}\"></span>\n    <ul [ngClass]=\"{'ng-dropdown-menu' : true}\" [class]=\"styleGuide?.selectMenuClass\">\n        <li *ngFor=\"let option of filterOptions\" (click)=\"changeValue(option)\" [class]=\"styleGuide?.optionsClass\">\n            <span>{{option[displayKey] || option}}</span>\n        </li>\n    </ul>\n</div>",
                    styles: ["@charset \"UTF-8\";.ng-dropdown-wrapper{display:inline-block;position:relative}.ng-dropdown-wrapper input[type=text]{width:90%;border:none;outline:0;text-transform:capitalize}.ng-dropdown-wrapper #caret{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:999}.ng-dropdown-wrapper .icon::after{content:\"\u25BC\";text-align:center;pointer-events:none}.ng-dropdown-wrapper .ng-dropdown-menu{display:none;position:absolute;top:102%;left:0;right:0;list-style:none;overflow:auto;z-index:9999}.ng-dropdown-wrapper .ng-dropdown-menu li span{text-transform:capitalize;transition:all .3s ease-out}.ng-dropdown-wrapper.active #caret{-webkit-transform:translateY(-50%) rotate(180deg);transform:translateY(-50%) rotate(180deg)}.ng-dropdown-wrapper.active .ng-dropdown-menu{display:block}.disabled{cursor:not-allowed;pointer-events:none;opacity:.7;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"],
                    host: {
                        '(document:click)': 'closeDropdown($event)',
                    },
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NgSelectComponent; }),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(function () { return NgSelectComponent; }),
                            multi: true,
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    NgSelectComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
    return NgSelectComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgSelectModule = /** @class */ (function () {
    function NgSelectModule() {
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
    return NgSelectModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgSelectComponent, NgSelectModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY3VzdG9tLXNlbGVjdC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctY3VzdG9tLXNlbGVjdC9saWIvbmctc2VsZWN0LmNvbXBvbmVudC50cyIsIm5nOi8vbmctY3VzdG9tLXNlbGVjdC9saWIvbmctc2VsZWN0Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBOR19WQUxJREFUT1JTLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yLCBWYWxpZGF0aW9uRXJyb3JzLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb21FdmVudCwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHNhbXBsZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHN3aXRjaE1hcCwgZGVib3VuY2VUaW1lLCBtYXAgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1zZWxlY3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJuZy1kcm9wZG93bi13cmFwcGVyXCIgW2NsYXNzXT1cInN0eWxlR3VpZGU/LnNlbGVjdEJveENsYXNzXCIgdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImFjdGl2ZT0hYWN0aXZlXCIgW25nQ2xhc3NdPVwieydhY3RpdmUnOmFjdGl2ZSwgJ2Rpc2FibGVkJzogZGlzYWJsZX1cIj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic2VhcmNoVGVybVwiIHRhYmluZGV4PVwiLTFcIiBbZm9ybUNvbnRyb2xdPVwic2VhcmNoVGVybVwiIFtyZWFkb25seV09XCIhaXNEYXRhbGlzdFwiICNzZWFyY2hJbnB1dD5cbiAgICA8c3BhbiBbY2xhc3NdPVwic3R5bGVHdWlkZT8uY2FyZXRDbGFzc1wiIGlkPVwiY2FyZXRcIiBbbmdTdHlsZV09XCJ7J3JpZ2h0Jzpwb3NpdGlvblJpZ2h0fVwiIFtuZ0NsYXNzXT1cInsnaWNvbic6IXN0eWxlR3VpZGU/LmNhcmV0Q2xhc3N9XCI+PC9zcGFuPlxuICAgIDx1bCBbbmdDbGFzc109XCJ7J25nLWRyb3Bkb3duLW1lbnUnIDogdHJ1ZX1cIiBbY2xhc3NdPVwic3R5bGVHdWlkZT8uc2VsZWN0TWVudUNsYXNzXCI+XG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGZpbHRlck9wdGlvbnNcIiAoY2xpY2spPVwiY2hhbmdlVmFsdWUob3B0aW9uKVwiIFtjbGFzc109XCJzdHlsZUd1aWRlPy5vcHRpb25zQ2xhc3NcIj5cbiAgICAgICAgICAgIDxzcGFuPnt7b3B0aW9uW2Rpc3BsYXlLZXldIHx8IG9wdGlvbn19PC9zcGFuPlxuICAgICAgICA8L2xpPlxuICAgIDwvdWw+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgQGNoYXJzZXQgXCJVVEYtOFwiOy5uZy1kcm9wZG93bi13cmFwcGVye2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlfS5uZy1kcm9wZG93bi13cmFwcGVyIGlucHV0W3R5cGU9dGV4dF17d2lkdGg6OTAlO2JvcmRlcjpub25lO291dGxpbmU6MDt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplfS5uZy1kcm9wZG93bi13cmFwcGVyICNjYXJldHtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKTt6LWluZGV4Ojk5OX0ubmctZHJvcGRvd24td3JhcHBlciAuaWNvbjo6YWZ0ZXJ7Y29udGVudDpcIsOiwpbCvFwiO3RleHQtYWxpZ246Y2VudGVyO3BvaW50ZXItZXZlbnRzOm5vbmV9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgLm5nLWRyb3Bkb3duLW1lbnV7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDIlO2xlZnQ6MDtyaWdodDowO2xpc3Qtc3R5bGU6bm9uZTtvdmVyZmxvdzphdXRvO3otaW5kZXg6OTk5OX0ubmctZHJvcGRvd24td3JhcHBlciAubmctZHJvcGRvd24tbWVudSBsaSBzcGFue3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemU7dHJhbnNpdGlvbjphbGwgLjNzIGVhc2Utb3V0fS5uZy1kcm9wZG93bi13cmFwcGVyLmFjdGl2ZSAjY2FyZXR7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKSByb3RhdGUoMTgwZGVnKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKSByb3RhdGUoMTgwZGVnKX0ubmctZHJvcGRvd24td3JhcHBlci5hY3RpdmUgLm5nLWRyb3Bkb3duLW1lbnV7ZGlzcGxheTpibG9ja30uZGlzYWJsZWR7Y3Vyc29yOm5vdC1hbGxvd2VkO3BvaW50ZXItZXZlbnRzOm5vbmU7b3BhY2l0eTouNzstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9YF0sXG4gIGhvc3Q6IHtcbiAgICAnKGRvY3VtZW50OmNsaWNrKSc6ICdjbG9zZURyb3Bkb3duKCRldmVudCknLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcblxuICAvLyBMaXN0IG9mIG9wdGlvbnNcbiAgQElucHV0KCkgb3B0aW9uczogQXJyYXk8YW55PjtcblxuICAvL25hbWUgb2Yga2V5IHRvIGRpc3BsYXllZCBhcyBvcHRpb25zXG4gIEBJbnB1dCgpIGRpc3BsYXlLZXk6IHN0cmluZztcblxuICAvL2NvbnRhaW5zIHZhcmlvdXMgQ29uZmlnIGNsYXNzZXMgZm9yIGRyb3Bkb3duIFxuICBASW5wdXQoKSBzdHlsZUd1aWRlOiBhbnk7XG5cbiAgLy9UcnVlIGlmIERyb3Bkb3duIHNob3VsZCBiZWhhdmUgbGlrZSBhIGRhdGFsaXN0XG4gIEBJbnB1dCgpIGlzRGF0YWxpc3Q6IGJvb2xlYW47XG5cbiAgLy9UcnVlIGlmIHNlbGVjdCBib3ggaXMgZGlzYWJsZWRcbiAgQElucHV0KCkgZGlzYWJsZSA6IGJvb2xlYW47XG5cbiAgLy9MaXN0IG9mIHByb3BlcnRpZXMgZm9yIHdoaWNoIHNlYXJjaGluZyBpcyBhcHBsaWVkIGluIGxpc3RcbiAgQElucHV0KCkgc2VhcmNoS2V5czogQXJyYXk8c3RyaW5nPjtcblxuICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcpIHNlYXJjaElucHV0OiBFbGVtZW50UmVmO1xuXG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBzZWxlY3RlZEl0ZW06IGFueTtcbiAgc2VhcmNoVGVybTogRm9ybUNvbnRyb2w7XG4gIGZpbHRlck9wdGlvbnM6IEFycmF5PGFueT47XG5cbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIHBvc2l0aW9uVG9wOiBhbnk7XG4gIHBvc2l0aW9uUmlnaHQ6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lcmVmOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5zZWFyY2hUZXJtID0gbmV3IEZvcm1Db250cm9sKCk7XG4gIH1cblxuICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfVxuXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IG9iajtcbiAgICBvYmogJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPyB0aGlzLnNlYXJjaFRlcm0uc2V0VmFsdWUob2JqW3RoaXMuZGlzcGxheUtleV0gfHwgb2JqKSA6IG51bGw7XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZCgpIHsgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICB2YWxpZGF0ZSgpOiBWYWxpZGF0aW9uRXJyb3JzIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW0gPyBudWxsIDogeyByZXF1aXJlZDogdHJ1ZSB9O1xuICB9XG5cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IHRoaXMub3B0aW9uc1swXTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ2V0Q2FyZXRQb3NpdGlvbigpO1xuICAgIH0pXG5cbiAgICBpZiAoIXRoaXMuZGlzcGxheUtleSAmJiB0eXBlb2YgdGhpcy5vcHRpb25zWzBdID09PSAnb2JqZWN0JylcbiAgICAgIHRoaXMuZGlzcGxheUtleSA9IE9iamVjdC5rZXlzKHRoaXMub3B0aW9uc1swXSlbMF07XG4gICAgdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKHRoaXMub3B0aW9uc1swXVt0aGlzLmRpc3BsYXlLZXldIHx8IHRoaXMub3B0aW9uc1swXSk7XG4gICAgdGhpcy5maWx0ZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLmlzRGF0YWxpc3QgPyB0aGlzLmluaXRTZWFyY2goKSA6IG51bGw7XG4gIH1cblxuICBpbml0U2VhcmNoKCkge1xuICAgIGlmICgoIXRoaXMuc2VhcmNoS2V5cyB8fCAhdGhpcy5zZWFyY2hLZXlzLmxlbmd0aCkgJiYgdGhpcy5kaXNwbGF5S2V5ICYmIHR5cGVvZiB0aGlzLm9wdGlvbnNbMF0gPT09ICdvYmplY3QnKVxuICAgICAgdGhpcy5zZWFyY2hLZXlzID0gW3RoaXMuZGlzcGxheUtleV07XG4gICAgZWxzZSBpZiAoIXRoaXMuZGlzcGxheUtleSB8fCB0eXBlb2YgdGhpcy5vcHRpb25zWzBdICE9PSAnb2JqZWN0JylcbiAgICAgIHRoaXMuc2VhcmNoS2V5cyA9IFsnMCddO1xuXG4gICAgZnJvbUV2ZW50KHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudCwgJ2lucHV0JylcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKGU6IGFueSkgPT4gZS50YXJnZXQudmFsdWUpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMTAwKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgc3dpdGNoTWFwKHRlcm0gPT4ge1xuICAgICAgICAgIHJldHVybiBvZihcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuc2VhcmNoS2V5cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09PSBcIm9iamVjdFwiICYmIG9wdGlvblt0aGlzLnNlYXJjaEtleXNbaV1dLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRlcm0udG9Mb3dlckNhc2UoKSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb24gIT09IFwib2JqZWN0XCIgJiYgb3B0aW9uLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRlcm0udG9Mb3dlckNhc2UoKSkgPiAtMSlcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgICkpXG4gICAgICAuc3Vic2NyaWJlKGxpc3QgPT4ge1xuICAgICAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSBsaXN0O1xuICAgICAgfSk7XG4gIH1cblxuICBjaGFuZ2VWYWx1ZShvcHRpb24pIHtcbiAgICB0aGlzLnNlYXJjaFRlcm0uc2V0VmFsdWUob3B0aW9uW3RoaXMuZGlzcGxheUtleV0gfHwgb3B0aW9uKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShvcHRpb24pO1xuICAgIHRoaXMub25DaGFuZ2UuZW1pdChvcHRpb24pO1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gb3B0aW9uO1xuICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IHRoaXMuaXNEYXRhbGlzdCA/IE9iamVjdC5hc3NpZ24oW10sIHRoaXMub3B0aW9ucykgOiB0aGlzLmZpbHRlck9wdGlvbnM7XG4gIH1cblxuICBjbG9zZURyb3Bkb3duKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9lcmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2VhcmNoVGVybS5zZXRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbVt0aGlzLmRpc3BsYXlLZXldIHx8IHRoaXMuc2VsZWN0ZWRJdGVtKTtcbiAgICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMub3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q2FyZXRQb3NpdGlvbigpIHtcbiAgICBsZXQgY29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lcmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5nLWRyb3Bkb3duLXdyYXBwZXInKSwgbnVsbCk7XG4gICAgLy90aGlzLnBvc2l0aW9uVG9wID0gY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcInBhZGRpbmctdG9wXCIpO1xuICAgIHRoaXMucG9zaXRpb25SaWdodCA9IGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLXJpZ2h0XCIpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL25nLXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTmdTZWxlY3RDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTmdTZWxlY3RDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5nU2VsZWN0TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtJQWtFRSwyQkFBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTt3QkFWaEIsSUFBSSxZQUFZLEVBQUU7c0JBTXJCLEtBQUs7K0JBUUcsVUFBQyxDQUFNLEtBQVE7UUFIdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0tBQ3JDOzs7OztJQUlELHNDQUFVOzs7O0lBQVYsVUFBVyxHQUFRO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsSUFBSSxNQUFNLENB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