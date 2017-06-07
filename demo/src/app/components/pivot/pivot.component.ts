import { Component } from '@angular/core';
import { DEMO_SNIPPETS } from './demos';

@Component({
  selector: 'ngbd-pivot',
  template: `
    <ngbd-content-wrapper component="Pivot">
    </ngbd-content-wrapper>
`
})
export class NgbdPivot {
  snippets = DEMO_SNIPPETS;
}
