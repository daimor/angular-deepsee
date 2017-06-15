import { Component } from '@angular/core';
import { DEMO_SNIPPETS } from './demos';

@Component({
  selector: 'ngbd-pivot',
  template: `
    <ngbd-content-wrapper component="Pivot">
      <ngbd-example-box demoTitle="Pivot" [snippets]="snippets" component="pivot" demo="basic">
        <ngbd-pivot-basic></ngbd-pivot-basic>
      </ngbd-example-box>
      <ngbd-example-box demoTitle="Pivot" [snippets]="snippets" component="pivot" demo="twolevel">
        <ngbd-pivot-twolevel></ngbd-pivot-twolevel>
      </ngbd-example-box>
    </ngbd-content-wrapper>
`
})
export class NgbdPivot {
  snippets = DEMO_SNIPPETS;
}
