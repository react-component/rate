/**
 * only require other specs here
 */
import expect from 'expect.js';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils, {Simulate} from 'react-addons-test-utils';
import jquery from 'jquery';
import StarBar from '../index';

describe('reactStar', function() {
  it('normal usage', function() {
    var container = document.createElement('div');
    document.body.appendChild(container);
    // 初始化测试
    // 测试 所有属性
    // 写readme
    // 完成其他部分的内容，发送到npm
    describe('initNum', function () {
        var instancea = TestUtils.renderIntoDocument(<StarBar initNum={3.5} />);
        var instanceb = ReactDOM.render(<StarBar initNum={3.5} />, container);
        Simulate.click(ReactDOM.findDOMNode(instanceb),{ clientX: 120});
        console.log(TestUtils.scryRenderedDOMComponentsWithTag(instanceb, 'li')[3]);
        Simulate.click(TestUtils.scryRenderedDOMComponentsWithTag(instanceb, 'li')[0], {clientX: 120});
        console.log(instancea);
        console.log(instanceb);
    });
  });
});
