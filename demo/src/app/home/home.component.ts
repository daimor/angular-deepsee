import { Component } from '@angular/core';

@Component({
  selector: 'ngbd-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  public version: string = process.env.version;
}
