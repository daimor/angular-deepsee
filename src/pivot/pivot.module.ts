import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbPivot } from './pivot';
import { NgbPivotConfig } from './pivot-config';

const NGB_pivot_DIRECTIVES = [NgbPivot];

@NgModule({ declarations: NGB_pivot_DIRECTIVES, exports: NGB_pivot_DIRECTIVES, imports: [CommonModule] })
export class NgbpivotModule {
  static forRoot(): ModuleWithProviders { return { ngModule: NgbpivotModule, providers: [NgbPivotConfig] }; }
}
