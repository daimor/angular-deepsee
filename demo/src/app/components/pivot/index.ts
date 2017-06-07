export * from './pivot.component';

import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdPivot } from './pivot.component';
import { DEMO_DIRECTIVES } from './demos';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdPivot],
  declarations: [NgbdPivot, ...DEMO_DIRECTIVES]
})
export class NgbdPivotModule { }
