import React from 'react';
import { render } from 'enzyme';
import Rate from '../src';

describe('rate', () => {
  it('render works', () => {
    const wrapper = render(
      <Rate count={3} value={1.5} allowHalf className="custom" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
