import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getOffsetLeft } from './util';
import Star from './Star';

function noop() {
}

export default class Rate extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    count: PropTypes.number,
    allowHalf: PropTypes.bool,
    style: PropTypes.object,
    prefixCls: PropTypes.string,
    onChange: PropTypes.func,
    onHoverChange: PropTypes.func,
    className: PropTypes.string,
    character: PropTypes.node,
  };

  static defaultProps = {
    defaultValue: 0,
    count: 5,
    allowHalf: false,
    style: {},
    prefixCls: 'rc-rate',
    onChange: noop,
    character: '★',
    onHoverChange: noop,
  };

  constructor(props) {
    super(props);
    let value = props.value;
    if (value === undefined) {
      value = props.defaultValue;
    }

    this.stars = {};

    this.state = {
      value,
    };
  }

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
  }

  onHover = (event, index) => {
    const hoverValue = this.getStarValue(index, event.pageX);
    this.setState({
      hoverValue,
    });
    this.props.onHoverChange(hoverValue);
  }

  onMouseLeave = () => {
    this.setState({
      hoverValue: undefined,
    });
    this.props.onHoverChange(undefined);
  }

  onClick = (event, index) => {
    const value = this.getStarValue(index, event.pageX);
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    this.onMouseLeave();
    this.props.onChange(value);
  }

  getStarDOM(index) {
    return ReactDOM.findDOMNode(this.stars[index]);
  }

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
  }

  saveRef = (index) => (node) => {
    this.stars[index] = node;
  }

  render() {
    const { count, allowHalf, style, prefixCls, disabled, className, character } = this.props;
    const { value, hoverValue } = this.state;
    const stars = [];
    const disabledClass = disabled ? `${prefixCls}-disabled` : '';
    for (let index = 0; index < count; index++) {
      stars.push(
        <Star
          ref={this.saveRef(index)}
          index={index}
          disabled={disabled}
          prefixCls={`${prefixCls}-star`}
          allowHalf={allowHalf}
          value={hoverValue === undefined ? value : hoverValue}
          onClick={this.onClick}
          onHover={this.onHover}
          key={index}
          character={character}
        />
      );
    }
    return (
      <ul
        className={classNames(prefixCls, disabledClass, className)}
        style={style}
        onMouseLeave={disabled ? null : this.onMouseLeave}
      >
        {stars}
      </ul>
    );
  }
}
