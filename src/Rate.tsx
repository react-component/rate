import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import KeyCode from 'rc-util/lib/KeyCode';
import pickAttrs from 'rc-util/lib/pickAttrs';
import React from 'react';
import type { StarProps } from './Star';
import Star from './Star';
import useRefs from './useRefs';
import { clamp, getBoundingClientRect, roundValueToPrecision } from './util';

export interface RateProps
  extends Pick<StarProps, 'count' | 'character' | 'characterRender' | 'allowHalf' | 'disabled'> {
  value?: number;
  defaultValue?: number;
  allowClear?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
  className?: string;
  tabIndex?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLUListElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLUListElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLUListElement>;
  id?: string;
  autoFocus?: boolean;
  direction?: string;
  /**
   * Is keyboard control enabled.
   * @default true
   */
  keyboard?: boolean;
  /**
   * Define the minimum increment value change
   */
  precision?: number;
}

export interface RateRef {
  focus: VoidFunction;
  blur: VoidFunction;
}

function Rate(props: RateProps, ref: React.Ref<RateRef>) {
  const {
    // Base
    prefixCls = 'rc-rate',
    className,

    // Value
    defaultValue,
    value: propValue,
    count = 5,
    /**
     * allow half star
     * @deprecated Since precision has been implemented, `allowHalf` is no longer needed.
     */
    allowHalf = false,
    allowClear = true,
    keyboard = true,
    precision = 1,

    // Display
    character = '★',
    characterRender,

    // Meta
    disabled,
    direction = 'ltr',
    tabIndex = 0,
    autoFocus,

    // Events
    onHoverChange,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onMouseLeave,

    ...restProps
  } = props;

  const [getStarRef, setStarRef] = useRefs<HTMLElement>();
  const rateRef = React.useRef<HTMLUListElement>(null);
  const mergedPrecision = allowHalf ? 0.5 : precision > 0 ? precision : 1;
  const reverse = direction === 'rtl';

  // ============================ Ref =============================
  const triggerFocus = () => {
    if (!disabled) {
      rateRef.current?.focus();
    }
  };

  React.useImperativeHandle(ref, () => ({
    focus: triggerFocus,
    blur: () => {
      if (!disabled) {
        rateRef.current?.blur();
      }
    },
  }));

  // =========================== Value ============================
  const [value, setValue] = useMergedState(defaultValue || 0, {
    value: propValue,
  });
  const [cleanedValue, setCleanedValue] = useMergedState<number | null>(null);

  const calculatePercentage = (delta: number, left: number, right: number) => {
    return (reverse ? right - delta : delta - left) / (right - left);
  };

  const dealWithMergedPrecision = (delta: number) => {
    const rootNode = rateRef.current;
    const { right, left } = getBoundingClientRect(rootNode);
    const percentage = calculatePercentage(delta, left, right);

    let newHover = roundValueToPrecision(count * percentage + mergedPrecision / 2, mergedPrecision);
    newHover = clamp(newHover, mergedPrecision, count);
    return newHover;
  };

  const getStarValue = (index: number, delta: number) => {
    let starValue = index;

    const starEle = getStarRef(index);
    const { left, right } = getBoundingClientRect(starEle);
    const percentage = calculatePercentage(delta, left, right);

    let roundedValue = roundValueToPrecision(percentage + mergedPrecision / 2, mergedPrecision);
    roundedValue = clamp(roundedValue, mergedPrecision, 1);
    starValue += roundedValue;

    if (mergedPrecision > 1) {
      return dealWithMergedPrecision(delta);
    }

    return starValue;
  };

  // >>>>> Change
  const changeValue = (nextValue: number) => {
    setValue(nextValue);
    onChange?.(nextValue);
  };

  // =========================== Focus ============================
  const [focused, setFocused] = React.useState(false);

  const onInternalFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const onInternalBlur = () => {
    setFocused(false);
    onBlur?.();
  };

  // =========================== Hover ============================
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const onHover = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const nextHoverValue = getStarValue(index, event.clientX);
    if (nextHoverValue !== cleanedValue) {
      setHoverValue(nextHoverValue);
      setCleanedValue(null);
    }
    onHoverChange?.(nextHoverValue);
  };

  const onMouseLeaveCallback = (event?: React.MouseEvent<HTMLUListElement>) => {
    if (!disabled) {
      setHoverValue(null);
      setCleanedValue(null);
      onHoverChange?.(undefined);
    }
    if (event) {
      onMouseLeave?.(event);
    }
  };

  // =========================== Click ============================
  const onClick = (event: React.MouseEvent | React.KeyboardEvent, index: number) => {
    const newValue = getStarValue(index, (event as React.MouseEvent).clientX);
    let isReset = false;
    if (allowClear) {
      isReset = newValue === value;
    }
    onMouseLeaveCallback();
    changeValue(isReset ? 0 : newValue);
    setCleanedValue(isReset ? newValue : null);
  };

  const onInternalKeyDown: React.KeyboardEventHandler<HTMLUListElement> = (event) => {
    const { keyCode } = event;
    const step = mergedPrecision;

    if (keyboard) {
      if (keyCode === KeyCode.RIGHT && value < count && !reverse) {
        changeValue(value + step);
        event.preventDefault();
      } else if (keyCode === KeyCode.LEFT && value > 0 && !reverse) {
        changeValue(value - step);
        event.preventDefault();
      } else if (keyCode === KeyCode.RIGHT && value > 0 && reverse) {
        changeValue(value - step);
        event.preventDefault();
      } else if (keyCode === KeyCode.LEFT && value < count && reverse) {
        changeValue(value + step);
        event.preventDefault();
      }
    }

    onKeyDown?.(event);
  };

  // =========================== Effect ===========================

  React.useEffect(() => {
    if (autoFocus && !disabled) {
      triggerFocus();
    }
  }, []);

  // =========================== Render ===========================
  // >>> Star
  const starNodes = new Array(count)
    .fill(0)
    .map((item, index) => (
      <Star
        ref={setStarRef(index)}
        index={index}
        count={count}
        disabled={disabled}
        prefixCls={`${prefixCls}-star`}
        allowHalf={allowHalf}
        value={hoverValue === null ? value : hoverValue}
        onClick={onClick}
        onHover={onHover}
        key={item || index}
        character={character}
        characterRender={characterRender}
        focused={focused}
      />
    ));

  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });

  // >>> Node
  return (
    <ul
      className={classString}
      onMouseLeave={onMouseLeaveCallback}
      tabIndex={disabled ? -1 : tabIndex}
      onFocus={disabled ? null : onInternalFocus}
      onBlur={disabled ? null : onInternalBlur}
      onKeyDown={disabled ? null : onInternalKeyDown}
      ref={rateRef}
      {...pickAttrs(restProps, { aria: true, data: true, attr: true })}
    >
      {starNodes}
    </ul>
  );
}

export default React.forwardRef(Rate);
