import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { NgbPivot } from './pivot';
import { NgbPivotConfig } from './pivot-config';

export { NgbPivot } from './pivot';
export { NgbPivotConfig } from './pivot-config';

@NgModule({
  declarations: [NgbPivot],
  exports: [NgbPivot],
  imports: [CommonModule, HttpModule],
  providers: [
    { provide: 'MDX2JSON', useValue: '/MDX2JSON' },
    { provide: 'DeepSeeNamespace', useValue: 'SAMPLES' }
  ],
  entryComponents: [NgbPivot]
})
export class NgbPivotModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgbPivotModule,
      providers: [NgbPivotConfig]
    };
  }
}
