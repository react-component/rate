import * as React from 'react';

export interface StarProps {
  value?: number;
  index?: number;
  prefixCls?: string;
  allowHalf?: boolean;
  disabled?: boolean;
  onHover?: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => void;
  character?: (props: StarProps) => React.ReactNode | React.ReactNode;
  characterRender?: (origin: React.ReactElement, props: StarProps) => React.ReactNode;
  focused?: boolean;
  count?: number;
}

const Star = props => {
  const {
    disabled,
    prefixCls,
    character,
    characterRender,
    index,
    count,
    value,
    allowHalf,
    focused,
  } = props;

  const onHover: React.MouseEventHandler<HTMLDivElement> = e => {
    props.onHover(e, index);
  };

  const onClick = e => {
    props.onClick(e, index);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.keyCode === 13) {
      props.onClick(e, index);
    }
  };

  const getClassName = () => {
    const starValue = index + 1;
    let className = prefixCls;
    if (value === 0 && index === 0 && focused) {
      className += ` ${prefixCls}-focused`;
    } else if (allowHalf && value + 0.5 >= starValue && value < starValue) {
      className += ` ${prefixCls}-half ${prefixCls}-active`;
      if (focused) {
        className += ` ${prefixCls}-focused`;
      }
    } else {
      className += starValue <= value ? ` ${prefixCls}-full` : ` ${prefixCls}-zero`;
      if (starValue === value && focused) {
        className += ` ${prefixCls}-focused`;
      }
    }
    return className;
  };

  const characterNode = typeof character === 'function' ? character(props) : character;

  let start: React.ReactNode = (
    <li className={getClassName()}>
      <div
        onClick={disabled ? null : onClick}
        onKeyDown={disabled ? null : onKeyDown}
        onMouseMove={disabled ? null : onHover}
        role="radio"
        aria-checked={value > index ? 'true' : 'false'}
        aria-posinset={index + 1}
        aria-setsize={count}
        tabIndex={disabled ? -1 : 0}
      >
        <div className={`${prefixCls}-first`}>{characterNode}</div>
        <div className={`${prefixCls}-second`}>{characterNode}</div>
      </div>
    </li>
  );

  if (characterRender) {
    start = characterRender(start as React.ReactElement, props);
  }

  return start;
};

export default Star;
