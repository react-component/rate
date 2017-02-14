/* eslint no-console: 0 */
import Rate from 'rc-rate';
import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/index.less';

function onChange(v) {
  console.log('selected star', v);
}

ReactDOM.render(<div style={{ margin: 100, marginRight: 0 }}>
  <Rate
    defaultValue={2.5}
    onChange={onChange}
    style={{ fontSize: 40 }}
    allowHalf
  />
</div>, document.getElementById('__react-content'));
