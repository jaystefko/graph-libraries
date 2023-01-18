// dataset equivalent for 1, 2, 3 options would be small, medium and large
// for example day, week and month data (where total should be gathered somehow
// not to kill our user with real time data from past month...)
export type Option = 1 | 2 | 3;

// I want to draw graph from START to NOW with value_1
// and the rest should be filled with value_2
// i.e.:
// it's 1:30PM -> from 0:00 up to 1:30PM I have value_1 data which is very granular
// later on (from 1:30PM up to midnight) I have some value_2 data which has more space between
// i.e. value_1 can have 1 minute tick, where value_2 can have 1 hour tick
export type DataPoint = {
  value_1?: number;
  value_2?: number;
  timestamp: number;
};
