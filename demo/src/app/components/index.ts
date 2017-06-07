export * from './pivot';

import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../shared';

import { NgbdPivotModule } from './pivot';

@NgModule({
  imports: [
    NgbdSharedModule,
    NgbdPivotModule
  ],
  exports: [
    NgbdPivotModule
  ]
})
export class NgbdDemoModule { }
