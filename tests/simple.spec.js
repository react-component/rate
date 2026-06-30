import { KeyCode } from '@rc-component/util';
import { act, createEvent, fireEvent, render } from '@testing-library/react';
import React from 'react';
import Rate from '../src';

const getRate = (container) => container.querySelector('.rc-rate');
const getStars = (container) => Array.from(container.querySelectorAll('li'));
const getStar = (container, index) => getStars(container)[index];
const getStarHandler = (container, index) => container.querySelectorAll('li > div')[index];
const mouseMoveWithPageX = (target, pageX) => {
  const event = createEvent.mouseMove(target);
  Object.defineProperty(event, 'pageX', {
    configurable: true,
    value: pageX,
  });
  fireEvent(target, event);
};
const mockStarRect = (container, index, width = 2) => {
  const star = getStar(container, index);
  Object.defineProperty(star, 'clientWidth', {
    configurable: true,
    value: width,
  });
  star.getBoundingClientRect = () => ({
    bottom: 0,
    height: 0,
    left: 0,
    right: width,
    top: 0,
    width,
  });
};

describe('rate', () => {
  describe('full', () => {
    it('render works', () => {
      const { container } = render(<Rate count={3} value={1} className="custom" />);
      expect(getRate(container)).toMatchSnapshot();
    });

    it('render works in RTL', () => {
      const { container } = render(<Rate count={3} value={1} direction="rtl" className="custom" />);
      expect(getRate(container)).toMatchSnapshot();
    });

    it('render works with character node', () => {
      const { container } = render(<Rate count={3} value={1} character="1" />);
      expect(getRate(container)).toMatchSnapshot();
    });

    it('render works with character function', () => {
      const { container } = render(
        <Rate
          count={3}
          value={1}
          character={({ index }) => {
            return index + 1;
          }}
        />,
      );
      expect(getRate(container)).toMatchSnapshot();
    });

    it('click works', () => {
      const handleChange = jest.fn();
      const { container } = render(<Rate count={3} value={1} onChange={handleChange} />);
      fireEvent.click(getStarHandler(container, 1));
      expect(handleChange).toBeCalledWith(2);
    });

    it('click works in RTL', () => {
      const handleChange = jest.fn();
      const { container } = render(
        <Rate count={3} value={1} direction="rtl" onChange={handleChange} />,
      );
      fireEvent.click(getStarHandler(container, 1));
      expect(handleChange).toBeCalledWith(2);
    });

    it('support mouseMove', () => {
      const { container } = render(<Rate count={3} value={1} />);
      fireEvent.mouseMove(getStarHandler(container, 1));
      expect(getStar(container, 1).classList.contains('rc-rate-star-full')).toBe(true);
    });

    it('support mouseMove in RTL', () => {
      const { container } = render(<Rate count={3} value={1} direction="rtl" />);
      fireEvent.mouseMove(getStarHandler(container, 1));
      expect(getStar(container, 1).classList.contains('rc-rate-star-full')).toBe(true);
    });

    it('support focus and blur', () => {
      const { container } = render(<Rate count={3} value={2} />);
      fireEvent.focus(getRate(container));
      expect(getStar(container, 1).classList.contains('rc-rate-star-focused')).toBe(true);

      fireEvent.blur(getRate(container));
      expect(getStar(container, 1).classList.contains('rc-rate-star-focused')).toBe(false);
    });

    it('support focus and blur in RTL', () => {
      const { container } = render(<Rate count={3} value={2} direction="rtl" />);
      fireEvent.focus(getRate(container));
      expect(getStar(container, 1).classList.contains('rc-rate-star-focused')).toBe(true);

      fireEvent.blur(getRate(container));
      expect(getStar(container, 1).classList.contains('rc-rate-star-focused')).toBe(false);
    });

    describe('support keyboard', () => {
      it('left & right', () => {
        const handleChange = jest.fn();
        const { container } = render(<Rate count={3} value={1} onChange={handleChange} />);
        fireEvent.keyDown(getRate(container), { keyCode: KeyCode.LEFT });
        expect(handleChange).toBeCalledWith(0);
        handleChange.mockReset();
        fireEvent.keyDown(getRate(container), { keyCode: KeyCode.RIGHT });
        expect(handleChange).toBeCalledWith(2);
      });

      it('enter', () => {
        const handleChange = jest.fn();
        const { container } = render(<Rate count={3} value={1} onChange={handleChange} />);
        fireEvent.keyDown(getStarHandler(container, 2), { keyCode: KeyCode.ENTER });
        expect(handleChange).toBeCalledWith(3);
      });
    });

    describe('support keyboard in RTL', () => {
      it('left & right', () => {
        const handleChange = jest.fn();
        const { container } = render(
          <Rate count={3} value={1} direction="rtl" onChange={handleChange} />,
        );
        fireEvent.keyDown(getRate(container), { keyCode: KeyCode.LEFT });
        expect(handleChange).toBeCalledWith(2);
        handleChange.mockReset();
        fireEvent.keyDown(getRate(container), { keyCode: KeyCode.RIGHT });
        expect(handleChange).toBeCalledWith(0);
      });

      it('enter', () => {
        const handleChange = jest.fn();
        const { container } = render(
          <Rate count={3} value={1} direction="rtl" onChange={handleChange} />,
        );
        fireEvent.keyDown(getStarHandler(container, 2), { keyCode: KeyCode.ENTER });
        expect(handleChange).toBeCalledWith(3);
      });
    });
  });

  describe('allowHalf', () => {
    it('render works', () => {
      const { container } = render(<Rate count={3} value={1.5} allowHalf className="custom" />);
      expect(getRate(container)).toMatchSnapshot();
    });

    it('render works more than half ', () => {
      const { container } = render(<Rate count={3} value={1.6} allowHalf className="custom" />);
      expect(getRate(container)).toMatchSnapshot();
    });

    it('render works in RTL', () => {
      const { container } = render(
        <Rate count={3} value={1.5} allowHalf direction="rtl" className="custom" />,
      );
      expect(getRate(container)).toMatchSnapshot();
    });

    it('click works', () => {
      const { container } = render(<Rate count={5} value={4.5} allowHalf />);
      fireEvent.click(getStarHandler(container, 2));
      expect(getStar(container, 4).classList.contains('rc-rate-star-full')).toBe(false);
    });

    it('support focus and blur', () => {
      const { container } = render(<Rate count={3} value={1.5} allowHalf />);
      fireEvent.focus(getRate(container));
      expect(getStar(container, 1).classList.contains('rc-rate-star-focused')).toBe(true);

      fireEvent.blur(getRate(container));
      expect(getStar(container, 1).classList.contains('rc-rate-star-focused')).toBe(false);
    });

    it('support focus and blur in RTL', () => {
      const { container } = render(<Rate count={3} value={1.5} direction="rtl" allowHalf />);
      fireEvent.focus(getRate(container));
      expect(getStar(container, 1).classList.contains('rc-rate-star-focused')).toBe(true);

      fireEvent.blur(getRate(container));
      expect(getStar(container, 1).classList.contains('rc-rate-star-focused')).toBe(false);
    });

    it('support keyboard', () => {
      const handleChange = jest.fn();
      const { container } = render(
        <Rate count={3} value={1.5} allowHalf onChange={handleChange} />,
      );
      fireEvent.keyDown(getRate(container), { keyCode: KeyCode.LEFT });
      expect(handleChange).toBeCalledWith(1);
      handleChange.mockReset();
      fireEvent.keyDown(getRate(container), { keyCode: KeyCode.RIGHT });
      expect(handleChange).toBeCalledWith(2);
    });

    it('support keyboard in RTL', () => {
      const handleChange = jest.fn();
      const { container } = render(
        <Rate count={3} value={1.5} allowHalf direction="rtl" onChange={handleChange} />,
      );
      fireEvent.keyDown(getRate(container), { keyCode: KeyCode.LEFT });
      expect(handleChange).toBeCalledWith(2);
      handleChange.mockReset();
      fireEvent.keyDown(getRate(container), { keyCode: KeyCode.RIGHT });
      expect(handleChange).toBeCalledWith(1);
    });

    it('hover Rate of allowHalf', () => {
      const onHoverChange = jest.fn();
      const { container } = render(
        <Rate count={3} value={1} allowHalf onHoverChange={onHoverChange} />,
      );
      mockStarRect(container, 1);
      mouseMoveWithPageX(getStarHandler(container, 1), 0);
      expect(onHoverChange).toHaveBeenCalledWith(1.5);
    });

    it('hover Rate of allowHalf and rtl', () => {
      const onHoverChange = jest.fn();
      const { container } = render(
        <Rate count={3} value={1} allowHalf direction="rtl" onHoverChange={onHoverChange} />,
      );
      mockStarRect(container, 1);
      mouseMoveWithPageX(getStarHandler(container, 1), 2);
      expect(onHoverChange).toHaveBeenCalledWith(1.5);
    });
  });

  describe('allowClear', () => {
    it('allowClear is false', () => {
      const handleChange = jest.fn();
      const { container } = render(
        <Rate count={5} value={1} allowClear={false} onChange={handleChange} />,
      );
      fireEvent.click(getStarHandler(container, 3));
      fireEvent.click(getStarHandler(container, 3));
      expect(handleChange).toBeCalledWith(4);
    });
    it('allowClear is true', () => {
      const handleChange = jest.fn();
      const { container } = render(<Rate count={5} value={4} onChange={handleChange} />);
      fireEvent.click(getStarHandler(container, 3));
      expect(handleChange).toBeCalledWith(0);
    });
    it('cleaned star disable hover', () => {
      const { container } = render(<Rate count={5} defaultValue={4} />);
      fireEvent.click(getStarHandler(container, 3));
      fireEvent.mouseMove(getStarHandler(container, 3));
      expect(getStar(container, 3).classList.contains('rc-rate-star-full')).toBe(false);
    });
    it('cleaned star reset', () => {
      const { container } = render(<Rate count={5} defaultValue={4} />);
      fireEvent.click(getStarHandler(container, 3));
      fireEvent.mouseLeave(getRate(container));
      fireEvent.mouseMove(getStarHandler(container, 3));
      expect(getStar(container, 3).classList.contains('rc-rate-star-full')).toBe(true);
    });
  });

  describe('focus & blur', () => {
    it('focus()', () => {
      const handleFocus = jest.fn();
      const rateRef = React.createRef();
      render(<Rate ref={rateRef} count={3} value={1} onFocus={handleFocus} />);
      act(() => {
        rateRef.current.focus();
      });
      expect(handleFocus).toBeCalled();
    });

    it('blur()', () => {
      const handleBlur = jest.fn();
      const rateRef = React.createRef();
      render(<Rate ref={rateRef} count={3} value={1} onBlur={handleBlur} />);
      act(() => {
        rateRef.current.focus();
        rateRef.current.blur();
      });
      expect(handleBlur).toBeCalled();
    });

    it('autoFocus', () => {
      const handleFocus = jest.fn();
      render(<Rate autoFocus count={3} value={1} onFocus={handleFocus} />);
      expect(handleFocus).toBeCalled();
    });
  });

  describe('right class', () => {
    it('rtl', () => {
      const { container } = render(<Rate count={3} value={1} direction="rtl" />);
      expect(getRate(container).classList.contains('rc-rate-rtl')).toBe(true);
    });
    it('disabled', () => {
      const { container } = render(<Rate count={3} value={1} disabled />);
      expect(getRate(container).classList.contains('rc-rate-disabled')).toBe(true);
    });
  });

  describe('events', () => {
    it('onKeyDown', () => {
      const onKeyDown = jest.fn();
      const { container } = render(<Rate count={3} onKeyDown={onKeyDown} />);
      fireEvent.keyDown(getRate(container));
      expect(onKeyDown).toHaveBeenCalled();
    });

    // https://github.com/ant-design/ant-design/issues/30940
    it('range picker should accept onMouseEnter and onMouseLeave event when Rate component is diabled', () => {
      const handleMouseEnter = jest.fn();
      const handleMouseLeave = jest.fn();
      const { container } = render(
        <Rate onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} disabled />,
      );
      fireEvent.mouseEnter(getRate(container));
      expect(handleMouseEnter).toHaveBeenCalled();
      fireEvent.mouseLeave(getRate(container));
      expect(handleMouseLeave).toHaveBeenCalled();
    });

    it('range picker should accept onMouseEnter and onMouseLeave event when Rate component is not diabled', () => {
      const handleMouseEnter = jest.fn();
      const handleMouseLeave = jest.fn();
      const { container } = render(
        <Rate onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />,
      );
      fireEvent.mouseEnter(getRate(container));
      expect(handleMouseEnter).toHaveBeenCalled();
      fireEvent.mouseLeave(getRate(container));
      expect(handleMouseLeave).toHaveBeenCalled();
    });

    it('should ignore key presses when keyboard is false', () => {
      const mockChange = jest.fn();
      const mockKeyDown = jest.fn();
      const { container } = render(
        <Rate defaultValue={3} onChange={mockChange} onKeyDown={mockKeyDown} keyboard={false} />,
      );
      fireEvent.keyDown(getRate(container), { keyCode: KeyCode.LEFT });
      expect(mockChange).not.toHaveBeenCalled();
      expect(mockKeyDown).toHaveBeenCalled();
    });
  });

  describe('html attributes', () => {
    it('data-* and aria-* and role', () => {
      const { container } = render(<Rate data-number="1" aria-label="label" role="button" />);
      expect(getRate(container).getAttribute('data-number')).toBe('1');
      expect(getRate(container).getAttribute('aria-label')).toBe('label');
      expect(getRate(container).getAttribute('role')).toBe('button');
    });
    it('id', () => {
      const { container } = render(<Rate id="myrate" />);
      expect(getRate(container).getAttribute('id')).toBe('myrate');
    });
  });
});
