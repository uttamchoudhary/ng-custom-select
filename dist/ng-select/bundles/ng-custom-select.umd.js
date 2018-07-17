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
                //this.positionTop = computedStyles.getPropertyValue("padding-top");
                this.positionRight = computedStyles.getPropertyValue("padding-right");
            };
        NgSelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ng-select',
                        template: "<div class=\"ng-dropdown-wrapper\" [class]=\"styleGuide?.selectBoxClass\" tabindex=\"0\" (click)=\"active=!active\" [ngClass]=\"{'active':active, 'disabled': disable}\">\n    <input type=\"text\" name=\"searchTerm\" tabindex=\"-1\" [formControl]=\"searchTerm\" [readonly]=\"!isDatalist\" #searchInput>\n    <span [class]=\"styleGuide?.caretClass\" id=\"caret\" [ngStyle]=\"{'right':positionRight}\" [ngClass]=\"{'icon':!styleGuide?.caretClass}\"></span>\n    <ul [ngClass]=\"{'ng-dropdown-menu' : true}\" [class]=\"styleGuide?.selectMenuClass\">\n        <li *ngFor=\"let option of filterOptions\" (click)=\"changeValue(option)\" [class]=\"styleGuide?.optionsClass\">\n            <span>{{option[displayKey] || option}}</span>\n        </li>\n    </ul>\n</div>",
                        styles: ["@charset \"UTF-8\";.ng-dropdown-wrapper{display:inline-block;position:relative}.ng-dropdown-wrapper input[type=text]{width:90%;border:none;outline:0;text-transform:capitalize}.ng-dropdown-wrapper #caret{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:999}.ng-dropdown-wrapper .icon::after{content:\"\u25BC\";text-align:center;pointer-events:none}.ng-dropdown-wrapper .ng-dropdown-menu{display:none;position:absolute;top:102%;left:0;right:0;list-style:none;overflow:auto;z-index:9999}.ng-dropdown-wrapper .ng-dropdown-menu li span{text-transform:capitalize;transition:all .3s ease-out}.ng-dropdown-wrapper.active #caret{-webkit-transform:translateY(-50%) rotate(180deg);transform:translateY(-50%) rotate(180deg)}.ng-dropdown-wrapper.active .ng-dropdown-menu{display:block}.disabled{cursor:not-allowed;pointer-events:none;opacity:.7;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY3VzdG9tLXNlbGVjdC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLWN1c3RvbS1zZWxlY3QvbGliL25nLXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL25nLWN1c3RvbS1zZWxlY3QvbGliL25nLXNlbGVjdC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgTkdfVkFMSURBVE9SUywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciwgVmFsaWRhdGlvbkVycm9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tRXZlbnQsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzYW1wbGUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzd2l0Y2hNYXAsIGRlYm91bmNlVGltZSwgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibmctZHJvcGRvd24td3JhcHBlclwiIFtjbGFzc109XCJzdHlsZUd1aWRlPy5zZWxlY3RCb3hDbGFzc1wiIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJhY3RpdmU9IWFjdGl2ZVwiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzphY3RpdmUsICdkaXNhYmxlZCc6IGRpc2FibGV9XCI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlYXJjaFRlcm1cIiB0YWJpbmRleD1cIi0xXCIgW2Zvcm1Db250cm9sXT1cInNlYXJjaFRlcm1cIiBbcmVhZG9ubHldPVwiIWlzRGF0YWxpc3RcIiAjc2VhcmNoSW5wdXQ+XG4gICAgPHNwYW4gW2NsYXNzXT1cInN0eWxlR3VpZGU/LmNhcmV0Q2xhc3NcIiBpZD1cImNhcmV0XCIgW25nU3R5bGVdPVwieydyaWdodCc6cG9zaXRpb25SaWdodH1cIiBbbmdDbGFzc109XCJ7J2ljb24nOiFzdHlsZUd1aWRlPy5jYXJldENsYXNzfVwiPjwvc3Bhbj5cbiAgICA8dWwgW25nQ2xhc3NdPVwieyduZy1kcm9wZG93bi1tZW51JyA6IHRydWV9XCIgW2NsYXNzXT1cInN0eWxlR3VpZGU/LnNlbGVjdE1lbnVDbGFzc1wiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBmaWx0ZXJPcHRpb25zXCIgKGNsaWNrKT1cImNoYW5nZVZhbHVlKG9wdGlvbilcIiBbY2xhc3NdPVwic3R5bGVHdWlkZT8ub3B0aW9uc0NsYXNzXCI+XG4gICAgICAgICAgICA8c3Bhbj57e29wdGlvbltkaXNwbGF5S2V5XSB8fCBvcHRpb259fTwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICA8L3VsPlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYEBjaGFyc2V0IFwiVVRGLThcIjsubmctZHJvcGRvd24td3JhcHBlcntkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZX0ubmctZHJvcGRvd24td3JhcHBlciBpbnB1dFt0eXBlPXRleHRde3dpZHRoOjkwJTtib3JkZXI6bm9uZTtvdXRsaW5lOjA7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZX0ubmctZHJvcGRvd24td3JhcHBlciAjY2FyZXR7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6NTAlOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSk7ei1pbmRleDo5OTl9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgLmljb246OmFmdGVye2NvbnRlbnQ6XCLDosKWwrxcIjt0ZXh0LWFsaWduOmNlbnRlcjtwb2ludGVyLWV2ZW50czpub25lfS5uZy1kcm9wZG93bi13cmFwcGVyIC5uZy1kcm9wZG93bi1tZW51e2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAyJTtsZWZ0OjA7cmlnaHQ6MDtsaXN0LXN0eWxlOm5vbmU7b3ZlcmZsb3c6YXV0bzt6LWluZGV4Ojk5OTl9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgLm5nLWRyb3Bkb3duLW1lbnUgbGkgc3Bhbnt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplO3RyYW5zaXRpb246YWxsIC4zcyBlYXNlLW91dH0ubmctZHJvcGRvd24td3JhcHBlci5hY3RpdmUgI2NhcmV0ey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDE4MGRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDE4MGRlZyl9Lm5nLWRyb3Bkb3duLXdyYXBwZXIuYWN0aXZlIC5uZy1kcm9wZG93bi1tZW51e2Rpc3BsYXk6YmxvY2t9LmRpc2FibGVke2N1cnNvcjpub3QtYWxsb3dlZDtwb2ludGVyLWV2ZW50czpub25lO29wYWNpdHk6Ljc7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfWBdLFxuICBob3N0OiB7XG4gICAgJyhkb2N1bWVudDpjbGljayknOiAnY2xvc2VEcm9wZG93bigkZXZlbnQpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1NlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1NlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XG5cbiAgLy8gTGlzdCBvZiBvcHRpb25zXG4gIEBJbnB1dCgpIG9wdGlvbnM6IEFycmF5PGFueT47XG5cbiAgLy9uYW1lIG9mIGtleSB0byBkaXNwbGF5ZWQgYXMgb3B0aW9uc1xuICBASW5wdXQoKSBkaXNwbGF5S2V5OiBzdHJpbmc7XG5cbiAgLy9jb250YWlucyB2YXJpb3VzIENvbmZpZyBjbGFzc2VzIGZvciBkcm9wZG93biBcbiAgQElucHV0KCkgc3R5bGVHdWlkZTogYW55O1xuXG4gIC8vVHJ1ZSBpZiBEcm9wZG93biBzaG91bGQgYmVoYXZlIGxpa2UgYSBkYXRhbGlzdFxuICBASW5wdXQoKSBpc0RhdGFsaXN0OiBib29sZWFuO1xuXG4gIC8vVHJ1ZSBpZiBzZWxlY3QgYm94IGlzIGRpc2FibGVkXG4gIEBJbnB1dCgpIGRpc2FibGUgOiBib29sZWFuO1xuXG4gIC8vTGlzdCBvZiBwcm9wZXJ0aWVzIGZvciB3aGljaCBzZWFyY2hpbmcgaXMgYXBwbGllZCBpbiBsaXN0XG4gIEBJbnB1dCgpIHNlYXJjaEtleXM6IEFycmF5PHN0cmluZz47XG5cbiAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnKSBzZWFyY2hJbnB1dDogRWxlbWVudFJlZjtcblxuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgc2VsZWN0ZWRJdGVtOiBhbnk7XG4gIHNlYXJjaFRlcm06IEZvcm1Db250cm9sO1xuICBmaWx0ZXJPcHRpb25zOiBBcnJheTxhbnk+O1xuXG4gIGFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwb3NpdGlvblRvcDogYW55O1xuICBwb3NpdGlvblJpZ2h0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZXJlZjogRWxlbWVudFJlZikge1xuICAgIHRoaXMuc2VhcmNoVGVybSA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7IH1cblxuICB3cml0ZVZhbHVlKG9iajogYW55KSB7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBvYmo7XG4gICAgb2JqICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID8gdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKG9ialt0aGlzLmRpc3BsYXlLZXldIHx8IG9iaikgOiBudWxsO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoKSB7IH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICB9XG5cbiAgdmFsaWRhdGUoKTogVmFsaWRhdGlvbkVycm9ycyB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJdGVtID8gbnVsbCA6IHsgcmVxdWlyZWQ6IHRydWUgfTtcbiAgfVxuXG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSB0aGlzLm9wdGlvbnNbMF07XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdldENhcmV0UG9zaXRpb24oKTtcbiAgICB9KVxuXG4gICAgaWYgKCF0aGlzLmRpc3BsYXlLZXkgJiYgdHlwZW9mIHRoaXMub3B0aW9uc1swXSA9PT0gJ29iamVjdCcpXG4gICAgICB0aGlzLmRpc3BsYXlLZXkgPSBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnNbMF0pWzBdO1xuICAgIHRoaXMuc2VhcmNoVGVybS5zZXRWYWx1ZSh0aGlzLm9wdGlvbnNbMF1bdGhpcy5kaXNwbGF5S2V5XSB8fCB0aGlzLm9wdGlvbnNbMF0pO1xuICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5pc0RhdGFsaXN0ID8gdGhpcy5pbml0U2VhcmNoKCkgOiBudWxsO1xuICB9XG5cbiAgaW5pdFNlYXJjaCgpIHtcbiAgICBpZiAoKCF0aGlzLnNlYXJjaEtleXMgfHwgIXRoaXMuc2VhcmNoS2V5cy5sZW5ndGgpICYmIHRoaXMuZGlzcGxheUtleSAmJiB0eXBlb2YgdGhpcy5vcHRpb25zWzBdID09PSAnb2JqZWN0JylcbiAgICAgIHRoaXMuc2VhcmNoS2V5cyA9IFt0aGlzLmRpc3BsYXlLZXldO1xuICAgIGVsc2UgaWYgKCF0aGlzLmRpc3BsYXlLZXkgfHwgdHlwZW9mIHRoaXMub3B0aW9uc1swXSAhPT0gJ29iamVjdCcpXG4gICAgICB0aGlzLnNlYXJjaEtleXMgPSBbJzAnXTtcblxuICAgIGZyb21FdmVudCh0aGlzLnNlYXJjaElucHV0Lm5hdGl2ZUVsZW1lbnQsICdpbnB1dCcpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChlOiBhbnkpID0+IGUudGFyZ2V0LnZhbHVlKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMCksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHN3aXRjaE1hcCh0ZXJtID0+IHtcbiAgICAgICAgICByZXR1cm4gb2YoXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLnNlYXJjaEtleXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25bdGhpcy5zZWFyY2hLZXlzW2ldXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXJtLnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9uICE9PSBcIm9iamVjdFwiICYmIG9wdGlvbi50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXJtLnRvTG93ZXJDYXNlKCkpID4gLTEpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICApKVxuICAgICAgLnN1YnNjcmliZShsaXN0ID0+IHtcbiAgICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0gbGlzdDtcbiAgICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlVmFsdWUob3B0aW9uKSB7XG4gICAgdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKG9wdGlvblt0aGlzLmRpc3BsYXlLZXldIHx8IG9wdGlvbik7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2Uob3B0aW9uKTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQob3B0aW9uKTtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IG9wdGlvbjtcbiAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSB0aGlzLmlzRGF0YWxpc3QgPyBPYmplY3QuYXNzaWduKFtdLCB0aGlzLm9wdGlvbnMpIDogdGhpcy5maWx0ZXJPcHRpb25zO1xuICB9XG5cbiAgY2xvc2VEcm9wZG93bihldmVudCkge1xuICAgIGlmICghdGhpcy5fZXJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLnNlYXJjaFRlcm0uc2V0VmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1bdGhpcy5kaXNwbGF5S2V5XSB8fCB0aGlzLnNlbGVjdGVkSXRlbSk7XG4gICAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGdldENhcmV0UG9zaXRpb24oKSB7XG4gICAgbGV0IGNvbXB1dGVkU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fZXJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZy1kcm9wZG93bi13cmFwcGVyJyksIG51bGwpO1xuICAgIC8vdGhpcy5wb3NpdGlvblRvcCA9IGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLXRvcFwiKTtcbiAgICB0aGlzLnBvc2l0aW9uUmlnaHQgPSBjb21wdXRlZFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy1yaWdodFwiKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi9uZy1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05nU2VsZWN0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW05nU2VsZWN0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ1NlbGVjdE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJGb3JtQ29udHJvbCIsImZyb21FdmVudCIsIm1hcCIsImRlYm91bmNlVGltZSIsImRpc3RpbmN0VW50aWxDaGFuZ2VkIiwic3dpdGNoTWFwIiwib2YiLCJDb21wb25lbnQiLCJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJOR19WQUxJREFUT1JTIiwiRWxlbWVudFJlZiIsIklucHV0IiwiVmlld0NoaWxkIiwiT3V0cHV0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiXSwi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