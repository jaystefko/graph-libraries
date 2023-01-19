import { Option } from '../types';

export function unifyLabel(label: string | number) {
  return `0${label}`.slice(-2);
}

export function formatLabel(option: Option, timestamp: number) {
  const date = new Date(timestamp);

  if (option === 1) {
    return `${unifyLabel(date.getHours())}.${unifyLabel(date.getMinutes())}`;
  }

  return `${unifyLabel(date.getDate())}.${unifyLabel(date.getMonth() + 1)}`;
}
