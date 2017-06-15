// tslint:disable:max-line-length
module.exports = [
  {
    mdx: 'SELECT NON EMPTY NONEMPTYCROSSJOIN([GenD].[H1].[Gender].Members,{[Measures].[%Count],[MEASURES].[AVG ALLERGY COUNT]}) ON 0,NON EMPTY HEAD(NONEMPTYCROSSJOIN([AgeD].[H1].[Age Group].Members,[AgeD].[H1].[Age Bucket].Members),2000,SAMPLE) ON 1 FROM [PATIENTS]',
    data: require('./data1.json')
  },
  {
    mdx: 'SELECT NON EMPTY [Measures].[%COUNT] ON 0,NON EMPTY [ColorD].[H1].[Favorite Color].Members ON 1 FROM [PATIENTS]',
    data: require('./data2.json')
  },
  {
    mdx: 'SELECT NON EMPTY NONEMPTYCROSSJOIN([GenD].[H1].[Gender].Members,{[Measures].[%Count],[MEASURES].[AVG ALLERGY COUNT]}) ON 0,NON EMPTY NONEMPTYCROSSJOIN([AgeD].[H1].[Age Group].&[0 to 29],[AgeD].[H1].[Age Bucket].&[0 to 9].children) ON 1 FROM [PATIENTS] %FILTER ([AgeD].[H1].[Age Group].&[0 to 29],[AgeD].[H1].[Age Bucket].&[0 to 9])',
    data: require('./data3.json')
  },
  {
    mdx: 'SELECT NON EMPTY NONEMPTYCROSSJOIN([GenD].[H1].[Gender].Members,{[Measures].[%Count],[MEASURES].[AVG ALLERGY COUNT]}) ON 0,NON EMPTY NONEMPTYCROSSJOIN([AgeD].[H1].[Age Group].&[0 to 29],[AgeD].[H1].[Age Bucket].&[10 to 19].children) ON 1 FROM [PATIENTS] %FILTER ([AgeD].[H1].[Age Group].&[0 to 29],[AgeD].[H1].[Age Bucket].&[10 to 19])',
    data: require('./data4.json')
  },
  {
    mdx: 'SELECT NON EMPTY NONEMPTYCROSSJOIN([GenD].[H1].[Gender].Members,{[Measures].[%Count],[MEASURES].[AVG ALLERGY COUNT]}) ON 0,NON EMPTY NONEMPTYCROSSJOIN([AgeD].[H1].[Age Group].&[0 to 29],[AgeD].[H1].[Age Bucket].&[20 to 29].children) ON 1 FROM [PATIENTS] %FILTER ([AgeD].[H1].[Age Group].&[0 to 29],[AgeD].[H1].[Age Bucket].&[20 to 29])',
    data: require('./data5.json')
  },
  {
    mdx: 'SELECT NON EMPTY NONEMPTYCROSSJOIN([GenD].[H1].[Gender].Members,{[Measures].[%Count],[MEASURES].[AVG ALLERGY COUNT]}) ON 0,NON EMPTY NONEMPTYCROSSJOIN([AgeD].[H1].[Age Group].&[30 to 59],[AgeD].[H1].[Age Bucket].&[30 to 39].children) ON 1 FROM [PATIENTS] %FILTER ([AgeD].[H1].[Age Group].&[30 to 59],[AgeD].[H1].[Age Bucket].&[30 to 39])',
    data: require('./data6.json')
  },
  {
    mdx: 'SELECT NON EMPTY NONEMPTYCROSSJOIN([GenD].[H1].[Gender].Members,{[Measures].[%Count],[MEASURES].[AVG ALLERGY COUNT]}) ON 0,NON EMPTY NONEMPTYCROSSJOIN([AgeD].[H1].[Age Group].&[30 to 59],[AgeD].[H1].[Age Bucket].&[40 to 49].children) ON 1 FROM [PATIENTS] %FILTER ([AgeD].[H1].[Age Group].&[30 to 59],[AgeD].[H1].[Age Bucket].&[40 to 49])',
    data: require('./data7.json')
  },
  {
    mdx: 'SELECT NON EMPTY NONEMPTYCROSSJOIN([GenD].[H1].[Gender].Members,{[Measures].[%Count],[MEASURES].[AVG ALLERGY COUNT]}) ON 0,NON EMPTY NONEMPTYCROSSJOIN([AgeD].[H1].[Age Group].&[30 to 59],[AgeD].[H1].[Age Bucket].&[50 to 59].children) ON 1 FROM [PATIENTS] %FILTER ([AgeD].[H1].[Age Group].&[30 to 59],[AgeD].[H1].[Age Bucket].&[50 to 59])',
    data: require('./data8.json')
  },
  {
    mdx: 'SELECT NON EMPTY NONEMPTYCROSSJOIN([GenD].[H1].[Gender].Members,{[Measures].[%Count],[MEASURES].[AVG ALLERGY COUNT]}) ON 0,NON EMPTY NONEMPTYCROSSJOIN([AgeD].[H1].[Age Group].&[60+],[AgeD].[H1].[Age Bucket].&[60 to 69].children) ON 1 FROM [PATIENTS] %FILTER ([AgeD].[H1].[Age Group].&[60+],[AgeD].[H1].[Age Bucket].&[60 to 69])',
    data: require('./data9.json')
  },
  {
    mdx: 'SELECT NON EMPTY NONEMPTYCROSSJOIN([GenD].[H1].[Gender].Members,{[Measures].[%Count],[MEASURES].[AVG ALLERGY COUNT]}) ON 0,NON EMPTY NONEMPTYCROSSJOIN([AgeD].[H1].[Age Group].&[60+],[AgeD].[H1].[Age Bucket].&[70 to 79].children) ON 1 FROM [PATIENTS] %FILTER ([AgeD].[H1].[Age Group].&[60+],[AgeD].[H1].[Age Bucket].&[70 to 79])',
    data: require('./data10.json')
  },
  {
    mdx: 'SELECT NON EMPTY NONEMPTYCROSSJOIN([GenD].[H1].[Gender].Members,{[Measures].[%Count],[MEASURES].[AVG ALLERGY COUNT]}) ON 0,NON EMPTY NONEMPTYCROSSJOIN([AgeD].[H1].[Age Group].&[60+],[AgeD].[H1].[Age Bucket].&[80+].children) ON 1 FROM [PATIENTS] %FILTER ([AgeD].[H1].[Age Group].&[60+],[AgeD].[H1].[Age Bucket].&[80+])',
    data: require('./data11.json')
  }
  , {
    mdx: '',
    data: require('./empty.json')
  }
];
