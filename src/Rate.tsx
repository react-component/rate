import React from 'react';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import { getOffsetLeft } from './util';
import Star from './Star';
import type { StarProps } from './Star';
import useRefs from './useRefs';

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
  autoFocus?: boolean;
  direction?: string;
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
    style,

    // Value
    defaultValue,
    value: propValue,
    count = 5,
    allowHalf = false,
    allowClear = true,

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
  } = props;

  const [getStarRef, setStarRef] = useRefs<HTMLElement>();
  const rateRef = React.useRef<HTMLUListElement>(null);

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

  const getStarValue = (index: number, x: number) => {
    const reverse = direction === 'rtl';
    let starValue = index + 1;
    if (allowHalf) {
      const starEle = findDOMNode<HTMLElement>(getStarRef(index));
      const leftDis = getOffsetLeft(starEle);
      const width = starEle.clientWidth;
      if (reverse && x - leftDis > width / 2) {
        starValue -= 0.5;
      } else if (!reverse && x - leftDis < width / 2) {
        starValue -= 0.5;
      }
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
    const nextHoverValue = getStarValue(index, event.pageX);
    if (nextHoverValue !== cleanedValue) {
      setHoverValue(nextHoverValue);
      setCleanedValue(null);
    }
    onHoverChange?.(nextHoverValue);
  };

  const onMouseLeave = () => {
    setHoverValue(null);
    setCleanedValue(null);
    onHoverChange?.(undefined);
  };

  // =========================== Click ============================
  const onClick = (event: React.MouseEvent | React.KeyboardEvent, index: number) => {
    const newValue = getStarValue(index, (event as React.MouseEvent).pageX);
    let isReset = false;
    if (allowClear) {
      isReset = newValue === value;
    }
    onMouseLeave();
    changeValue(isReset ? 0 : newValue);
    setCleanedValue(isReset ? newValue : null);
  };

  // ========================== Keyboard ==========================
  const onInternalKeyDown: React.KeyboardEventHandler<HTMLUListElement> = (event) => {
    const { keyCode } = event;
    const reverse = direction === 'rtl';
    let nextValue = value;
    if (keyCode === KeyCode.RIGHT && nextValue < count && !reverse) {
      if (allowHalf) {
        nextValue += 0.5;
      } else {
        nextValue += 1;
      }
      changeValue(nextValue);
      event.preventDefault();
    } else if (keyCode === KeyCode.LEFT && nextValue > 0 && !reverse) {
      if (allowHalf) {
        nextValue -= 0.5;
      } else {
        nextValue -= 1;
      }
      changeValue(nextValue);
      event.preventDefault();
    } else if (keyCode === KeyCode.RIGHT && nextValue > 0 && reverse) {
      if (allowHalf) {
        nextValue -= 0.5;
      } else {
        nextValue -= 1;
      }
      changeValue(nextValue);
      event.preventDefault();
    } else if (keyCode === KeyCode.LEFT && nextValue < count && reverse) {
      if (allowHalf) {
        nextValue += 0.5;
      } else {
        nextValue += 1;
      }
      changeValue(nextValue);
      event.preventDefault();
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
  const starNodes = new Array(count).fill(0).map((_, index) => {
    return (
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
        key={index}
        character={character}
        characterRender={characterRender}
        focused={focused}
      />
    );
  });

  // >>> Node
  return (
    <ul
      className={classNames(prefixCls, className, {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      })}
      style={style}
      onMouseLeave={disabled ? null : onMouseLeave}
      tabIndex={disabled ? -1 : tabIndex}
      onFocus={disabled ? null : onInternalFocus}
      onBlur={disabled ? null : onInternalBlur}
      onKeyDown={disabled ? null : onInternalKeyDown}
      ref={rateRef}
      role="radiogroup"
    >
      {starNodes}
    </ul>
  );
}

export default React.forwardRef(Rate);
