import _addition from './addition';
import _number from './number';
import _tap from './tap';
import _fetch from './fetch';

export const addition = _addition;
export const number = _number;
export const tap = _tap;
export const fetch = _fetch;

const implementations = [
  addition,
  number,
  tap,
  fetch
];

export default implementations;