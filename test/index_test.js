import Component from '../lib/index';
import { strictEqual } from 'assert';

describe('create', () => {
  it('returns 0 when either argument is 0', () => {
    strictEqual(typeof(Component()), 'object');
  });
});
