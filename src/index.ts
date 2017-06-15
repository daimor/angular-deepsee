import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgbPivotModule } from './pivot/pivot.module';
export {
  NgbPivotModule,
  NgbPivot,
  NgbPivotConfig
} from './pivot/pivot.module';

// import { DeepSeeService } from './deepsee.service';
// export { DeepSeeService } from './deepsee.service';

const NGB_MODULES = [
  NgbPivotModule
];

@NgModule({
  imports: [
    NgbPivotModule.forRoot()
  ],
  exports: [
    // DeepSeeService,
    ...NGB_MODULES
  ]
})
export class NgbDeepSeeRootModule {
}

@NgModule({
  imports: NGB_MODULES,
  exports: NGB_MODULES
})
export class NgbDeepSeeModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: NgbDeepSeeRootModule };
  }
}
