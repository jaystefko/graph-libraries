import { DataPoint, Option } from './types';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;

function getStep(option: Option, size: Option, isB4Halve: boolean) {
  switch (option) {
    case 1:
      switch (size) {
        case 3:
          return isB4Halve ? getValue(10) : SECOND;
        case 2:
          return isB4Halve ? getValue(10) * SECOND : MINUTE;
        default:
          return isB4Halve ? getValue(10) * MINUTE : HOUR;
      }
    case 2:
      switch (size) {
        case 3:
          return isB4Halve ? getValue(10) * SECOND : MINUTE;
        case 2:
          return isB4Halve ? getValue(10) * MINUTE : HOUR;
        default:
          return isB4Halve ? getValue(10) * HOUR : DAY;
      }
    default:
      switch (size) {
        case 3:
          return MINUTE;
        case 2:
          return HOUR;
        default:
          return DAY;
      }
  }
}

function getStop(option: Option, start: number) {
  switch (option) {
    case 1:
      return start + DAY;
    case 2:
      return start + WEEK;
    default:
      return start + MONTH;
  }
}

function getValue(MAX = 100) {
  return 1 + Math.round(Math.random() * MAX);
}

function getData(option: Option, size: Option) {
  const START = new Date('2023/01/01').getTime();
  const STOP = getStop(option, START);
  const HALVE = Math.round((START + STOP) / 2);
  const result: Array<DataPoint> = [];
  let guard = START;
  let amount = 0;

  do {
    amount += getValue();
    result.push({
      timestamp: guard,
      value_1: amount,
      value_2: undefined,
    });
    guard += getStep(option, size, true);
  } while (guard <= HALVE);

  result[result.length - 1].value_2 = amount;

  do {
    amount += getValue();
    result.push({
      timestamp: guard,
      value_1: undefined,
      value_2: amount,
    });
    guard += getStep(option, size, false);
  } while (guard <= STOP);

  return result;
}

export default getData;
