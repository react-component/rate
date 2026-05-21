import { render } from '@testing-library/react';
import React from 'react';
import Rate from '../src';

describe('props', () => {
  it('characterRender', () => {
    const { container } = render(
      <Rate characterRender={(_, { index }) => <span className="render-holder">{index}</span>} />,
    );

    const holders = container.querySelectorAll('span.render-holder');
    expect(holders).toHaveLength(5);

    holders.forEach((span, index) => {
      expect(span.textContent).toEqual(String(index));
    });
  });
});
