import {
  Component,
  ElementRef,
  Input,
  OnInit,
  AfterViewInit
} from '@angular/core';

import { NgbPivotConfig } from './pivot-config';

@Component({
  selector: 'ngb-deepsee-pivot',
  exportAs: 'ngbDeepSeePivot',
  template: ``
})
export class NgbPivot implements OnInit, AfterViewInit {

  @Input('data') sourceData: any;

  constructor(
    config: NgbPivotConfig,
    private el: ElementRef
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
