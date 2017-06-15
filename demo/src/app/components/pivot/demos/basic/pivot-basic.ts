import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngbd-pivot-basic',
  templateUrl: 'pivot-basic.html'
})
export class NgbdPivotBasic implements OnInit {

  pivotName: string;

  constructor() {
  }

  ngOnInit() {
    this.pivotName = 'Use in Dashboards\/Patients by Favorite Color.pivot';
  }
}
