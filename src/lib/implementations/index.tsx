import _addition from './addition';
import _number from './number';
import _tap from './tap';

export const addition = _addition;
export const number = _number;
export const tap = _tap;

const implementations = [
  addition,
  number,
  tap
];

export default implementations;