/**
 * only require other specs here
 */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils, {Simulate} from 'react-addons-test-utils';
import StarBar from '../index';

describe('rateTest', function rate() {
  it('normal usage', function() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    // 初始化测试
    // 测试 所有属性
    // 写readme
    // 完成其他部分的内容，发送到npm
    describe('initNum', function() {
      // const instancea = TestUtils.renderIntoDocument(<StarBar count={3.5} />);
      const instanceb = ReactDOM.render(<StarBar count={3.5} />, container);
      Simulate.click(ReactDOM.findDOMNode(instanceb), { clientX: 120});
      Simulate.click(TestUtils.scryRenderedDOMComponentsWithTag(instanceb, 'li')[0], {clientX: 120});
    });
  });
});
