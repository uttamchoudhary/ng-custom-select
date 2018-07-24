export const CONSTANTS = {
    ERROR : {
        REQUIRED : "This field is required",
        OPTIONS : "Options should be Array of Objects or Strings. Input should stringified",
        DISPLAY_KEY : "This key name should be present in object provided as input in options field",
        SEARCH_KEY : "This key name should be present in object provided as input in options field",
        STYLE_GUIDE : "This should be an stringified object"
    },
    TOOLTIP :{
        DISABLE : 'Select box will be in disabled state, if this switch is On',
        OPTIONS : "Options are Array of objects or strings that will be displayed as options of select box. Stringify array before entering it. Default is already populated",
        DISPLAY_KEY : "Any key name present in object of options Array. Value of this key will be displayed to user as options. By default value of first key will be shown",
        DATALIST : 'Select box will behave like a datalist, user can search for values. Search is applied on "Display key" or provided list of "Search keys".',
        SEARCH_KEY : "Enter comma/space separated key names for search to be applied upon. By default search applied upon display key",
        STYLE_GUIDE : "Switch it on if you want your classes/css to be applied on select box",
        STYLE_GUIDE_OBJ : 'Config object containing classnames for dropdown elements. It has four keys "caretClass", "selectBoxClass", "selectMenuClass", "optionsClass". Input should be stringified. \n Default : \n{\n"caretClass":"icon-dropdown",\n"selectBoxClass":"dropdown-wrapper",\n"selectMenuClass":"dropdown",\n"optionsClass":"option"\n}',
        CSS : 'Write your CSS (with proper selectors) here. It will be applied on select box in real time',
        CSS_URL : 'Either you can write your CSS rules above or just provide http link for your css file to load'
    },
    HELP_TEXT : {

    }
}