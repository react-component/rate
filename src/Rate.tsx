import React from 'react';
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import { getOffsetLeft } from './util';
import Star from './Star';
import type { StarProps } from './Star';

function noop() {}

export interface RateProps extends Pick<StarProps, "count" | "character" | "characterRender" | "allowHalf" | "disabled"> {
  value?: number;
  defaultValue?: number;
  allowClear?: boolean;
  style?: React.CSSProperties;
  starsSpacing?: React.CSSProperties;
  prefixCls?: string;
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
  className?: string;
  tabIndex?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLUListElement>;
  autoFocus?: boolean;
  direction?: string;
}

interface RateState {
  value: number;
  cleanedValue: number;
  hoverValue?: number;
  focused: boolean;
}

class Rate extends React.Component<RateProps, RateState> {
  static defaultProps = {
    defaultValue: 0,
    count: 5,
    allowHalf: false,
    allowClear: true,
    style: {},
    starsStyle: {},
    prefixCls: 'rc-rate',
    onChange: noop,
    character: '★',
    onHoverChange: noop,
    tabIndex: 0,
    direction: 'ltr',
  };

  stars: Record<string, Star>;

  rate: HTMLUListElement;

  constructor(props: RateProps) {
    super(props);
    let { value } = props;
    if (value === undefined) {
      value = props.defaultValue;
    }

    this.stars = {};

    this.state = {
      value,
      focused: false,
      cleanedValue: null,
    };
  }

  componentDidMount() {
    const { autoFocus, disabled } = this.props;
    if (autoFocus && !disabled) {
      this.focus();
    }
  }

  onHover = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const { onHoverChange } = this.props;
    const hoverValue = this.getStarValue(index, event.pageX);
    const { cleanedValue } = this.state;
    if (hoverValue !== cleanedValue) {
      this.setState({
        hoverValue,
        cleanedValue: null,
      });
    }
    onHoverChange(hoverValue);
  };

  onMouseLeave = () => {
    const { onHoverChange } = this.props;
    this.setState({
      hoverValue: undefined,
      cleanedValue: null,
    });
    onHoverChange(undefined);
  };

  onClick = (event: React.MouseEvent | React.KeyboardEvent, index: number) => {
    const { allowClear } = this.props;
    const { value } = this.state;
    const newValue = this.getStarValue(index, (event as React.MouseEvent).pageX);
    let isReset = false;
    if (allowClear) {
      isReset = newValue === value;
    }
    this.onMouseLeave();
    this.changeValue(isReset ? 0 : newValue);
    this.setState({
      cleanedValue: isReset ? newValue : null,
    });
  };

  onFocus = () => {
    const { onFocus } = this.props;
    this.setState({
      focused: true,
    });
    if (onFocus) {
      onFocus();
    }
  };

  onBlur = () => {
    const { onBlur } = this.props;
    this.setState({
      focused: false,
    });
    if (onBlur) {
      onBlur();
    }
  };

  onKeyDown: React.KeyboardEventHandler<HTMLUListElement> = event => {
    const { keyCode } = event;
    const { count, allowHalf, onKeyDown, direction } = this.props;
    const reverse = direction === 'rtl';
    let { value } = this.state;
    if (keyCode === KeyCode.RIGHT && value < count && !reverse) {
      if (allowHalf) {
        value += 0.5;
      } else {
        value += 1;
      }
      this.changeValue(value);
      event.preventDefault();
    } else if (keyCode === KeyCode.LEFT && value > 0 && !reverse) {
      if (allowHalf) {
        value -= 0.5;
      } else {
        value -= 1;
      }
      this.changeValue(value);
      event.preventDefault();
    } else if (keyCode === KeyCode.RIGHT && value > 0 && reverse) {
      if (allowHalf) {
        value -= 0.5;
      } else {
        value -= 1;
      }
      this.changeValue(value);
      event.preventDefault();
    } else if (keyCode === KeyCode.LEFT && value < count && reverse) {
      if (allowHalf) {
        value += 0.5;
      } else {
        value += 1;
      }
      this.changeValue(value);
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  static getDerivedStateFromProps(nextProps: RateProps, state: RateState) {
    if ('value' in nextProps && nextProps.value !== undefined) {
      return {
        ...state,
        value: nextProps.value,
      };
    }
    return state;
  }

  getStarDOM(index: number): HTMLElement {
    return findDOMNode(this.stars[index]);
  }

  getStarValue(index: number, x: number) {
    const { allowHalf, direction } = this.props;
    const reverse = direction === 'rtl';
    let value = index + 1;
    if (allowHalf) {
      const starEle = this.getStarDOM(index);
      const leftDis = getOffsetLeft(starEle);
      const width = starEle.clientWidth;
      if (reverse && x - leftDis > width / 2) {
        value -= 0.5;
      } else if (!reverse && x - leftDis < width / 2) {
        value -= 0.5;
      }
    }
    return value;
  }

  saveRef = (index: number) => (node: Star) => {
    this.stars[index] = node;
  };

  saveRate = (node: HTMLUListElement) => {
    this.rate = node;
  };

  focus() {
    const { disabled } = this.props;
    if (!disabled) {
      this.rate.focus();
    }
  }

  blur() {
    const { disabled } = this.props;
    if (!disabled) {
      this.rate.blur();
    }
  }

  changeValue(value: number) {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    onChange(value);
  }

  render() {
    const {
      count,
      allowHalf,
      style,
      prefixCls,
      disabled,
      className,
      character,
      characterRender,
      tabIndex,
      direction,
      starsSpacing,
    } = this.props;
    const { value, hoverValue, focused } = this.state;
    const stars = [];
    const disabledClass = disabled ? `${prefixCls}-disabled` : '';
    for (let index = 0; index < count; index += 1) {
      stars.push(
        <Star
          ref={this.saveRef(index)}
          index={index}
          count={count}
          disabled={disabled}
          prefixCls={`${prefixCls}-star`}
          allowHalf={allowHalf}
          value={hoverValue === undefined ? value : hoverValue}
          onClick={this.onClick}
          onHover={this.onHover}
          key={index}
          spacing={starsSpacing}
          character={character}
          characterRender={characterRender}
          focused={focused}
        />,
      );
    }
    const rateClassName = classNames(prefixCls, disabledClass, className, {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    });
    return (
      <ul
        className={rateClassName}
        style={style}
        onMouseLeave={disabled ? null : this.onMouseLeave}
        tabIndex={disabled ? -1 : tabIndex}
        onFocus={disabled ? null : this.onFocus}
        onBlur={disabled ? null : this.onBlur}
        onKeyDown={disabled ? null : this.onKeyDown}
        ref={this.saveRate}
        role="radiogroup"
      >
        {stars}
      </ul>
    );
  }
}

export default Rate;
