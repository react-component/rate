import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import KeyCode from 'rc-util/lib/KeyCode';
import { getOffsetLeft } from './util';
import Star from './Star';

function noop() {}

class Rate extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    count: PropTypes.number,
    allowHalf: PropTypes.bool,
    allowClear: PropTypes.bool,
    style: PropTypes.object,
    prefixCls: PropTypes.string,
    onChange: PropTypes.func,
    onHoverChange: PropTypes.func,
    className: PropTypes.string,
    character: PropTypes.node,
    characterRender: PropTypes.func,
    tabIndex: PropTypes.number,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    autoFocus: PropTypes.bool,
  };

  static defaultProps = {
    defaultValue: 0,
    count: 5,
    allowHalf: false,
    allowClear: true,
    style: {},
    prefixCls: 'rc-rate',
    onChange: noop,
    character: '★',
    onHoverChange: noop,
    tabIndex: 0,
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
      focused: false,
      cleanedValue: null,
    };
  }

  componentDidMount() {
    const { autoFocus, disabled } = this.props;
    if (autoFocus && !disabled) {
      this.focus();
    }
  }

  onHover = (event, index) => {
    const { onHoverChange } = this.props;
    const hoverValue = this.getStarValue(index, event.pageX);
    const { cleanedValue } = this.state;
    if (hoverValue !== cleanedValue) {
      this.setState({
        hoverValue,
        cleanedValue: null,
      });
    }
    onHoverChange(hoverValue);
  };

  onMouseLeave = () => {
    const { onHoverChange } = this.props;
    this.setState({
      hoverValue: undefined,
      cleanedValue: null,
    });
    onHoverChange(undefined);
  };

  onClick = (event, index) => {
    const { allowClear } = this.props;
    const { value } = this.state;
    const newValue = this.getStarValue(index, event.pageX);
    let isReset = false;
    if (allowClear) {
      isReset = newValue === value;
    }
    this.onMouseLeave(true);
    this.changeValue(isReset ? 0 : newValue);
    this.setState({
      cleanedValue: isReset ? newValue : null,
    });
  };

  onFocus = () => {
    const { onFocus } = this.props;
    this.setState({
      focused: true,
    });
    if (onFocus) {
      onFocus();
    }
  };

  onBlur = () => {
    const { onBlur } = this.props;
    this.setState({
      focused: false,
    });
    if (onBlur) {
      onBlur();
    }
  };

  onKeyDown = event => {
    const { keyCode } = event;
    const { count, allowHalf, onKeyDown } = this.props;
    let { value } = this.state;
    if (keyCode === KeyCode.RIGHT && value < count) {
      if (allowHalf) {
        value += 0.5;
      } else {
        value += 1;
      }
      this.changeValue(value);
      event.preventDefault();
    } else if (keyCode === KeyCode.LEFT && value > 0) {
      if (allowHalf) {
        value -= 0.5;
      } else {
        value -= 1;
      }
      this.changeValue(value);
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps && nextProps.value !== undefined) {
      return {
        ...state,
        value: nextProps.value,
      };
    }
    return state;
  }

  getStarDOM(index) {
    return ReactDOM.findDOMNode(this.stars[index]);
  }

  getStarValue(index, x) {
    const { allowHalf } = this.props;
    let value = index + 1;
    if (allowHalf) {
      const starEle = this.getStarDOM(index);
      const leftDis = getOffsetLeft(starEle);
      const width = starEle.clientWidth;
      if (x - leftDis < width / 2) {
        value -= 0.5;
      }
    }
    return value;
  }

  saveRef = index => node => {
    this.stars[index] = node;
  };

  saveRate = node => {
    this.rate = node;
  };

  focus() {
    const { disabled } = this.props;
    if (!disabled) {
      this.rate.focus();
    }
  }

  blur() {
    const { disabled } = this.props;
    if (!disabled) {
      this.rate.focus();
    }
  }

  changeValue(value) {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    onChange(value);
  }

  render() {
    const {
      count,
      allowHalf,
      style,
      prefixCls,
      disabled,
      className,
      character,
      characterRender,
      tabIndex,
    } = this.props;
    const { value, hoverValue, focused } = this.state;
    const stars = [];
    const disabledClass = disabled ? `${prefixCls}-disabled` : '';
    for (let index = 0; index < count; index++) {
      stars.push(
        <Star
          ref={this.saveRef(index)}
          index={index}
          count={count}
          disabled={disabled}
          prefixCls={`${prefixCls}-star`}
          allowHalf={allowHalf}
          value={hoverValue === undefined ? value : hoverValue}
          onClick={this.onClick}
          onHover={this.onHover}
          key={index}
          character={character}
          characterRender={characterRender}
          focused={focused}
        />,
      );
    }
    return (
      <ul
        className={classNames(prefixCls, disabledClass, className)}
        style={style}
        onMouseLeave={disabled ? null : this.onMouseLeave}
        tabIndex={disabled ? -1 : tabIndex}
        onFocus={disabled ? null : this.onFocus}
        onBlur={disabled ? null : this.onBlur}
        onKeyDown={disabled ? null : this.onKeyDown}
        ref={this.saveRate}
        role="radiogroup"
      >
        {stars}
      </ul>
    );
  }
}

polyfill(Rate);

export default Rate;
