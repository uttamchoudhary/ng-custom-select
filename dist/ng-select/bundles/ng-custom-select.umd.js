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
                this.positionTop = computedStyles.getPropertyValue("padding-top");
                this.positionRight = computedStyles.getPropertyValue("padding-right");
            };
        NgSelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ng-select',
                        template: "<div class=\"ng-dropdown-wrapper\" [class]=\"styleGuide?.selectBoxClass\" tabindex=\"0\" (click)=\"active=!active\" [ngClass]=\"{'active':active, 'disabled': disable}\">\n    <input type=\"text\" name=\"searchTerm\" tabindex=\"-1\" [formControl]=\"searchTerm\" [readonly]=\"!isDatalist\" #searchInput>\n    <span [class]=\"styleGuide?.caretClass\" id=\"caret\" [ngStyle]=\"{'top':positionTop,'right':positionRight}\" [ngClass]=\"{'icon':!styleGuide?.caretClass}\"></span>\n    <ul [ngClass]=\"{'ng-dropdown-menu' : true}\" [class]=\"styleGuide?.selectMenuClass\">\n        <li *ngFor=\"let option of filterOptions\" (click)=\"changeValue(option)\" [class]=\"styleGuide?.optionsClass\">\n            <span>{{option[displayKey] || option}}</span>\n        </li>\n    </ul>\n</div>",
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY3VzdG9tLXNlbGVjdC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLWN1c3RvbS1zZWxlY3QvbGliL25nLXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL25nLWN1c3RvbS1zZWxlY3QvbGliL25nLXNlbGVjdC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgTkdfVkFMSURBVE9SUywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciwgVmFsaWRhdGlvbkVycm9ycywgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tRXZlbnQsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzYW1wbGUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzd2l0Y2hNYXAsIGRlYm91bmNlVGltZSwgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibmctZHJvcGRvd24td3JhcHBlclwiIFtjbGFzc109XCJzdHlsZUd1aWRlPy5zZWxlY3RCb3hDbGFzc1wiIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJhY3RpdmU9IWFjdGl2ZVwiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzphY3RpdmUsICdkaXNhYmxlZCc6IGRpc2FibGV9XCI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlYXJjaFRlcm1cIiB0YWJpbmRleD1cIi0xXCIgW2Zvcm1Db250cm9sXT1cInNlYXJjaFRlcm1cIiBbcmVhZG9ubHldPVwiIWlzRGF0YWxpc3RcIiAjc2VhcmNoSW5wdXQ+XG4gICAgPHNwYW4gW2NsYXNzXT1cInN0eWxlR3VpZGU/LmNhcmV0Q2xhc3NcIiBpZD1cImNhcmV0XCIgW25nU3R5bGVdPVwieyd0b3AnOnBvc2l0aW9uVG9wLCdyaWdodCc6cG9zaXRpb25SaWdodH1cIiBbbmdDbGFzc109XCJ7J2ljb24nOiFzdHlsZUd1aWRlPy5jYXJldENsYXNzfVwiPjwvc3Bhbj5cbiAgICA8dWwgW25nQ2xhc3NdPVwieyduZy1kcm9wZG93bi1tZW51JyA6IHRydWV9XCIgW2NsYXNzXT1cInN0eWxlR3VpZGU/LnNlbGVjdE1lbnVDbGFzc1wiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBmaWx0ZXJPcHRpb25zXCIgKGNsaWNrKT1cImNoYW5nZVZhbHVlKG9wdGlvbilcIiBbY2xhc3NdPVwic3R5bGVHdWlkZT8ub3B0aW9uc0NsYXNzXCI+XG4gICAgICAgICAgICA8c3Bhbj57e29wdGlvbltkaXNwbGF5S2V5XSB8fCBvcHRpb259fTwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICA8L3VsPlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYEBjaGFyc2V0IFwiVVRGLThcIjsubmctZHJvcGRvd24td3JhcHBlcntkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZX0ubmctZHJvcGRvd24td3JhcHBlciBpbnB1dFt0eXBlPXRleHRde3dpZHRoOjkwJTtib3JkZXI6bm9uZTtvdXRsaW5lOjA7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZX0ubmctZHJvcGRvd24td3JhcHBlciAjY2FyZXR7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6MDt6LWluZGV4Ojk5OX0ubmctZHJvcGRvd24td3JhcHBlciAuaWNvbjo6YWZ0ZXJ7Y29udGVudDpcIsOiwpbCvFwiO3RleHQtYWxpZ246Y2VudGVyO3BvaW50ZXItZXZlbnRzOm5vbmV9Lm5nLWRyb3Bkb3duLXdyYXBwZXIgLm5nLWRyb3Bkb3duLW1lbnV7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDIlO2xlZnQ6MDtyaWdodDowO2xpc3Qtc3R5bGU6bm9uZTtvdmVyZmxvdzphdXRvO3otaW5kZXg6OTk5OX0ubmctZHJvcGRvd24td3JhcHBlciAubmctZHJvcGRvd24tbWVudSBsaSBzcGFue3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemU7dHJhbnNpdGlvbjphbGwgLjNzIGVhc2Utb3V0fS5uZy1kcm9wZG93bi13cmFwcGVyLmFjdGl2ZSAjY2FyZXR7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDE4MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpfS5uZy1kcm9wZG93bi13cmFwcGVyLmFjdGl2ZSAubmctZHJvcGRvd24tbWVudXtkaXNwbGF5OmJsb2NrfS5kaXNhYmxlZHtjdXJzb3I6bm90LWFsbG93ZWQ7cG9pbnRlci1ldmVudHM6bm9uZTtvcGFjaXR5Oi43Oy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX1gXSxcbiAgaG9zdDoge1xuICAgICcoZG9jdW1lbnQ6Y2xpY2spJzogJ2Nsb3NlRHJvcGRvd24oJGV2ZW50KScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1NlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3Ige1xuXG4gIC8vIExpc3Qgb2Ygb3B0aW9uc1xuICBASW5wdXQoKSBvcHRpb25zOiBBcnJheTxhbnk+O1xuXG4gIC8vbmFtZSBvZiBrZXkgdG8gZGlzcGxheWVkIGFzIG9wdGlvbnNcbiAgQElucHV0KCkgZGlzcGxheUtleTogc3RyaW5nO1xuXG4gIC8vY29udGFpbnMgdmFyaW91cyBDb25maWcgY2xhc3NlcyBmb3IgZHJvcGRvd24gXG4gIEBJbnB1dCgpIHN0eWxlR3VpZGU6IGFueTtcblxuICAvL1RydWUgaWYgRHJvcGRvd24gc2hvdWxkIGJlaGF2ZSBsaWtlIGEgZGF0YWxpc3RcbiAgQElucHV0KCkgaXNEYXRhbGlzdDogYm9vbGVhbjtcblxuICAvL1RydWUgaWYgc2VsZWN0IGJveCBpcyBkaXNhYmxlZFxuICBASW5wdXQoKSBkaXNhYmxlIDogYm9vbGVhbjtcblxuICAvL0xpc3Qgb2YgcHJvcGVydGllcyBmb3Igd2hpY2ggc2VhcmNoaW5nIGlzIGFwcGxpZWQgaW4gbGlzdFxuICBASW5wdXQoKSBzZWFyY2hLZXlzOiBBcnJheTxzdHJpbmc+O1xuXG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0Jykgc2VhcmNoSW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHNlbGVjdGVkSXRlbTogYW55O1xuICBzZWFyY2hUZXJtOiBGb3JtQ29udHJvbDtcbiAgZmlsdGVyT3B0aW9uczogQXJyYXk8YW55PjtcblxuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcG9zaXRpb25Ub3A6IGFueTtcbiAgcG9zaXRpb25SaWdodDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VyZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLnNlYXJjaFRlcm0gPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9XG5cbiAgd3JpdGVWYWx1ZShvYmo6IGFueSkge1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gb2JqO1xuICAgIG9iaiAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA/IHRoaXMuc2VhcmNoVGVybS5zZXRWYWx1ZShvYmpbdGhpcy5kaXNwbGF5S2V5XSB8fCBvYmopIDogbnVsbDtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKCkgeyB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHZhbGlkYXRlKCk6IFZhbGlkYXRpb25FcnJvcnMge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbSA/IG51bGwgOiB7IHJlcXVpcmVkOiB0cnVlIH07XG4gIH1cblxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gdGhpcy5vcHRpb25zWzBdO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5nZXRDYXJldFBvc2l0aW9uKCk7XG4gICAgfSlcblxuICAgIGlmICghdGhpcy5kaXNwbGF5S2V5ICYmIHR5cGVvZiB0aGlzLm9wdGlvbnNbMF0gPT09ICdvYmplY3QnKVxuICAgICAgdGhpcy5kaXNwbGF5S2V5ID0gT2JqZWN0LmtleXModGhpcy5vcHRpb25zWzBdKVswXTtcbiAgICB0aGlzLnNlYXJjaFRlcm0uc2V0VmFsdWUodGhpcy5vcHRpb25zWzBdW3RoaXMuZGlzcGxheUtleV0gfHwgdGhpcy5vcHRpb25zWzBdKTtcbiAgICB0aGlzLmZpbHRlck9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuaXNEYXRhbGlzdCA/IHRoaXMuaW5pdFNlYXJjaCgpIDogbnVsbDtcbiAgfVxuXG4gIGluaXRTZWFyY2goKSB7XG4gICAgaWYgKCghdGhpcy5zZWFyY2hLZXlzIHx8ICF0aGlzLnNlYXJjaEtleXMubGVuZ3RoKSAmJiB0aGlzLmRpc3BsYXlLZXkgJiYgdHlwZW9mIHRoaXMub3B0aW9uc1swXSA9PT0gJ29iamVjdCcpXG4gICAgICB0aGlzLnNlYXJjaEtleXMgPSBbdGhpcy5kaXNwbGF5S2V5XTtcbiAgICBlbHNlIGlmICghdGhpcy5kaXNwbGF5S2V5IHx8IHR5cGVvZiB0aGlzLm9wdGlvbnNbMF0gIT09ICdvYmplY3QnKVxuICAgICAgdGhpcy5zZWFyY2hLZXlzID0gWycwJ107XG5cbiAgICBmcm9tRXZlbnQodGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LCAnaW5wdXQnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoZTogYW55KSA9PiBlLnRhcmdldC52YWx1ZSksXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDApLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICBzd2l0Y2hNYXAodGVybSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9mKFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZpbHRlcihvcHRpb24gPT4ge1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5zZWFyY2hLZXlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09IFwib2JqZWN0XCIgJiYgb3B0aW9uW3RoaXMuc2VhcmNoS2V5c1tpXV0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGVybS50b0xvd2VyQ2FzZSgpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbiAhPT0gXCJvYmplY3RcIiAmJiBvcHRpb24udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGVybS50b0xvd2VyQ2FzZSgpKSA+IC0xKVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgKSlcbiAgICAgIC5zdWJzY3JpYmUobGlzdCA9PiB7XG4gICAgICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IGxpc3Q7XG4gICAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZVZhbHVlKG9wdGlvbikge1xuICAgIHRoaXMuc2VhcmNoVGVybS5zZXRWYWx1ZShvcHRpb25bdGhpcy5kaXNwbGF5S2V5XSB8fCBvcHRpb24pO1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKG9wdGlvbik7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KG9wdGlvbik7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBvcHRpb247XG4gICAgdGhpcy5maWx0ZXJPcHRpb25zID0gdGhpcy5pc0RhdGFsaXN0ID8gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5vcHRpb25zKSA6IHRoaXMuZmlsdGVyT3B0aW9ucztcbiAgfVxuXG4gIGNsb3NlRHJvcGRvd24oZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuX2VyZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5zZWFyY2hUZXJtLnNldFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtW3RoaXMuZGlzcGxheUtleV0gfHwgdGhpcy5zZWxlY3RlZEl0ZW0pO1xuICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5vcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBnZXRDYXJldFBvc2l0aW9uKCkge1xuICAgIGxldCBjb21wdXRlZFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX2VyZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmctZHJvcGRvd24td3JhcHBlcicpLCBudWxsKTtcbiAgICB0aGlzLnBvc2l0aW9uVG9wID0gY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcInBhZGRpbmctdG9wXCIpO1xuICAgIHRoaXMucG9zaXRpb25SaWdodCA9IGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLXJpZ2h0XCIpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL25nLXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTmdTZWxlY3RDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTmdTZWxlY3RDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5nU2VsZWN0TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsIkZvcm1Db250cm9sIiwiZnJvbUV2ZW50IiwibWFwIiwiZGVib3VuY2VUaW1lIiwiZGlzdGluY3RVbnRpbENoYW5nZWQiLCJzd2l0Y2hNYXAiLCJvZiIsIkNvbXBvbmVudCIsIk5HX1ZBTFVFX0FDQ0VTU09SIiwiZm9yd2FyZFJlZiIsIk5HX1ZBTElEQVRPUlMiLCJFbGVtZW50UmVmIiwiSW5wdXQiLCJWaWV3Q2hpbGQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBa0VFLDJCQUFvQixLQUFpQjtZQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZOzRCQVZoQixJQUFJQSxpQkFBWSxFQUFFOzBCQU1yQixLQUFLO21DQVFHLFVBQUMsQ0FBTSxLQUFRO1lBSHZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSUMsaUJBQVcsRUFBRSxDQUFDO1NBQ3JDOzs7OztRQUlELHNDQUFVOzs7O1lBQVYsVUFBVyxHQUFRO2dCQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQy9GOzs7O1FBRUQsNkNBQWlCOzs7WUFBakIsZUFBdUI7Ozs7O1FBRXZCLDRDQUFnQjs7OztZQUFoQixVQUFpQixFQUFPO2dCQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQzthQUMzQjs7OztRQUVELG9DQUFROzs7WUFBUjtnQkFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO2FBQ3REOzs7O1FBR0Qsb0NBQVE7OztZQUFSO2dCQUFBLGlCQVdDO2dCQVZDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsVUFBVSxDQUFDO29CQUNULEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2lCQUN6QixDQUFDLENBQUE7Z0JBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVE7b0JBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQzthQUM1Qzs7OztRQUVELHNDQUFVOzs7WUFBVjtnQkFBQSxpQkEyQkM7Z0JBMUJDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRO29CQUN6RyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUTtvQkFDOUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUUxQkMsY0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQztxQkFDL0MsSUFBSSxDQUNIQyxhQUFHLENBQUMsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBQSxDQUFDLEVBQy9CQyxzQkFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQkMsOEJBQW9CLEVBQUUsRUFDdEJDLG1CQUFTLENBQUMsVUFBQSxJQUFJO29CQUNaLE9BQU9DLE9BQUUsQ0FDUCxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE1BQU07d0JBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUMxRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQ0FDdEgsT0FBTyxNQUFNLENBQUM7NkJBQ2Y7aUNBQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ3ZHLE9BQU8sTUFBTSxDQUFDO3lCQUNqQjtxQkFDRixDQUFDLENBQ0gsQ0FBQTtpQkFDRixDQUNBLENBQUM7cUJBQ0gsU0FBUyxDQUFDLFVBQUEsSUFBSTtvQkFDYixLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztpQkFDM0IsQ0FBQyxDQUFDO2FBQ047Ozs7O1FBRUQsdUNBQVc7Ozs7WUFBWCxVQUFZLE1BQU07Z0JBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztnQkFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQzdGOzs7OztRQUVELHlDQUFhOzs7O1lBQWIsVUFBYyxLQUFLO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDbEYsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3REO2FBQ0Y7Ozs7UUFFRCw0Q0FBZ0I7OztZQUFoQjs7Z0JBQ0UsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNuSCxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDdkU7O29CQWhKRkMsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxXQUFXO3dCQUNyQixRQUFRLEVBQUUsNHdCQVFMO3dCQUNMLE1BQU0sRUFBRSxDQUFDLDQyQkFBbTJCLENBQUM7d0JBQzcyQixJQUFJLEVBQUU7NEJBQ0osa0JBQWtCLEVBQUUsdUJBQXVCO3lCQUM1Qzt3QkFDRCxTQUFTLEVBQUU7NEJBQ1Q7Z0NBQ0UsT0FBTyxFQUFFQyx1QkFBaUI7Z0NBQzFCLFdBQVcsRUFBRUMsZUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsR0FBQSxDQUFDO2dDQUNoRCxLQUFLLEVBQUUsSUFBSTs2QkFDWjs0QkFDRDtnQ0FDRSxPQUFPLEVBQUVDLG1CQUFhO2dDQUN0QixXQUFXLEVBQUVELGVBQVUsQ0FBQyxjQUFNLE9BQUEsaUJBQWlCLEdBQUEsQ0FBQztnQ0FDaEQsS0FBSyxFQUFFLElBQUk7NkJBQ1o7eUJBQ0Y7cUJBQ0Y7Ozs7O3dCQWpDd0RFLGVBQVU7Ozs7OEJBcUNoRUMsVUFBSztpQ0FHTEEsVUFBSztpQ0FHTEEsVUFBSztpQ0FHTEEsVUFBSzs4QkFHTEEsVUFBSztpQ0FHTEEsVUFBSztrQ0FFTEMsY0FBUyxTQUFDLGFBQWE7K0JBRXZCQyxXQUFNOztnQ0F4RFQ7Ozs7Ozs7QUNBQTs7OztvQkFLQ0MsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUEMsbUJBQVk7NEJBQ1pDLGlCQUFXOzRCQUNYQyx5QkFBbUI7eUJBQ3BCO3dCQUNELFlBQVksRUFBRSxDQUFDLGlCQUFpQixDQUFDO3dCQUNqQyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztxQkFDN0I7OzZCQWJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=