/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { fromEvent, of } from 'rxjs';
import { distinctUntilChanged, switchMap, debounceTime, map } from "rxjs/operators";
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
export { NgSelectComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWN1c3RvbS1zZWxlY3QvIiwic291cmNlcyI6WyJsaWIvbmctc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFxRCxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsSSxPQUFPLEVBQWMsU0FBUyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQVUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7SUErRDFGLDJCQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO3dCQVZoQixJQUFJLFlBQVksRUFBRTtzQkFNckIsS0FBSzsrQkFRRyxVQUFDLENBQU0sS0FBUTtRQUh2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7S0FDckM7Ozs7O0lBSUQsc0NBQVU7Ozs7SUFBVixVQUFXLEdBQVE7UUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDeEIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDL0Y7Ozs7SUFFRCw2Q0FBaUI7OztJQUFqQixlQUF1Qjs7Ozs7SUFFdkIsNENBQWdCOzs7O0lBQWhCLFVB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S0FBSzswQkFHTCxLQUFLOzZCQUdMLEtBQUs7OEJBRUwsU0FBUyxTQUFDLGFBQWE7MkJBRXZCLE1BQU07OzRCQXhEVDs7U0FrQ2EsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgTkdfVkFMSURBVE9SUywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciwgVmFsaWRhdGlvbkVycm9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tRXZlbnQsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzYW1wbGUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzd2l0Y2hNYXAsIGRlYm91bmNlVGltZSwgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibmctZHJvcGRvd24td3JhcHBlclwiIFtjbGFzc109XCJzdHlsZUd1aWRlPy5zZWxlY3RCb3hDbGFzc1wiIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJhY3RpdmU9IWFjdGl2ZVwiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzphY3RpdmUsICdkaXNhYmxlZCc6IGRpc2FibGV9XCI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlYXJjaFRlcm1cIiB0YWJpbmRleD1cIi0xXCIgW2Zvcm1Db250cm9sXT1cInNlYXJjaFRlcm1cIiBbcmVhZG9ubHldPVwiIWlzRGF0YWxpc3RcIiAjc2VhcmNoSW5wdXQ+XG4gICAgPHNwYW4gW2NsYXNzXT1cInN0eWxlR3VpZGU/LmNhcmV0Q2xhc3NcIiBpZD1cImNhcmV0XCIgW25nU3R5bGVdPVwieydyaWdodCc6cG9zaXRpb25SaWdodH1cIiBbbmdDbGFzc109XCJ7J2ljb24nOiFzdHlsZUd1aWRlPy5jYXJldENsYXNzfVwiPjwvc3Bhbj5cbiAgICA8dWwgW25nQ2xhc3NdPVwieyduZy1kcm9wZG93bi1tZW51JyA6IHRydWV9XCIgW2NsYXNzXT1cInN0eWxlR3VpZGU/LnNlbGVjdE1lbnVDbGFzc1wiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBmaWx0ZXJPcHRpb25zXCIgKGNsaWNrKT1cImNoYW5nZVZhbHVlKG9wdGlvbilcIiBbY2xhc3NdPVwic3R5bGVHdWlkZT8ub3B0aW9uc0NsYXNzXCI+XG4gICAgICAgICAgICA8c3Bhbj57e29wdGlvbltkaXNwbGF5S2V5XSB8fCBvcHRpb259fTwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICA8L3VsPlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYEBjaGFyc2V0IFwiVVRGLThcIjsubmctZHJvcGRvd24td3JhcHBlcntkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZX0ubmctZHJvcGRvd24td3JhcHBlciBpbnB1dFt0eXBlPXRleHRde3dpZHRoOjkwJTtib3JkZXI6bm9uZTtvdXRsaW5lOjA7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZX0ubmctZHJvcGRvd24td3JhcHBlciAjY2FyZXR7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7ei1pbmRleDo5OTl9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgLmljb246OmFmdGVye2NvbnRlbnQ6XCLilrxcIjt0ZXh0LWFsaWduOmNlbnRlcjtwb2ludGVyLWV2ZW50czpub25lfS5uZy1kcm9wZG93bi13cmFwcGVyIC5uZy1kcm9wZG93bi1tZW51e2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAyJTtsZWZ0OjA7cmlnaHQ6MDtsaXN0LXN0eWxlOm5vbmU7b3ZlcmZsb3c6YXV0bzt6LWluZGV4Ojk5OTl9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgLm5nLWRyb3Bkb3duLW1lbnUgbGkgc3Bhbnt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplO3RyYW5zaXRpb246YWxsIC4zcyBlYXNlLW91dH0ubmctZHJvcGRvd24td3JhcHBlci5hY3RpdmUgI2NhcmV0ey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDE4MGRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDE4MGRlZyl9Lm5nLWRyb3Bkb3duLXdyYXBwZXIuYWN0aXZlIC5uZy1kcm9wZG93bi1tZW51e2Rpc3BsYXk6YmxvY2t9LmRpc2FibGVke2N1cnNvcjpub3QtYWxsb3dlZDtwb2ludGVyLWV2ZW50czpub25lO29wYWNpdHk6Ljc7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfWBdLFxuICBob3N0OiB7XG4gICAgJyhkb2N1bWVudDpjbGljayknOiAnY2xvc2VEcm9wZG93bigkZXZlbnQpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1NlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1NlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XG5cbiAgLy8gTGlzdCBvZiBvcHRpb25zXG4gIEBJbnB1dCgpIG9wdGlvbnM6IEFycmF5PGFueT47XG5cbiAgLy9uYW1lIG9mIGtleSB0byBkaXNwbGF5ZWQgYXMgb3B0aW9uc1xuICBASW5wdXQoKSBkaXNwbGF5S2V5OiBzdHJpbmc7XG5cbiAgLy9jb250YWlucyB2YXJpb3VzIENvbmZpZyBjbGFzc2VzIGZvciBkcm9wZG93biBcbiAgQElucHV0KCkgc3R5bGVHdWlkZTogYW55O1xuXG4gIC8vVHJ1ZSBpZiBEcm9wZG93biBzaG91bGQgYmVoYXZlIGxpa2UgYSBkYXRhbGlzdFxuICBASW5wdXQoKSBpc0RhdGFsaXN0OiBib29sZWFuO1xuXG4gIC8vVHJ1ZSBpZiBzZWxlY3QgYm94IGlzIGRpc2FibGVkXG4gIEBJbnB1dCgpIGRpc2FibGUgOiBib29sZWFuO1xuXG4gIC8vTGlzdCBvZiBwcm9wZXJ0aWVzIGZvciB3aGljaCBzZWFyY2hpbmcgaXMgYXBwbGllZCBpbiBsaXN0XG4gIEBJbnB1dCgpIHNlYXJjaEtleXM6IEFycmF5PHN0cmluZz47XG5cbiAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnKSBzZWFyY2hJbnB1dDogRWxlbWVudFJlZjtcblxuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgc2VsZWN0ZWRJdGVtOiBhbnk7XG4gIHNlYXJjaFRlcm06IEZvcm1Db250cm9sO1xuICBmaWx0ZXJPcHRpb25zOiBBcnJheTxhbnk+O1xuXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwb3NpdGlvblRvcDogYW55O1xuICBwb3NpdGlvblJpZ2h0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZXJlZjogRWxlbWVudFJlZikge1xuICAgIHRoaXMuc2VhcmNoVGVybSA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7IH1cblxuICB3cml0ZVZhbHVlKG9iajogYW55KSB7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBvYmo7XG4gICAgb2JqICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID8gdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKG9ialt0aGlzLmRpc3BsYXlLZXldIHx8IG9iaikgOiBudWxsO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoKSB7IH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICB9XG5cbiAgdmFsaWRhdGUoKTogVmFsaWRhdGlvbkVycm9ycyB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJdGVtID8gbnVsbCA6IHsgcmVxdWlyZWQ6IHRydWUgfTtcbiAgfVxuXG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSB0aGlzLm9wdGlvbnNbMF07XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdldENhcmV0UG9zaXRpb24oKTtcbiAgICB9KVxuXG4gICAgaWYgKCF0aGlzLmRpc3BsYXlLZXkgJiYgdHlwZW9mIHRoaXMub3B0aW9uc1swXSA9PT0gJ29iamVjdCcpXG4gICAgICB0aGlzLmRpc3BsYXlLZXkgPSBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnNbMF0pWzBdO1xuICAgIHRoaXMuc2VhcmNoVGVybS5zZXRWYWx1ZSh0aGlzLm9wdGlvbnNbMF1bdGhpcy5kaXNwbGF5S2V5XSB8fCB0aGlzLm9wdGlvbnNbMF0pO1xuICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5pc0RhdGFsaXN0ID8gdGhpcy5pbml0U2VhcmNoKCkgOiBudWxsO1xuICB9XG5cbiAgaW5pdFNlYXJjaCgpIHtcbiAgICBpZiAoKCF0aGlzLnNlYXJjaEtleXMgfHwgIXRoaXMuc2VhcmNoS2V5cy5sZW5ndGgpICYmIHRoaXMuZGlzcGxheUtleSAmJiB0eXBlb2YgdGhpcy5vcHRpb25zWzBdID09PSAnb2JqZWN0JylcbiAgICAgIHRoaXMuc2VhcmNoS2V5cyA9IFt0aGlzLmRpc3BsYXlLZXldO1xuICAgIGVsc2UgaWYgKCF0aGlzLmRpc3BsYXlLZXkgfHwgdHlwZW9mIHRoaXMub3B0aW9uc1swXSAhPT0gJ29iamVjdCcpXG4gICAgICB0aGlzLnNlYXJjaEtleXMgPSBbJzAnXTtcblxuICAgIGZyb21FdmVudCh0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsICdpbnB1dCcpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChlOiBhbnkpID0+IGUudGFyZ2V0LnZhbHVlKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMCksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHN3aXRjaE1hcCh0ZXJtID0+IHtcbiAgICAgICAgICByZXR1cm4gb2YoXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLnNlYXJjaEtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25bdGhpcy5zZWFyY2hLZXlzW2ldXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXJtLnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9uICE9PSBcIm9iamVjdFwiICYmIG9wdGlvbi50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXJtLnRvTG93ZXJDYXNlKCkpID4gLTEpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICApKVxuICAgICAgLnN1YnNjcmliZShsaXN0ID0+IHtcbiAgICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0gbGlzdDtcbiAgICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlVmFsdWUob3B0aW9uKSB7XG4gICAgdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKG9wdGlvblt0aGlzLmRpc3BsYXlLZXldIHx8IG9wdGlvbik7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2Uob3B0aW9uKTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQob3B0aW9uKTtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IG9wdGlvbjtcbiAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSB0aGlzLmlzRGF0YWxpc3QgPyBPYmplY3QuYXNzaWduKFtdLCB0aGlzLm9wdGlvbnMpIDogdGhpcy5maWx0ZXJPcHRpb25zO1xuICB9XG5cbiAgY2xvc2VEcm9wZG93bihldmVudCkge1xuICAgIGlmICghdGhpcy5fZXJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLnNlYXJjaFRlcm0uc2V0VmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1bdGhpcy5kaXNwbGF5S2V5XSB8fCB0aGlzLnNlbGVjdGVkSXRlbSk7XG4gICAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGdldENhcmV0UG9zaXRpb24oKSB7XG4gICAgbGV0IGNvbXB1dGVkU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fZXJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZy1kcm9wZG93bi13cmFwcGVyJyksIG51bGwpO1xuICAgIC8vdGhpcy5wb3NpdGlvblRvcCA9IGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLXRvcFwiKTtcbiAgICB0aGlzLnBvc2l0aW9uUmlnaHQgPSBjb21wdXRlZFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy1yaWdodFwiKTtcbiAgfVxufVxuIl19