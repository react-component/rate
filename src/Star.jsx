import React from 'react';
import PropTypes from 'prop-types';

export default class Star extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    index: PropTypes.number,
    prefixCls: PropTypes.string,
    allowHalf: PropTypes.bool,
    disabled: PropTypes.bool,
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    character: PropTypes.node,
    characterRender: PropTypes.func,
    focused: PropTypes.bool,
    count: PropTypes.number,
  };

  onHover = e => {
    const { onHover, index } = this.props;
    onHover(e, index);
  };

  onClick = e => {
    const { onClick, index } = this.props;
    onClick(e, index);
  };

  onKeyDown = e => {
    const { onClick, index } = this.props;
    if (e.keyCode === 13) {
      onClick(e, index);
    }
  };

  getClassName() {
    const { prefixCls, index, value, allowHalf, focused } = this.props;
    const starValue = index + 1;
    let className = prefixCls;
    if (value === 0 && index === 0 && focused) {
      className += ` ${prefixCls}-focused`;
    } else if (allowHalf && value + 0.5 === starValue) {
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
  }

  render() {
    const { onHover, onClick, onKeyDown } = this;
    const { disabled, prefixCls, character, characterRender, index, count, value } = this.props;
    let start = (
      <li className={this.getClassName()}>
        <div
          onClick={disabled ? null : onClick}
          onKeyDown={disabled ? null : onKeyDown}
          onMouseMove={disabled ? null : onHover}
          role="radio"
          aria-checked={value > index ? 'true' : 'false'}
          aria-posinset={index + 1}
          aria-setsize={count}
          tabIndex={0}
        >
          <div className={`${prefixCls}-first`}>{character}</div>
          <div className={`${prefixCls}-second`}>{character}</div>
        </div>
      </li>
    );

    if (characterRender) {
      start = characterRender(start, this.props);
    }

    return start;
  }
}
