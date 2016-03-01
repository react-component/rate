import ReactDOM from 'react-dom';
import React, { PropTypes } from 'react';
import { getOffsetLeft } from './util';
import Star from './Star';

function noop() {
}

const Rate = React.createClass({
  propTypes: {
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    count: PropTypes.number,
    allowHalf: PropTypes.bool,
    style: PropTypes.object,
    prefixCls: PropTypes.string,
    onChange: PropTypes.func,
  },

  getDefaultProps() {
    return {
      defaultValue: 0,
      count: 5,
      allowHalf: false,
      style: {},
      prefixCls: 'rc-rate',
      onChange: noop,
    };
  },

  getInitialState() {
    let value = this.props.value;
    if (value === undefined) {
      value = this.props.defaultValue;
    }
    return {
      value,
    };
  },

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      let value = nextProps.value;
      if (value === undefined) {
        value = nextProps.defaultValue;
      }
      this.setState({
        value,
      });
    }
  },

  onHover(event, index) {
    const hoverValue = this.getStarValue(index, event.pageX);
    this.setState({
      hoverValue,
    });
  },

  onMouseLeave() {
    this.setState({
      hoverValue: undefined,
    });
  },

  onClick(event, index) {
    const value = this.getStarValue(index, event.pageX);
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    this.onMouseLeave();
    this.props.onChange(value);
  },

  getStarDOM(index) {
    return ReactDOM.findDOMNode(this.refs[`star_${index}`]);
  },

  getStarValue(index, x) {
    let value = index + 1;
    if (this.props.allowHalf) {
      const leftEdge = getOffsetLeft(this.getStarDOM(0));
      const width = getOffsetLeft(this.getStarDOM(1)) - leftEdge;
      if ((x - leftEdge - width * index) < width / 2) {
        value -= 0.5;
      }
    }
    return value;
  },

  render() {
    const { count, allowHalf, style, prefixCls } = this.props;
    const { value, hoverValue } = this.state;
    const stars = [];
    for (let index = 0; index < count; index++) {
      stars.push(<Star
        ref={`star_${index}`}
        index={index}
        prefixCls={`${prefixCls}-star`}
        allowHalf={allowHalf}
        value={hoverValue === undefined ? value : hoverValue}
        onClick={this.onClick}
        onHover={this.onHover}
        key={index}
      />);
    }
    return (<ul
      className={`${prefixCls}`}
      style={style}
      onMouseLeave={this.onMouseLeave}
    >
      {stars}
    </ul>);
  },
});

export default Rate;
