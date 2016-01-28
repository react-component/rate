import ReactDOM from 'react-dom';
import React, {PropTypes} from 'react';
import {getOffsetLeft} from './util';
import Star from './Star';

function noop() {}

const Rate = React.createClass({
  propTypes: {
    initNum: PropTypes.number,
    starNum: PropTypes.number,
    color: PropTypes.string,
    half: PropTypes.bool,
    size: PropTypes.number,
    style: PropTypes.object,
    beforeRender: PropTypes.func,
    init: PropTypes.func,
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    useHover: PropTypes.bool,
    prefixCls: PropTypes.string,
    disableClick: PropTypes.bool,
    disableHover: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      initNum: 0,
      starNum: 5,
      half: true,

      color: '#ff8208',
      size: 15,
      style: {},
      prefixCls: 'rc',

      onHover: noop,
      onClick: noop,
      onChange: noop,

      useHover: false,
      disableHover: true,
      disableClick: true,
    };
  },

  getInitialState() {
    this.currentStar = this.props.initNum;
    return {
      num: this.props.initNum,
    };
  },

  shouldComponentUpdate() {
    return !(this.props.disableClick && this.props.disableHover);
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

  getStyles() {
    const {style, color, size} = this.props;
    style.fontSize = size + 'px';
    style.color = color;
    return style;
  },

  handleHover(props) {
    const self = this;
    const event = props.event;
    let num = self.ifHalfNum(props.num, event.clientX, self.useHover);
    if (!this.props.disableHover) {
      if (event.type === 'mouseout') {
        num = self.currentStar;
        if (!self.props.useHover) {
          self.setState({num: self.currentStar});
        }
      } else {
        self.setState({num});
      }
      if (self.props.onHover) {
        self.props.onHover(num, event);
      }
    }
  },

  handleClick(props) {
    const event = props.event;
    const num = this.ifHalfNum(props.num, event.clientX, !this.props.disableClick);
    this.setState({num});
    
    if (this.props.onClick) {
      this.props.onClick(num, event);
    }
  },

  ifHalfNum(num, x, isRemember) {
    const self = this;
    let chooseNum = num + 1;
    if (self.props.half && (x - self.getContainerL() - self.getSingleW() * num ) < self.getSingleW() / 2) {
      chooseNum -= 0.5;
    }
    if (isRemember) {
      self.currentStar = chooseNum;
      self.props.onChange(chooseNum);
    }
    return chooseNum;
  },

  render() {
    const {handleClick, handleHover} = this;
    const {starNum, half, prefixCls} = this.props;
    const star = new Array(starNum).fill(0);
    const starContent = star.map((item, index) => {
      return <Star num={index} prefixCls={prefixCls} ifHalf={half} choosed={this.state.num} starClick={handleClick} starHover={handleHover} key={index} />;
    })

    return (<ul component="ul" className={`${prefixCls}-star-wrapper iconfont`} style={this.getStyles()}>
        {starContent}
    </ul>);
  },
});

export default Rate;
