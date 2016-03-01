import React, { PropTypes } from 'react';

const Star = React.createClass({
  propTypes: {
    value: PropTypes.number,
    index: PropTypes.number,
    prefixCls: PropTypes.string,
    allowHalf: PropTypes.bool,
    onHover: PropTypes.func,
    onClick: PropTypes.func,
  },

  onHover(e) {
    this.props.onHover(e, this.props.index);
  },

  onClick(e) {
    this.props.onClick(e, this.props.index);
  },

  getClassName() {
    const { index, value, prefixCls, allowHalf } = this.props;
    const starValue = index + 1;
    if (allowHalf && value + 0.5 === starValue) {
      return `${prefixCls} ${prefixCls}-half ${prefixCls}-active`;
    }
    return starValue <= value ? `${prefixCls} ${prefixCls}-full` : `${prefixCls} ${prefixCls}-zero`;
  },

  render() {
    const { onHover, onClick } = this;
    return (<li
      className={this.getClassName()}
      onClick={onClick}
      onMouseMove={onHover}
    />);
  },
});

export default Star;
