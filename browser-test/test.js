describe("@esm-bundle/single-spa-angular", () => {
  describe("single-spa-angular/internals", () => {
    ["es2015", "es2020"].forEach((ecma) => {
      it(`can load the System.register ${ecma} bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-single-spa-angular-internals.js`
        );
        expect(m.getContainerElementAndSetTemplate).toBeDefined();
      });

      it(`can load the System.register ${ecma} prod bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-single-spa-angular-internals.min.js`
        );
        expect(m.getContainerElementAndSetTemplate).toBeDefined();
      });
    });
  });

  describe("single-spa-angular", () => {
    ["es2015", "es2020"].forEach((ecma) => {
      it(`can load the System.register ${ecma} bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-single-spa-angular.js`
        );
        expect(m.getSingleSpaExtraProviders).toBeDefined();
      });

      it(`can load the System.register ${ecma} prod bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-single-spa-angular.min.js`
        );
        expect(m.getSingleSpaExtraProviders).toBeDefined();
      });
    });
  });

  describe("single-spa-angular/parcel", () => {
    ["es2015", "es2020"].forEach((ecma) => {
      it(`can load the System.register ${ecma} bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-single-spa-angular-parcel.js`
        );
        expect(m.ParcelModule).toBeDefined();
      });

      it(`can load the System.register ${ecma} prod bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-single-spa-angular-parcel.min.js`
        );
        expect(m.ParcelModule).toBeDefined();
      });
    });
  });

  describe("single-spa-angular/elements", () => {
    ["es2015", "es2020"].forEach((ecma) => {
      it(`can load the System.register ${ecma} bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-single-spa-angular-elements.js`
        );
        expect(m.singleSpaAngularElements).toBeDefined();
      });

      it(`can load the System.register ${ecma} prod bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-single-spa-angular-elements.min.js`
        );
        expect(m.singleSpaAngularElements).toBeDefined();
      });
    });
  });
});
