import * as React from 'react';
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import { getOffsetLeft } from './util';
import Star, { StarProps } from './Star';

function noop() {}

export interface RateProps {
  disabled?: boolean;
  value?: number;
  defaultValue?: number;
  count?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
  className?: string;
  character?: (props: StarProps) => React.ReactNode | React.ReactNode;
  characterRender?: (origin: React.ReactElement, props: StarProps) => React.ReactNode;
  tabIndex?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLUListElement>;
  autoFocus?: boolean;
  direction?: string;
}

const Rate = React.forwardRef<unknown, RateProps>((props, ref) => {
  const [stateValue, setStateValue] = React.useState(undefined);
  const [cleanedValue, setCleanedValue] = React.useState(null);
  const [hoverValue, setHoverValue] = React.useState(undefined);
  const [focused, setFocused] = React.useState(false);

  let stars: Record<string, StarProps>;
  let rate: HTMLUListElement;

  const focus = () => {
    const { disabled } = props;
    if (!disabled) {
      rate.focus();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const blur = () => {
    const { disabled } = props;
    if (!disabled) {
      rate.blur();
    }
  };

  React.useEffect(() => {
    let { value } = props;
    if (value === undefined) {
      value = props.defaultValue;
    }
    setStateValue(value);
    stars = {};
  }, []);

  React.useEffect(() => {
    const { autoFocus, disabled } = props;
    if (autoFocus && !disabled) {
      focus();
    }
  }, []);

  React.useEffect(() => {
    setStateValue(props.value);
  }, [props.value]);

  const getStarDOM = (index: number): HTMLElement => {
    return findDOMNode(stars[index]);
  };

  const getStarValue = (index: number, x: number) => {
    const { allowHalf, direction } = props;
    const reverse = direction === 'rtl';
    let value = index + 1;
    if (allowHalf) {
      const starEle = getStarDOM(index);
      const leftDis = getOffsetLeft(starEle);
      const width = starEle.clientWidth;
      if (reverse && x - leftDis > width / 2) {
        value -= 0.5;
      } else if (!reverse && x - leftDis < width / 2) {
        value -= 0.5;
      }
    }
    return value;
  };

  const changeValue = (value: number) => {
    const { onChange } = props;
    if (!('value' in props)) {
      setStateValue(value);
    }
    onChange(value);
  };

  const onHover = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const { onHoverChange } = props;
    const hoverStarValue = getStarValue(index, event.pageX);
    if (hoverStarValue !== cleanedValue) {
      setHoverValue(hoverStarValue);
      setCleanedValue(null);
    }
    onHoverChange(hoverStarValue);
  };

  const onFocus = () => {
    setFocused(true);
    if (props.onFocus) {
      props.onFocus();
    }
  };

  const onBlur = () => {
    setFocused(false);
    if (props.onBlur) {
      props.onBlur();
    }
  };

  const onMouseLeave = () => {
    const { onHoverChange } = props;
    setHoverValue(undefined);
    setCleanedValue(null);
    onHoverChange(undefined);
  };

  const onClick = (event: React.MouseEvent | React.KeyboardEvent, index: number) => {
    const { allowClear } = props;
    const newValue = getStarValue(index, (event as React.MouseEvent).pageX);
    let isReset = false;
    if (allowClear) {
      isReset = newValue === stateValue;
    }
    onMouseLeave();
    changeValue(isReset ? 0 : newValue);
    setCleanedValue(isReset ? newValue : null);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLUListElement> = event => {
    const { keyCode } = event;
    const { count, allowHalf, onKeyDown: onKeyDownProp, direction } = props;
    const reverse = direction === 'rtl';
    let value = stateValue;
    if (keyCode === KeyCode.RIGHT && value < count && !reverse) {
      if (allowHalf) {
        value += 0.5;
      } else {
        value += 1;
      }
      changeValue(value);
      event.preventDefault();
    } else if (keyCode === KeyCode.LEFT && value > 0 && !reverse) {
      if (allowHalf) {
        value -= 0.5;
      } else {
        value -= 1;
      }
      changeValue(value);
      event.preventDefault();
    } else if (keyCode === KeyCode.RIGHT && value > 0 && reverse) {
      if (allowHalf) {
        value -= 0.5;
      } else {
        value -= 1;
      }
      changeValue(value);
      event.preventDefault();
    } else if (keyCode === KeyCode.LEFT && value < count && reverse) {
      if (allowHalf) {
        value += 0.5;
      } else {
        value += 1;
      }
      changeValue(value);
      event.preventDefault();
    }
    if (onKeyDownProp) {
      onKeyDownProp(event);
    }
  };

  const saveRef = (index: number) => (node: StarProps) => {
    stars[index] = node;
  };

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
  } = props;

  const starsNode = [];
  const disabledClass = disabled ? `${prefixCls}-disabled` : '';
  for (let index = 0; index < count; index += 1) {
    starsNode.push(
      <Star
        ref={saveRef(index)}
        index={index}
        count={count}
        disabled={disabled}
        prefixCls={`${prefixCls}-star`}
        allowHalf={allowHalf}
        value={hoverValue === undefined ? stateValue : hoverValue}
        onClick={onClick}
        onHover={onHover}
        key={index}
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
      onMouseLeave={disabled ? null : onMouseLeave}
      tabIndex={disabled ? -1 : tabIndex}
      onFocus={disabled ? null : onFocus}
      onBlur={disabled ? null : onBlur}
      onKeyDown={disabled ? null : onKeyDown}
      ref={ref as any}
      role="radiogroup"
    >
      {starsNode}
    </ul>
  );
});

Rate.defaultProps = {
  defaultValue: 0,
  count: 5,
  allowHalf: false,
  allowClear: true,
  style: {},
  prefixCls: 'rc-rate',
  onChange: noop,
  character: ('★' as unknown) as RateProps['character'],
  onHoverChange: noop,
  tabIndex: 0,
  direction: 'ltr',
};

export default Rate;
