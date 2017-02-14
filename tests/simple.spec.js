import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Rate from '../index.js';
import expect from 'expect.js';

describe('rate', () => {
  let div;
  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  });
  it('render works', () => {
    const instance = ReactDOM.render(
      <Rate count={3} value={1.5} allowHalf className="custom" />
    , div);
    const wrapper = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'rc-rate');
    expect(wrapper[0].className).to.be('rc-rate custom');
    const components = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'rc-rate-star');
    expect(components.length).to.be(3);
    expect(components[0].className).to.be('rc-rate-star rc-rate-star-full');
    expect(components[1].className).to.be('rc-rate-star rc-rate-star-half rc-rate-star-active');
    expect(components[2].className).to.be('rc-rate-star rc-rate-star-zero');
  });
});
