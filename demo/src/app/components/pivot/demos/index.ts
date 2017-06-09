import {NgbdPivotBasic} from './basic/pivot-basic';

export const DEMO_DIRECTIVES = [
  NgbdPivotBasic
];

export const DEMO_SNIPPETS = {
  basic: {
    code: require('!!prismjs-loader?lang=typescript!./basic/pivot-basic'),
    markup: require('!!prismjs-loader?lang=markup!./basic/pivot-basic.html')
  }
};
