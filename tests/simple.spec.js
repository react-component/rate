import React from 'react';
import { render, mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import Rate from '../src';

describe('rate', () => {
  describe('full', () => {
    it('render works', () => {
      const wrapper = render(<Rate count={3} value={1} className="custom" />);
      expect(wrapper).toMatchSnapshot();
    });

    it('render works in RTL', () => {
      const wrapper = render(<Rate count={3} value={1} direction="rtl" className="custom" />);
      expect(wrapper).toMatchSnapshot();
    });

    it('support focus and blur', () => {
      const wrapper = mount(<Rate count={3} value={2} />);
      wrapper.simulate('focus');
      expect(
        wrapper
          .find('li')
          .at(1)
          .hasClass('rc-rate-star-focused'),
      ).toBe(true);

      wrapper.simulate('blur');
      expect(
        wrapper
          .find('li')
          .at(1)
          .hasClass('rc-rate-star-focused'),
      ).toBe(false);
    });

    describe('support keyboard', () => {
      it('left & right', () => {
        const handleChange = jest.fn();
        const wrapper = mount(<Rate count={3} value={1} onChange={handleChange} />);
        wrapper.simulate('keyDown', { keyCode: KeyCode.LEFT });
        expect(handleChange).toBeCalledWith(0);
        handleChange.mockReset();
        wrapper.simulate('keyDown', { keyCode: KeyCode.RIGHT });
        expect(handleChange).toBeCalledWith(2);
      });

      it('enter', () => {
        const handleChange = jest.fn();
        const wrapper = mount(<Rate count={3} value={1} onChange={handleChange} />);
        wrapper
          .find('li > div')
          .at(2)
          .simulate('keyDown', { keyCode: KeyCode.ENTER });
        expect(handleChange).toBeCalledWith(3);
      });
    });

    describe('support keyboard in RTL', () => {
      it('left & right', () => {
        const handleChange = jest.fn();
        const wrapper = mount(<Rate count={3} value={1} direction="rtl" onChange={handleChange} />);
        wrapper.simulate('keyDown', { keyCode: KeyCode.LEFT });
        expect(handleChange).toBeCalledWith(2);
        handleChange.mockReset();
        wrapper.simulate('keyDown', { keyCode: KeyCode.RIGHT });
        expect(handleChange).toBeCalledWith(0);
      });

      it('enter', () => {
        const handleChange = jest.fn();
        const wrapper = mount(<Rate count={3} value={1} direction="rtl" onChange={handleChange} />);
        wrapper
          .find('li > div')
          .at(2)
          .simulate('keyDown', { keyCode: KeyCode.ENTER });
        expect(handleChange).toBeCalledWith(3);
      });
    });
  });

  describe('allowHalf', () => {
    it('render works', () => {
      const wrapper = render(<Rate count={3} value={1.5} allowHalf className="custom" />);
      expect(wrapper).toMatchSnapshot();
    });

    it('render works in RTL', () => {
      const wrapper = render(
        <Rate count={3} value={1.5} allowHalf direction="rtl" className="custom" />,
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('click works', () => {
      const wrapper = mount(<Rate count={5} value={4.5} allowHalf />);
      wrapper
        .find('li > div')
        .at(2)
        .simulate('click');
      expect(
        wrapper
          .find('li')
          .at(4)
          .hasClass('rc-rate-star-full'),
      ).toBe(false);
    });

    it('support focus and blur', () => {
      const wrapper = mount(<Rate count={3} value={1.5} allowHalf />);
      wrapper.simulate('focus');
      expect(
        wrapper
          .find('li')
          .at(1)
          .hasClass('rc-rate-star-focused'),
      ).toBe(true);

      wrapper.simulate('blur');
      expect(
        wrapper
          .find('li')
          .at(1)
          .hasClass('rc-rate-star-focused'),
      ).toBe(false);
    });

    it('support keyboard', () => {
      const handleChange = jest.fn();
      const wrapper = mount(<Rate count={3} value={1.5} allowHalf onChange={handleChange} />);
      wrapper.simulate('keyDown', { keyCode: KeyCode.LEFT });
      expect(handleChange).toBeCalledWith(1);
      handleChange.mockReset();
      wrapper.simulate('keyDown', { keyCode: KeyCode.RIGHT });
      expect(handleChange).toBeCalledWith(2);
    });

    it('support keyboard in RTL', () => {
      const handleChange = jest.fn();
      const wrapper = mount(<Rate count={3} value={1.5} allowHalf direction="rtl" onChange={handleChange} />);
      wrapper.simulate('keyDown', { keyCode: KeyCode.LEFT });
      expect(handleChange).toBeCalledWith(2);
      handleChange.mockReset();
      wrapper.simulate('keyDown', { keyCode: KeyCode.RIGHT });
      expect(handleChange).toBeCalledWith(1);
    });
  });

  describe('allowClear', () => {
    it('allowClear is false', () => {
      const handleChange = jest.fn();
      const wrapper = mount(
        <Rate count={5} value={1} allowClear={false} onChange={handleChange} />,
      );
      wrapper
        .find('li > div')
        .at(3)
        .simulate('click');
      wrapper
        .find('li > div')
        .at(3)
        .simulate('click');
      expect(handleChange).toBeCalledWith(4);
    });
    it('allowClear is true', () => {
      const handleChange = jest.fn();
      const wrapper = mount(<Rate count={5} value={4} onChange={handleChange} />);
      wrapper
        .find('li > div')
        .at(3)
        .simulate('click');
      expect(handleChange).toBeCalledWith(0);
    });
    it('cleaned star disable hover', () => {
      const wrapper = mount(<Rate count={5} defaultValue={4} />);
      wrapper
        .find('li > div')
        .at(3)
        .simulate('click');
      wrapper
        .find('li > div')
        .at(3)
        .simulate('mouseMove');
      expect(
        wrapper
          .find('li')
          .at(3)
          .hasClass('rc-rate-star-full'),
      ).toBe(false);
    });
    it('cleaned star reset', () => {
      const wrapper = mount(<Rate count={5} defaultValue={4} />);
      wrapper
        .find('li > div')
        .at(3)
        .simulate('click');
      wrapper.find('ul').simulate('mouseLeave');
      wrapper
        .find('li > div')
        .at(3)
        .simulate('mouseMove');
      expect(
        wrapper
          .find('li')
          .at(3)
          .hasClass('rc-rate-star-full'),
      ).toBe(true);
    });
  });

  describe('focus & blur', () => {
    let container;
    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('focus()', () => {
      const handleFocus = jest.fn();
      const wrapper = mount(<Rate count={3} value={1} onFocus={handleFocus} />, {
        attachTo: container,
      });
      wrapper.instance().focus();
      expect(handleFocus).toBeCalled();
    });

    it('blur()', () => {
      const handleBlur = jest.fn();
      const wrapper = mount(<Rate count={3} value={1} onBlur={handleBlur} />, {
        attachTo: container,
      });
      wrapper.instance().focus();
      wrapper.instance().blur();
      expect(handleBlur).toBeCalled();
    });

    it('autoFocus', () => {
      const handleFocus = jest.fn();
      mount(<Rate autoFocus count={3} value={1} onFocus={handleFocus} />, { attachTo: container });
      expect(handleFocus).toBeCalled();
    });
  });

  describe('right class', () => {
    it('rtl', () => {
      const wrapper = mount(<Rate count={3} value={1} direction="rtl" />);
      expect(wrapper.find('.rc-rate-rtl').length).toBe(1);
    });
    it('disabled', () => {
      const wrapper = mount(<Rate count={3} value={1} disabled />);
      expect(wrapper.find('.rc-rate-disabled').length).toBe(1);
    });
  });
});
