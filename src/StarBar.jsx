import ReactDOM from 'react-dom';
import React, {PropTypes} from 'react';
import {getOffsetLeft} from './util';
import Star from './Star';

function noop() {}

const Rate = React.createClass({
  propTypes: {
    value: PropTypes.number,
    count: PropTypes.number,
    allowHalf: PropTypes.bool,
    style: PropTypes.object,
    prefixCls: PropTypes.string,
    onChange: PropTypes.func,
  },

  getDefaultProps() {
    return {
      value: 0,
      count: 5,
      allowHalf: false,
      style: {},
      prefixCls: 'rc',
      onChange: noop,
    };
  },

  getInitialState() {
    this.currentStar = this.props.count;
    return {
      num: this.props.count,
    };
  },

  getContainer() {
    return ReactDOM.findDOMNode(this);
  },

  getContainerL() {
    return this.containerL || getOffsetLeft(this.getContainer().children[0]);
  },

  getSingleW() {
    return this.singleW || (getOffsetLeft(this.getContainer().children[1]) - this.getContainerL());
  },

  handleHover(props) {
    const event = props.event;
    let num = this.ifHalfNum(props.num, event.clientX);
    if (event.type === 'mouseout') {
      num = this.currentStar;
      this.setState({num: this.currentStar});
    } else {
      this.setState({num});
    }
  },

  handleClick(props) {
    const event = props.event;
    const num = this.ifHalfNum( props.num, event.clientX);
    this.setState({num});
  },

  ifHalfNum(num, x, isRemember) {
    let chooseNum = num + 1;
    if (this.props.allowHalf && (x - this.getContainerL() - this.getSingleW() * num ) < this.getSingleW() / 2) {
      chooseNum -= 0.5;
    }
    if (isRemember) {
      this.currentStar = chooseNum;
      this.props.onChange(chooseNum);
    }
    return chooseNum;
  },

  render() {
    const {count, allowHalf, style, prefixCls} = this.props;
    const {handleClick, handleHover} = this;
    const star = new Array(count).fill(0);
    const starContent = star.map((item, index) => {
      return <Star num={index} prefixCls={prefixCls} ifHalf={allowHalf} choosed={this.state.num} handleClick={handleClick} handleHover={handleHover} key={index} />;
    });

    return (<ul component="ul" className={`${prefixCls}-star-wrapper`} style={style}>
        {starContent}
    </ul>);
  },
});

export default Rate;
