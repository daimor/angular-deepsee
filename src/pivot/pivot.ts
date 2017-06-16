import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  AfterViewInit,
  Inject
} from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { NgbPivotConfig } from './pivot-config';

const LightPivotTable = require('deepsee-lightpivottable');
const DataSource = require('deepsee-lightpivottable/source/js/DataSource');
const PivotLocale = require('deepsee-lightpivottable/source/js/PivotLocale');

@Component({
  selector: 'ngb-deepsee-pivot',
  exportAs: 'ngbDeepSeePivot',
  template: ``
})
export class NgbPivot implements OnInit, AfterViewInit {

  @HostBinding('class.ngb-deepsee-pivot') classPivot = true;

  @Input() name: string;

  @Input('data') sourceData: any;

  @Input() mdx: string;

  private pivotOptions: LightPivotTable.Options;

  private pivotTable: LightPivotTable;

  constructor(
    private config: NgbPivotConfig,
    private el: ElementRef,
    private http: Http,
    @Inject('MDX2JSON') private mdx2json: string,
    @Inject('DeepSeeNamespace') private namespace: string
  ) {
    // Set our own _post to handle requests in own way
    if (DataSource) {
      DataSource.prototype._post = (url, body, callback) => {
        this.postData.apply(this, [url, body, callback]);
      };
    }
  }

  ngOnInit() { }

  catchError(error: any) {
    console.error('error', error);
  }

  postData(url, body, callback) {
    let headers = new Headers({
      'Accept': 'application/json'
    });
    let options = new RequestOptions({
      headers
    });

    this.http
      .post(url, body, options)
      .subscribe(
      response => callback(response.json()),
      error => this.catchError(error)
      );
  }

  ngAfterViewInit() {
    let container = this.el.nativeElement;
    this.pivotOptions = Object.assign(this.config, {
      container,
      dataSource: {
        namespace: this.namespace,
        MDX2JSONSource: this.mdx2json,
        pivot: this.name
      },
    });
    this.pivotTable = new LightPivotTable(this.pivotOptions);
  }
}
