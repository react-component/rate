import React, {PropTypes} from 'react';

const Star = React.createClass({
  propTypes: {
    'num': PropTypes.number,
    'choosed': PropTypes.number,
    'prefixCls': PropTypes.string,
    'ifHalf': PropTypes.bool,
    'starClick': PropTypes.func,
    'starHover': PropTypes.func,
  },

  getClassName() {
    const {num, choosed, prefixCls, ifHalf} = this.props;
    if (num + 0.5 === choosed && ifHalf) {
      return `${prefixCls}-half-star active`;
    }
    return num < choosed ? `${prefixCls}-all-star` : `${prefixCls}-zero-star`;
  },

  handleHover(e) {
    this.props.starHover({event: e, num: this.props.num});
  },
  
  handleClick(e) {
    this.props.starClick({event: e, num: this.props.num});
  },
  
  render() {
    const {num} = this.props;
    const {handleHover, handleClick} = this;
    return (<li ref="star_item" className={this.getClassName()} data-num={num} onClick={handleClick} onMouseOver={handleHover} onMouseOut={handleHover} onMouseMove={handleHover}></li>);
  },
});

export default Star;
