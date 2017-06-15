import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngbd-pivot-twolevel',
  templateUrl: 'pivot-twolevel.html'
})
export class NgbdPivotTwoLevel implements OnInit {

  pivotName: string;

  constructor() {
  }

  ngOnInit() {
    this.pivotName = 'Use in Dashboards/Patient Counts & Allergy Counts.pivot';
  }
}
