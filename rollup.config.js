export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/ng-custom-select.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng-custom-select',
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        '@angular/forms': 'ng.form'
    }
}