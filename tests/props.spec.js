import React from 'react';
import { mount } from 'enzyme';
import Rate from '../src';

describe('props', () => {
  it('characterRender', () => {
    const wrapper = mount(
      <Rate characterRender={(_, { index }) => <span className="render-holder">{index}</span>} />,
    );

    wrapper.find('li').forEach((li, index) => {
      expect(li.find('span.render-holder').length).toEqual(1);
      expect(li.text()).toEqual(index);
    });
  });
});
