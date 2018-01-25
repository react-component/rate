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
    unselectedCharacter: PropTypes.node,
    focused: PropTypes.bool,
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

  getCharacters() {
    const { index, value, allowHalf, character, unselectedCharacter } = this.props;
    const starValue = index + 1;
    const characters = { first: character, second: character };
    if (allowHalf && value + 0.5 === starValue) {
      characters.second = unselectedCharacter;
    } else if (starValue > value) {
      characters.first = unselectedCharacter;
      characters.second = unselectedCharacter;
    }
    return characters;
  }

  render() {
    const { onHover, onClick } = this;
    const { disabled, prefixCls } = this.props;
    const characters = this.getCharacters();
    return (
      <li
        className={this.getClassName()}
        onClick={disabled ? null : onClick}
        onMouseMove={disabled ? null : onHover}
      >
        <div className={`${prefixCls}-first`}>{characters.first}</div>
        <div className={`${prefixCls}-second`}>{characters.second}</div>
      </li>
    );
  }
}
