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
  };

  onHover = (e) => {
    const { onHover, index } = this.props;
    onHover(e, index);
  }

  onClick = (e) => {
    const { onClick, index } = this.props;
    onClick(e, index);
  }

  getClassName() {
    const { prefixCls, index, value, allowHalf } = this.props;
    const starValue = index + 1;
    if (allowHalf && value + 0.5 === starValue) {
      return `${prefixCls} ${prefixCls}-half ${prefixCls}-active`;
    }
    return starValue <= value ? `${prefixCls} ${prefixCls}-full` : `${prefixCls} ${prefixCls}-zero`;
  }

  render() {
    const { onHover, onClick } = this;
    const { disabled, prefixCls, character } = this.props;
    return (
      <li
        className={this.getClassName()}
        onClick={disabled ? null : onClick}
        onMouseMove={disabled ? null : onHover}
      >
        <div className={`${prefixCls}-first`}>{character}</div>
        <div className={`${prefixCls}-second`}>{character}</div>
      </li>
    );
  }
}
