import { NgbdPivotBasic } from './basic/pivot-basic';
import { NgbdPivotTwoLevel } from './twolevel/pivot-twolevel';

export const DEMO_DIRECTIVES = [
  NgbdPivotBasic,
  NgbdPivotTwoLevel
];

export const DEMO_SNIPPETS = {
  basic: {
    code: require('!!prismjs-loader?lang=typescript!./basic/pivot-basic'),
    markup: require('!!prismjs-loader?lang=markup!./basic/pivot-basic.html')
  },
  twolevel: {
    code: require('!!prismjs-loader?lang=typescript!./twolevel/pivot-twolevel'),
    markup: require('!!prismjs-loader?lang=markup!./twolevel/pivot-twolevel.html')
  }
};
