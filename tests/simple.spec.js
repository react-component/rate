import React from 'react';
import { render, mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import Rate from '../src';

describe('rate', () => {
  describe('full', () => {
    it('render works', () => {
      const wrapper = render(
        <Rate count={3} value={1} className="custom" />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('support focus and blur', () => {
      const wrapper = mount(
        <Rate count={3} value={2} />
      );
      wrapper.simulate('focus');
      expect(
        wrapper.find('li').at(1).hasClass('rc-rate-star-focused')
      ).toBe(true);

      wrapper.simulate('blur');
      expect(
        wrapper.find('li').at(1).hasClass('rc-rate-star-focused')
      ).toBe(false);
    });

    it('support keyboard', () => {
      const handleChange = jest.fn();
      const wrapper = mount(
        <Rate count={3} value={1} onChange={handleChange} />
      );
      wrapper.simulate('keyDown', { keyCode: KeyCode.LEFT });
      expect(handleChange).toBeCalledWith(0);
      handleChange.mockReset();
      wrapper.simulate('keyDown', { keyCode: KeyCode.RIGHT });
      expect(handleChange).toBeCalledWith(2);
    });
  });

  describe('allowHalf', () => {
    it('render works', () => {
      const wrapper = render(
        <Rate count={3} value={1.5} allowHalf className="custom" />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('support focus and blur', () => {
      const wrapper = mount(
        <Rate count={3} value={1.5} allowHalf />
      );
      wrapper.simulate('focus');
      expect(
        wrapper.find('li').at(1).hasClass('rc-rate-star-focused')
      ).toBe(true);

      wrapper.simulate('blur');
      expect(
        wrapper.find('li').at(1).hasClass('rc-rate-star-focused')
      ).toBe(false);
    });

    it('support keyboard', () => {
      const handleChange = jest.fn();
      const wrapper = mount(
        <Rate count={3} value={1.5} allowHalf onChange={handleChange} />
      );
      wrapper.simulate('keyDown', { keyCode: KeyCode.LEFT });
      expect(handleChange).toBeCalledWith(1);
      handleChange.mockReset();
      wrapper.simulate('keyDown', { keyCode: KeyCode.RIGHT });
      expect(handleChange).toBeCalledWith(2);
    });
  });
});
