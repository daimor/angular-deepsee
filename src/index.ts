import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
  imports: [
  ],
  exports: [

  ]
})
export class NgbDeepSeeRootModule {
}

@NgModule({

})
export class NgbDeepSeeModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: NgbDeepSeeRootModule };
  }
}
