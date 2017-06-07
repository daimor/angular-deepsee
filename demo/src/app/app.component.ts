import { Component, OnInit } from '@angular/core';
import {componentsList} from './shared';

import '../style/app.scss';

@Component({
  selector: 'ngbd-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  components = componentsList;

  constructor() { }

  ngOnInit(): void { }
}
