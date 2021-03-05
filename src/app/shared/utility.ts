const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

export const getUserPreferedTheme  = () => {
    let theme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      theme = 'dark';
    } else {
      theme = 'default';
    }
    return localStorage.getItem('theme') || theme;
}
export const getTimeRange = (fromDate, toDate, type) => {
  console.log('dates', fromDate, toDate, type)
  const range = moment.range(fromDate, toDate);
  // const start = moment("2017-01-01T13:30:00");
  // const end = moment("2017-01-05T01:45:12");
  const r1 = moment.range(fromDate, toDate);
  const r2 = r1.snapTo('day');
   
  // Array.from(r1.by('days')).map((m: any) => m.format('DD')); // ['01', '02', '03', '04']
  Array.from(r2.by('days')).map((m: any) => m.format('DD'));
  
  // for (let month of range.by('month')) {
  //   month.format('YYYY-MM-DD');
  // }

  // const years = Array.from(range.by('year'));
  // years.map((m: any) => m.format('YYYY'));
}