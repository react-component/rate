import { render } from '@testing-library/react';
import React from 'react';
import Rate from '../src';

describe('props', () => {
  it('characterRender', () => {
    const { container } = render(
      <Rate characterRender={(_, { index }) => <span className="render-holder">{index}</span>} />,
    );

    Array.from(container.querySelectorAll('li')).forEach((li, index) => {
      expect(li.querySelectorAll('span.render-holder')).toHaveLength(1);
      expect(li.textContent).toEqual(String(index));
    });
  });
});
