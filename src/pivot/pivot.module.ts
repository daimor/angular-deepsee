import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbPivot } from './pivot';
import { NgbPivotConfig } from './pivot-config';

export { NgbPivot } from './pivot';
export { NgbPivotConfig } from './pivot-config';

@NgModule({ declarations: [NgbPivot], exports: [NgbPivot], imports: [CommonModule], entryComponents: [NgbPivot] })
export class NgbPivotModule {
  static forRoot(): ModuleWithProviders { return { ngModule: NgbPivotModule, providers: [NgbPivotConfig] }; }
}
