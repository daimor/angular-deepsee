import { Injectable } from '@angular/core';

const LightPivotTable = require('lightpivottable');

@Injectable()
export class NgbPivotConfig {

  dataSource: LightPivotTable.DataSourceConfig;

  /**
   * localization
   * @default "en"
   */
  locale?: string;

  /**
   * Stretch columns to fill available container space
   * @default false
   */
  stretchColumns?: boolean;

  /**
   * Maximum rows number on one page (default: 200, turn off: 0)
   * @default 200
   */
  pagination?: number;

  /**
   * make columns resizable (default: true)
   * @default true
   */
  columnResizing?: boolean;

  /**
   * animate column when resizing
   */
  columnResizeAnimation?: boolean;

  /**
   * show summary by columns
   */
  showSummary?: boolean;

  /**
   * show the row number in first column
   */
  showRowNumbers?: boolean;

  /**
   * format for output numbers in pivot table
   */
  formatNumbers?: string;

  constructor() {
    this.locale = 'en';
    this.pagination = 200;
    this.stretchColumns = false;
    this.columnResizeAnimation = true;
    this.formatNumbers = '#,###.##';
  }
}
