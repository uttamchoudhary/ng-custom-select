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
        obj ? this.searchTerm.setValue(obj[this.displayKey] || obj) : null;
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
        this.positionTop = computedStyles.getPropertyValue("padding-top");
        this.positionRight = computedStyles.getPropertyValue("padding-right");
    };
    NgSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-select',
                    template: "<div class=\"ng-dropdown-wrapper\" [class]=\"styleGuide?.dropdownClass\" tabindex=\"0\" (click)=\"active=!active\" [ngClass]=\"{'active':active, 'disabled': disable}\">\n    <input type=\"text\" name=\"searchTerm\" tabindex=\"-1\" [formControl]=\"searchTerm\" [readonly]=\"!isDatalist\" #searchInput>\n    <span [class]=\"styleGuide?.caretClass\" id=\"caret\" [ngStyle]=\"{'top':positionTop,'right':positionRight}\" [ngClass]=\"{'icon':!styleGuide?.caretClass}\"></span>\n    <ul [ngClass]=\"{'ng-dropdown-menu' : true}\" [class]=\"styleGuide?.dropdownMenuClass\">\n        <li *ngFor=\"let option of filterOptions\" (click)=\"changeValue(option)\" [class]=\"styleGuide?.optionsClass\">\n            <span>{{option[displayKey] || option}}</span>\n        </li>\n    </ul>\n</div>",
                    styles: ["@charset \"UTF-8\";.ng-dropdown-wrapper{display:inline-block;position:relative}.ng-dropdown-wrapper input[type=text]{width:90%;border:none;outline:0;text-transform:capitalize}.ng-dropdown-wrapper #caret{position:absolute;right:0;top:0;z-index:999}.ng-dropdown-wrapper .icon::after{content:\"\u25BC\";text-align:center;pointer-events:none}.ng-dropdown-wrapper .ng-dropdown-menu{display:none;position:absolute;top:102%;left:0;right:0;list-style:none;overflow:auto;z-index:9999}.ng-dropdown-wrapper .ng-dropdown-menu li span{text-transform:capitalize;transition:all .3s ease-out}.ng-dropdown-wrapper.active #caret{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.ng-dropdown-wrapper.active .ng-dropdown-menu{display:block}.disabled{cursor:not-allowed;pointer-events:none;opacity:.7;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXNlbGVjdC8iLCJzb3VyY2VzIjpbImxpYi9uZy1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQXFELFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xJLE9BQU8sRUFBYyxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBVSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQStEMUYsMkJBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7d0JBVmhCLElBQUksWUFBWSxFQUFFO3NCQU1yQixLQUFLOytCQVFHLFVBQUMsQ0FBTSxLQUFRO1FBSHZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztLQUNyQzs7Ozs7SUFJRCxzQ0FBVTs7OztJQUFWLFVBQVcsR0FBUTtRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUNwRTs7OztJQUVELDZDQUFpQjs7O0lBQWpCLGVBQXVCOzs7OztJQUV2Qiw0Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsRUFBTztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztLQUMzQjs7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QUFLOzZCQUdMLEtBQUs7MEJBR0wsS0FBSzs2QkFHTCxLQUFLOzhCQUVMLFNBQVMsU0FBQyxhQUFhOzJCQUV2QixNQUFNOzs0QkF4RFQ7O1NBa0NhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIE5HX1ZBTElEQVRPUlMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3IsIFZhbGlkYXRpb25FcnJvcnMsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbUV2ZW50LCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2FtcGxlLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwLCBkZWJvdW5jZVRpbWUsIG1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLXNlbGVjdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm5nLWRyb3Bkb3duLXdyYXBwZXJcIiBbY2xhc3NdPVwic3R5bGVHdWlkZT8uZHJvcGRvd25DbGFzc1wiIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJhY3RpdmU9IWFjdGl2ZVwiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzphY3RpdmUsICdkaXNhYmxlZCc6IGRpc2FibGV9XCI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlYXJjaFRlcm1cIiB0YWJpbmRleD1cIi0xXCIgW2Zvcm1Db250cm9sXT1cInNlYXJjaFRlcm1cIiBbcmVhZG9ubHldPVwiIWlzRGF0YWxpc3RcIiAjc2VhcmNoSW5wdXQ+XG4gICAgPHNwYW4gW2NsYXNzXT1cInN0eWxlR3VpZGU/LmNhcmV0Q2xhc3NcIiBpZD1cImNhcmV0XCIgW25nU3R5bGVdPVwieyd0b3AnOnBvc2l0aW9uVG9wLCdyaWdodCc6cG9zaXRpb25SaWdodH1cIiBbbmdDbGFzc109XCJ7J2ljb24nOiFzdHlsZUd1aWRlPy5jYXJldENsYXNzfVwiPjwvc3Bhbj5cbiAgICA8dWwgW25nQ2xhc3NdPVwieyduZy1kcm9wZG93bi1tZW51JyA6IHRydWV9XCIgW2NsYXNzXT1cInN0eWxlR3VpZGU/LmRyb3Bkb3duTWVudUNsYXNzXCI+XG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGZpbHRlck9wdGlvbnNcIiAoY2xpY2spPVwiY2hhbmdlVmFsdWUob3B0aW9uKVwiIFtjbGFzc109XCJzdHlsZUd1aWRlPy5vcHRpb25zQ2xhc3NcIj5cbiAgICAgICAgICAgIDxzcGFuPnt7b3B0aW9uW2Rpc3BsYXlLZXldIHx8IG9wdGlvbn19PC9zcGFuPlxuICAgICAgICA8L2xpPlxuICAgIDwvdWw+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgQGNoYXJzZXQgXCJVVEYtOFwiOy5uZy1kcm9wZG93bi13cmFwcGVye2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlfS5uZy1kcm9wZG93bi13cmFwcGVyIGlucHV0W3R5cGU9dGV4dF17d2lkdGg6OTAlO2JvcmRlcjpub25lO291dGxpbmU6MDt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplfS5uZy1kcm9wZG93bi13cmFwcGVyICNjYXJldHtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO3otaW5kZXg6OTk5fS5uZy1kcm9wZG93bi13cmFwcGVyIC5pY29uOjphZnRlcntjb250ZW50Olwi4pa8XCI7dGV4dC1hbGlnbjpjZW50ZXI7cG9pbnRlci1ldmVudHM6bm9uZX0ubmctZHJvcGRvd24td3JhcHBlciAubmctZHJvcGRvd24tbWVudXtkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwMiU7bGVmdDowO3JpZ2h0OjA7bGlzdC1zdHlsZTpub25lO292ZXJmbG93OmF1dG87ei1pbmRleDo5OTk5fS5uZy1kcm9wZG93bi13cmFwcGVyIC5uZy1kcm9wZG93bi1tZW51IGxpIHNwYW57dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZTt0cmFuc2l0aW9uOmFsbCAuM3MgZWFzZS1vdXR9Lm5nLWRyb3Bkb3duLXdyYXBwZXIuYWN0aXZlICNjYXJldHstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDE4MGRlZyl9Lm5nLWRyb3Bkb3duLXdyYXBwZXIuYWN0aXZlIC5uZy1kcm9wZG93bi1tZW51e2Rpc3BsYXk6YmxvY2t9LmRpc2FibGVke2N1cnNvcjpub3QtYWxsb3dlZDtwb2ludGVyLWV2ZW50czpub25lO29wYWNpdHk6Ljc7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfWBdLFxuICBob3N0OiB7XG4gICAgJyhkb2N1bWVudDpjbGljayknOiAnY2xvc2VEcm9wZG93bigkZXZlbnQpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1NlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1NlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XG5cbiAgLy8gTGlzdCBvZiBvcHRpb25zXG4gIEBJbnB1dCgpIG9wdGlvbnM6IEFycmF5PGFueT47XG5cbiAgLy9uYW1lIG9mIGtleSB0byBkaXNwbGF5ZWQgYXMgb3B0aW9uc1xuICBASW5wdXQoKSBkaXNwbGF5S2V5OiBzdHJpbmc7XG5cbiAgLy9jb250YWlucyB2YXJpb3VzIENvbmZpZyBjbGFzc2VzIGZvciBkcm9wZG93biBcbiAgQElucHV0KCkgc3R5bGVHdWlkZTogYW55O1xuXG4gIC8vVHJ1ZSBpZiBEcm9wZG93biBzaG91bGQgYmVoYXZlIGxpa2UgYSBkYXRhbGlzdFxuICBASW5wdXQoKSBpc0RhdGFsaXN0OiBib29sZWFuO1xuXG4gIC8vVHJ1ZSBpZiBzZWxlY3QgYm94IGlzIGRpc2FibGVkXG4gIEBJbnB1dCgpIGRpc2FibGUgOiBib29sZWFuO1xuXG4gIC8vTGlzdCBvZiBwcm9wZXJ0aWVzIGZvciB3aGljaCBzZWFyY2hpbmcgaXMgYXBwbGllZCBpbiBsaXN0XG4gIEBJbnB1dCgpIHNlYXJjaEtleXM6IEFycmF5PHN0cmluZz47XG5cbiAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnKSBzZWFyY2hJbnB1dDogRWxlbWVudFJlZjtcblxuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgc2VsZWN0ZWRJdGVtOiBhbnk7XG4gIHNlYXJjaFRlcm06IEZvcm1Db250cm9sO1xuICBmaWx0ZXJPcHRpb25zOiBBcnJheTxhbnk+O1xuXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwb3NpdGlvblRvcDogYW55O1xuICBwb3NpdGlvblJpZ2h0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZXJlZjogRWxlbWVudFJlZikge1xuICAgIHRoaXMuc2VhcmNoVGVybSA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7IH1cblxuICB3cml0ZVZhbHVlKG9iajogYW55KSB7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBvYmo7XG4gICAgb2JqID8gdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKG9ialt0aGlzLmRpc3BsYXlLZXldIHx8IG9iaikgOiBudWxsO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoKSB7IH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICB9XG5cbiAgdmFsaWRhdGUoKTogVmFsaWRhdGlvbkVycm9ycyB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJdGVtID8gbnVsbCA6IHsgcmVxdWlyZWQ6IHRydWUgfTtcbiAgfVxuXG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSB0aGlzLm9wdGlvbnNbMF07XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdldENhcmV0UG9zaXRpb24oKTtcbiAgICB9KVxuXG4gICAgaWYgKCF0aGlzLmRpc3BsYXlLZXkgJiYgdHlwZW9mIHRoaXMub3B0aW9uc1swXSA9PT0gJ29iamVjdCcpXG4gICAgICB0aGlzLmRpc3BsYXlLZXkgPSBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnNbMF0pWzBdO1xuICAgIHRoaXMuc2VhcmNoVGVybS5zZXRWYWx1ZSh0aGlzLm9wdGlvbnNbMF1bdGhpcy5kaXNwbGF5S2V5XSB8fCB0aGlzLm9wdGlvbnNbMF0pO1xuICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5pc0RhdGFsaXN0ID8gdGhpcy5pbml0U2VhcmNoKCkgOiBudWxsO1xuICB9XG5cbiAgaW5pdFNlYXJjaCgpIHtcbiAgICBpZiAoKCF0aGlzLnNlYXJjaEtleXMgfHwgIXRoaXMuc2VhcmNoS2V5cy5sZW5ndGgpICYmIHRoaXMuZGlzcGxheUtleSAmJiB0eXBlb2YgdGhpcy5vcHRpb25zWzBdID09PSAnb2JqZWN0JylcbiAgICAgIHRoaXMuc2VhcmNoS2V5cyA9IFt0aGlzLmRpc3BsYXlLZXldO1xuICAgIGVsc2UgaWYgKCF0aGlzLmRpc3BsYXlLZXkgfHwgdHlwZW9mIHRoaXMub3B0aW9uc1swXSAhPT0gJ29iamVjdCcpXG4gICAgICB0aGlzLnNlYXJjaEtleXMgPSBbJzAnXTtcblxuICAgIGZyb21FdmVudCh0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsICdpbnB1dCcpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChlOiBhbnkpID0+IGUudGFyZ2V0LnZhbHVlKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMCksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHN3aXRjaE1hcCh0ZXJtID0+IHtcbiAgICAgICAgICByZXR1cm4gb2YoXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLnNlYXJjaEtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25bdGhpcy5zZWFyY2hLZXlzW2ldXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXJtLnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9uICE9PSBcIm9iamVjdFwiICYmIG9wdGlvbi50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXJtLnRvTG93ZXJDYXNlKCkpID4gLTEpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICApKVxuICAgICAgLnN1YnNjcmliZShsaXN0ID0+IHtcbiAgICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0gbGlzdDtcbiAgICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlVmFsdWUob3B0aW9uKSB7XG4gICAgdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKG9wdGlvblt0aGlzLmRpc3BsYXlLZXldIHx8IG9wdGlvbik7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2Uob3B0aW9uKTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQob3B0aW9uKTtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IG9wdGlvbjtcbiAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSB0aGlzLmlzRGF0YWxpc3QgPyBPYmplY3QuYXNzaWduKFtdLCB0aGlzLm9wdGlvbnMpIDogdGhpcy5maWx0ZXJPcHRpb25zO1xuICB9XG5cbiAgY2xvc2VEcm9wZG93bihldmVudCkge1xuICAgIGlmICghdGhpcy5fZXJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLnNlYXJjaFRlcm0uc2V0VmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1bdGhpcy5kaXNwbGF5S2V5XSB8fCB0aGlzLnNlbGVjdGVkSXRlbSk7XG4gICAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGdldENhcmV0UG9zaXRpb24oKSB7XG4gICAgbGV0IGNvbXB1dGVkU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fZXJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZy1kcm9wZG93bi13cmFwcGVyJyksIG51bGwpO1xuICAgIHRoaXMucG9zaXRpb25Ub3AgPSBjb21wdXRlZFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy10b3BcIik7XG4gICAgdGhpcy5wb3NpdGlvblJpZ2h0ID0gY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcInBhZGRpbmctcmlnaHRcIik7XG4gIH1cbn1cbiJdfQ==