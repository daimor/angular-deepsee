import { Component } from '@angular/core';

@Component({
  selector: 'ngbd-pivot-basic',
  templateUrl: 'pivot-basic.html'
})
export class NgbdPivotBasic {

  data: any;

  constructor() {
    this.data = require('./data.json');
  }
}
