import {
  AfterContentChecked,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';

import {NgbPivotConfig} from './pivot-config';

@Component({
  selector: 'ngb-deepsee-pivot',
  exportAs: 'ngbDeepseePivot',
  template: `
`
})
export class NgbPivot {

  constructor(config: NgbPivotConfig) {
  }
}
