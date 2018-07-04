(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-custom-select', ['exports', '@angular/core', '@angular/forms', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (factory((global['ng-custom-select'] = {}),global.ng.core,global.ng.forms,global.rxjs,global.rxjs.operators,global.ng.common));
}(this, (function (exports,core,forms,rxjs,operators,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgSelectComponent = (function () {
        function NgSelectComponent(_eref) {
            this._eref = _eref;
            this.onChange = new core.EventEmitter();
            this.active = false;
            this.propagateChange = function (_) { };
            this.searchTerm = new forms.FormControl();
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
                rxjs.fromEvent(this.searchInput.nativeElement, 'input')
                    .pipe(operators.map(function (e) { return e.target.value; }), operators.debounceTime(100), operators.distinctUntilChanged(), operators.switchMap(function (term) {
                    return rxjs.of(_this.options.filter(function (option) {
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
            { type: core.Component, args: [{
                        selector: 'ng-select',
                        template: "<div class=\"ng-dropdown-wrapper\" [class]=\"styleGuide?.dropdownClass\" tabindex=\"0\" (click)=\"active=!active\" [ngClass]=\"{'active':active, 'disabled': disable}\">\n    <input type=\"text\" name=\"searchTerm\" tabindex=\"-1\" [formControl]=\"searchTerm\" [readonly]=\"!isDatalist\" #searchInput>\n    <span [class]=\"styleGuide?.caretClass\" id=\"caret\" [ngStyle]=\"{'top':positionTop,'right':positionRight}\" [ngClass]=\"{'icon':!styleGuide?.caretClass}\"></span>\n    <ul [ngClass]=\"{'ng-dropdown-menu' : true}\" [class]=\"styleGuide?.dropdownMenuClass\">\n        <li *ngFor=\"let option of filterOptions\" (click)=\"changeValue(option)\" [class]=\"styleGuide?.optionsClass\">\n            <span>{{option[displayKey] || option}}</span>\n        </li>\n    </ul>\n</div>",
                        styles: ["@charset \"UTF-8\";.ng-dropdown-wrapper{display:inline-block;position:relative}.ng-dropdown-wrapper input[type=text]{width:90%;border:none;outline:0;text-transform:capitalize}.ng-dropdown-wrapper #caret{position:absolute;right:0;top:0;z-index:999}.ng-dropdown-wrapper .icon::after{content:\"\u25BC\";text-align:center;pointer-events:none}.ng-dropdown-wrapper .ng-dropdown-menu{display:none;position:absolute;top:102%;left:0;right:0;list-style:none;overflow:auto;z-index:9999}.ng-dropdown-wrapper .ng-dropdown-menu li span{text-transform:capitalize;transition:all .3s ease-out}.ng-dropdown-wrapper.active #caret{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.ng-dropdown-wrapper.active .ng-dropdown-menu{display:block}.disabled{cursor:not-allowed;pointer-events:none;opacity:.7;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"],
                        host: {
                            '(document:click)': 'closeDropdown($event)',
                        },
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(function () { return NgSelectComponent; }),
                                multi: true
                            },
                            {
                                provide: forms.NG_VALIDATORS,
                                useExisting: core.forwardRef(function () { return NgSelectComponent; }),
                                multi: true,
                            }
                        ]
                    },] },
        ];
        /** @nocollapse */
        NgSelectComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        NgSelectComponent.propDecorators = {
            options: [{ type: core.Input }],
            displayKey: [{ type: core.Input }],
            styleGuide: [{ type: core.Input }],
            isDatalist: [{ type: core.Input }],
            disable: [{ type: core.Input }],
            searchKeys: [{ type: core.Input }],
            searchInput: [{ type: core.ViewChild, args: ['searchInput',] }],
            onChange: [{ type: core.Output }]
        };
        return NgSelectComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgSelectModule = (function () {
        function NgSelectModule() {
        }
        NgSelectModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule
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

    exports.NgSelectComponent = NgSelectComponent;
    exports.NgSelectModule = NgSelectModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY3VzdG9tLXNlbGVjdC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLWN1c3RvbS1zZWxlY3QvbGliL25nLXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL25nLWN1c3RvbS1zZWxlY3QvbGliL25nLXNlbGVjdC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgTkdfVkFMSURBVE9SUywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciwgVmFsaWRhdGlvbkVycm9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tRXZlbnQsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzYW1wbGUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzd2l0Y2hNYXAsIGRlYm91bmNlVGltZSwgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibmctZHJvcGRvd24td3JhcHBlclwiIFtjbGFzc109XCJzdHlsZUd1aWRlPy5kcm9wZG93bkNsYXNzXCIgdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImFjdGl2ZT0hYWN0aXZlXCIgW25nQ2xhc3NdPVwieydhY3RpdmUnOmFjdGl2ZSwgJ2Rpc2FibGVkJzogZGlzYWJsZX1cIj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic2VhcmNoVGVybVwiIHRhYmluZGV4PVwiLTFcIiBbZm9ybUNvbnRyb2xdPVwic2VhcmNoVGVybVwiIFtyZWFkb25seV09XCIhaXNEYXRhbGlzdFwiICNzZWFyY2hJbnB1dD5cbiAgICA8c3BhbiBbY2xhc3NdPVwic3R5bGVHdWlkZT8uY2FyZXRDbGFzc1wiIGlkPVwiY2FyZXRcIiBbbmdTdHlsZV09XCJ7J3RvcCc6cG9zaXRpb25Ub3AsJ3JpZ2h0Jzpwb3NpdGlvblJpZ2h0fVwiIFtuZ0NsYXNzXT1cInsnaWNvbic6IXN0eWxlR3VpZGU/LmNhcmV0Q2xhc3N9XCI+PC9zcGFuPlxuICAgIDx1bCBbbmdDbGFzc109XCJ7J25nLWRyb3Bkb3duLW1lbnUnIDogdHJ1ZX1cIiBbY2xhc3NdPVwic3R5bGVHdWlkZT8uZHJvcGRvd25NZW51Q2xhc3NcIj5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgZmlsdGVyT3B0aW9uc1wiIChjbGljayk9XCJjaGFuZ2VWYWx1ZShvcHRpb24pXCIgW2NsYXNzXT1cInN0eWxlR3VpZGU/Lm9wdGlvbnNDbGFzc1wiPlxuICAgICAgICAgICAgPHNwYW4+e3tvcHRpb25bZGlzcGxheUtleV0gfHwgb3B0aW9ufX08L3NwYW4+XG4gICAgICAgIDwvbGk+XG4gICAgPC91bD5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2BAY2hhcnNldCBcIlVURi04XCI7Lm5nLWRyb3Bkb3duLXdyYXBwZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmV9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgaW5wdXRbdHlwZT10ZXh0XXt3aWR0aDo5MCU7Ym9yZGVyOm5vbmU7b3V0bGluZTowO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemV9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgI2NhcmV0e3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7dG9wOjA7ei1pbmRleDo5OTl9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgLmljb246OmFmdGVye2NvbnRlbnQ6XCLDosKWwrxcIjt0ZXh0LWFsaWduOmNlbnRlcjtwb2ludGVyLWV2ZW50czpub25lfS5uZy1kcm9wZG93bi13cmFwcGVyIC5uZy1kcm9wZG93bi1tZW51e2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAyJTtsZWZ0OjA7cmlnaHQ6MDtsaXN0LXN0eWxlOm5vbmU7b3ZlcmZsb3c6YXV0bzt6LWluZGV4Ojk5OTl9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgLm5nLWRyb3Bkb3duLW1lbnUgbGkgc3Bhbnt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplO3RyYW5zaXRpb246YWxsIC4zcyBlYXNlLW91dH0ubmctZHJvcGRvd24td3JhcHBlci5hY3RpdmUgI2NhcmV0ey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKX0ubmctZHJvcGRvd24td3JhcHBlci5hY3RpdmUgLm5nLWRyb3Bkb3duLW1lbnV7ZGlzcGxheTpibG9ja30uZGlzYWJsZWR7Y3Vyc29yOm5vdC1hbGxvd2VkO3BvaW50ZXItZXZlbnRzOm5vbmU7b3BhY2l0eTouNzstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9YF0sXG4gIGhvc3Q6IHtcbiAgICAnKGRvY3VtZW50OmNsaWNrKSc6ICdjbG9zZURyb3Bkb3duKCRldmVudCknLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcblxuICAvLyBMaXN0IG9mIG9wdGlvbnNcbiAgQElucHV0KCkgb3B0aW9uczogQXJyYXk8YW55PjtcblxuICAvL25hbWUgb2Yga2V5IHRvIGRpc3BsYXllZCBhcyBvcHRpb25zXG4gIEBJbnB1dCgpIGRpc3BsYXlLZXk6IHN0cmluZztcblxuICAvL2NvbnRhaW5zIHZhcmlvdXMgQ29uZmlnIGNsYXNzZXMgZm9yIGRyb3Bkb3duIFxuICBASW5wdXQoKSBzdHlsZUd1aWRlOiBhbnk7XG5cbiAgLy9UcnVlIGlmIERyb3Bkb3duIHNob3VsZCBiZWhhdmUgbGlrZSBhIGRhdGFsaXN0XG4gIEBJbnB1dCgpIGlzRGF0YWxpc3Q6IGJvb2xlYW47XG5cbiAgLy9UcnVlIGlmIHNlbGVjdCBib3ggaXMgZGlzYWJsZWRcbiAgQElucHV0KCkgZGlzYWJsZSA6IGJvb2xlYW47XG5cbiAgLy9MaXN0IG9mIHByb3BlcnRpZXMgZm9yIHdoaWNoIHNlYXJjaGluZyBpcyBhcHBsaWVkIGluIGxpc3RcbiAgQElucHV0KCkgc2VhcmNoS2V5czogQXJyYXk8c3RyaW5nPjtcblxuICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcpIHNlYXJjaElucHV0OiBFbGVtZW50UmVmO1xuXG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBzZWxlY3RlZEl0ZW06IGFueTtcbiAgc2VhcmNoVGVybTogRm9ybUNvbnRyb2w7XG4gIGZpbHRlck9wdGlvbnM6IEFycmF5PGFueT47XG5cbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIHBvc2l0aW9uVG9wOiBhbnk7XG4gIHBvc2l0aW9uUmlnaHQ6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lcmVmOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5zZWFyY2hUZXJtID0gbmV3IEZvcm1Db250cm9sKCk7XG4gIH1cblxuICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfVxuXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IG9iajtcbiAgICBvYmogPyB0aGlzLnNlYXJjaFRlcm0uc2V0VmFsdWUob2JqW3RoaXMuZGlzcGxheUtleV0gfHwgb2JqKSA6IG51bGw7XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZCgpIHsgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICB2YWxpZGF0ZSgpOiBWYWxpZGF0aW9uRXJyb3JzIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW0gPyBudWxsIDogeyByZXF1aXJlZDogdHJ1ZSB9O1xuICB9XG5cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IHRoaXMub3B0aW9uc1swXTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ2V0Q2FyZXRQb3NpdGlvbigpO1xuICAgIH0pXG5cbiAgICBpZiAoIXRoaXMuZGlzcGxheUtleSAmJiB0eXBlb2YgdGhpcy5vcHRpb25zWzBdID09PSAnb2JqZWN0JylcbiAgICAgIHRoaXMuZGlzcGxheUtleSA9IE9iamVjdC5rZXlzKHRoaXMub3B0aW9uc1swXSlbMF07XG4gICAgdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKHRoaXMub3B0aW9uc1swXVt0aGlzLmRpc3BsYXlLZXldIHx8IHRoaXMub3B0aW9uc1swXSk7XG4gICAgdGhpcy5maWx0ZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLmlzRGF0YWxpc3QgPyB0aGlzLmluaXRTZWFyY2goKSA6IG51bGw7XG4gIH1cblxuICBpbml0U2VhcmNoKCkge1xuICAgIGlmICgoIXRoaXMuc2VhcmNoS2V5cyB8fCAhdGhpcy5zZWFyY2hLZXlzLmxlbmd0aCkgJiYgdGhpcy5kaXNwbGF5S2V5ICYmIHR5cGVvZiB0aGlzLm9wdGlvbnNbMF0gPT09ICdvYmplY3QnKVxuICAgICAgdGhpcy5zZWFyY2hLZXlzID0gW3RoaXMuZGlzcGxheUtleV07XG4gICAgZWxzZSBpZiAoIXRoaXMuZGlzcGxheUtleSB8fCB0eXBlb2YgdGhpcy5vcHRpb25zWzBdICE9PSAnb2JqZWN0JylcbiAgICAgIHRoaXMuc2VhcmNoS2V5cyA9IFsnMCddO1xuXG4gICAgZnJvbUV2ZW50KHRoaXMuc2VhcmNoSW5wdXQubmF0aXZlRWxlbWVudCwgJ2lucHV0JylcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKGU6IGFueSkgPT4gZS50YXJnZXQudmFsdWUpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMTAwKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgc3dpdGNoTWFwKHRlcm0gPT4ge1xuICAgICAgICAgIHJldHVybiBvZihcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuc2VhcmNoS2V5cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09PSBcIm9iamVjdFwiICYmIG9wdGlvblt0aGlzLnNlYXJjaEtleXNbaV1dLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRlcm0udG9Mb3dlckNhc2UoKSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb24gIT09IFwib2JqZWN0XCIgJiYgb3B0aW9uLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRlcm0udG9Mb3dlckNhc2UoKSkgPiAtMSlcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgICkpXG4gICAgICAuc3Vic2NyaWJlKGxpc3QgPT4ge1xuICAgICAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSBsaXN0O1xuICAgICAgfSk7XG4gIH1cblxuICBjaGFuZ2VWYWx1ZShvcHRpb24pIHtcbiAgICB0aGlzLnNlYXJjaFRlcm0uc2V0VmFsdWUob3B0aW9uW3RoaXMuZGlzcGxheUtleV0gfHwgb3B0aW9uKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZShvcHRpb24pO1xuICAgIHRoaXMub25DaGFuZ2UuZW1pdChvcHRpb24pO1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gb3B0aW9uO1xuICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IHRoaXMuaXNEYXRhbGlzdCA/IE9iamVjdC5hc3NpZ24oW10sIHRoaXMub3B0aW9ucykgOiB0aGlzLmZpbHRlck9wdGlvbnM7XG4gIH1cblxuICBjbG9zZURyb3Bkb3duKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9lcmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2VhcmNoVGVybS5zZXRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbVt0aGlzLmRpc3BsYXlLZXldIHx8IHRoaXMuc2VsZWN0ZWRJdGVtKTtcbiAgICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMub3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q2FyZXRQb3NpdGlvbigpIHtcbiAgICBsZXQgY29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lcmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5nLWRyb3Bkb3duLXdyYXBwZXInKSwgbnVsbCk7XG4gICAgdGhpcy5wb3NpdGlvblRvcCA9IGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLXRvcFwiKTtcbiAgICB0aGlzLnBvc2l0aW9uUmlnaHQgPSBjb21wdXRlZFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy1yaWdodFwiKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9uZy1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05nU2VsZWN0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW05nU2VsZWN0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ1NlbGVjdE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJGb3JtQ29udHJvbCIsImZyb21FdmVudCIsIm1hcCIsImRlYm91bmNlVGltZSIsImRpc3RpbmN0VW50aWxDaGFuZ2VkIiwic3dpdGNoTWFwIiwib2YiLCJDb21wb25lbnQiLCJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJOR19WQUxJREFUT1JTIiwiRWxlbWVudFJlZiIsIklucHV0IiwiVmlld0NoaWxkIiwiT3V0cHV0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQWtFRSwyQkFBb0IsS0FBaUI7WUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTs0QkFWaEIsSUFBSUEsaUJBQVksRUFBRTswQkFNckIsS0FBSztt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