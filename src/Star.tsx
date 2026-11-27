import { KeyCode } from '@rc-component/util';
import { clsx } from 'clsx';
import React from 'react';

export interface StarProps {
  value?: number;
  index?: number;
  prefixCls?: string;
  allowHalf?: boolean;
  showExactValue?: boolean;
  disabled?: boolean;
  onHover?: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => void;
  character?: React.ReactNode | ((props: StarProps) => React.ReactNode);
  characterRender?: (origin: React.ReactElement, props: StarProps) => React.ReactNode;
  focused?: boolean;
  count?: number;
}

function Star(props: StarProps, ref: React.Ref<HTMLLIElement>) {
  const {
    disabled,
    prefixCls,
    character,
    characterRender,
    index,
    count,
    value,
    allowHalf,
    showExactValue,
    focused,
    onHover,
    onClick,
  } = props;

  // =========================== Events ===========================
  const onInternalHover: React.MouseEventHandler<HTMLDivElement> = (e) => {
    onHover(e, index);
  };

  const onInternalClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    onClick(e, index);
  };

  const onInternalKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.keyCode === KeyCode.ENTER) {
      onClick(e, index);
    }
  };

  // =========================== Render ===========================
  // >>>>> ClassName
  const starValue = index + 1;
  const classNameList = new Set([prefixCls]);
  const fraction = value - index;
  let firstStyle: React.CSSProperties | undefined;

  // TODO: Current we just refactor from CC to FC. This logic seems can be optimized.
  if (value === 0 && index === 0 && focused) {
    classNameList.add(`${prefixCls}-focused`);
  } else if (showExactValue && fraction > 0 && fraction < 1) {
    // Reuse the half state so existing themes only need the dynamic width override.
    classNameList.add(`${prefixCls}-half`);
    classNameList.add(`${prefixCls}-active`);
    firstStyle = {
      width: `${Number((fraction * 100).toFixed(10))}%`,
    };
  } else if (allowHalf && value + 0.5 >= starValue && value < starValue) {
    classNameList.add(`${prefixCls}-half`);
    classNameList.add(`${prefixCls}-active`);
    if (focused) {
      classNameList.add(`${prefixCls}-focused`);
    }
  } else {
    if (starValue <= value) {
      classNameList.add(`${prefixCls}-full`);
    } else {
      classNameList.add(`${prefixCls}-zero`);
    }
    if (starValue === value && focused) {
      classNameList.add(`${prefixCls}-focused`);
    }
  }

  // >>>>> Node
  const characterNode = typeof character === 'function' ? character(props) : character;

  let start: React.ReactNode = (
    <li className={clsx(Array.from(classNameList))} ref={ref}>
      <div
        onClick={disabled ? null : onInternalClick}
        onKeyDown={disabled ? null : onInternalKeyDown}
        onMouseMove={disabled ? null : onInternalHover}
        role="radio"
        aria-checked={value > index ? 'true' : 'false'}
        aria-posinset={index + 1}
        aria-setsize={count}
        tabIndex={disabled ? -1 : 0}
      >
        <div className={`${prefixCls}-first`} style={firstStyle}>
          {characterNode}
        </div>
        <div className={`${prefixCls}-second`}>{characterNode}</div>
      </div>
    </li>
  );

  if (characterRender) {
    start = characterRender(start as React.ReactElement, props);
  }

  return start as React.ReactElement;
}

export default React.forwardRef(Star);
