import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { ExampleBoxComponent } from './example-box/example-box.component';
import { NgbdFragment } from './fragment/fragment.directive';

@NgModule({
  imports: [NgbdSharedModule],
  declarations: [ExampleBoxComponent, NgbdFragment],
  exports: [ExampleBoxComponent, NgbdFragment]
})
export class NgbdComponentsSharedModule { }
