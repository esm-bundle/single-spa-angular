document.head.appendChild(
  Object.assign(document.createElement('script'), {
    type: 'systemjs-importmap',
    textContent: `
      {
        "imports": {
          "rxjs": "https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs/system/es2015/rxjs.min.js",
          "rxjs/operators": "https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs/system/es2015/rxjs-operators.min.js",
          "@angular/core/primitives/signals": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular/system/es2022/angular-core-primitives-signals.min.js",
          "@angular/core": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular/system/es2022/angular-core.min.js",
          "@angular/common": "https://cdn.jsdelivr.net/npm/@esm-bundle/angular/system/es2022/angular-common.min.js",
          "single-spa-angular/internals": "/base/system/es2022/single-spa-angular-internals.js"
        }
      }`,
  }),
);
